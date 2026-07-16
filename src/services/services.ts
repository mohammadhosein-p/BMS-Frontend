import axios from "axios";
import type {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import type {
    DeleteParams,
    GetParams,
    PatchParams,
    PostParams,
    PutParams,
} from "../types/apiTypes";
import useAuthStore from "../store/useAuthStore"; 
import { refreshTokenRequest } from "../services/authService";


// ================= TYPES =================
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

interface FailedRequest {
    resolve: (token: string) => void;
    reject: (error: any) => void;
}

// ================= API INSTANCE =================
// export const baseURL = "http://localhost:8080";
export const baseURL = "http://45.195.200.12";

const apiClient: AxiosInstance = axios.create({
    baseURL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    },
});

// ================= REFRESH CONTROL =================
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else if (token) prom.resolve(token);
    });
    failedQueue = [];
};

// ================= REQUEST INTERCEPTOR =================
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const access_token = useAuthStore.getState().access_token;
        const publicEndpoints = ['/login', '/register', '/send-otp', '/verify-otp'];

        if (access_token && !publicEndpoints.some(path => config.url?.includes(path))) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${access_token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (!originalRequest) return Promise.reject(error);

        if (originalRequest.url?.includes("/refresh")) {
            useAuthStore.getState().logout();
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            
            if (originalRequest.url?.includes("/logout")) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            const { refresh_token, user, setAuth, logout } = useAuthStore.getState();

            if (!refresh_token) {
                logout();
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            originalRequest.headers = originalRequest.headers || {};
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(apiClient(originalRequest));
                        },
                        reject: (err: any) => {
                            reject(err);
                        },
                    });
                });
            }

            isRefreshing = true;

            try {
                const response = await refreshTokenRequest(refresh_token);
                
                const newAccess = response.data.access_token;
                const newRefresh = response.data.refresh_token;

                setAuth({
                    user: user!,
                    access_token: newAccess,
                    refresh_token: newRefresh,
                });

                processQueue(null, newAccess);

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newAccess}`;

                return apiClient(originalRequest);
            } catch (err) {
                processQueue(err, null);
                logout(); 
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// ================= METHODS =================
export const getData = async ({ endPoint, headers, params }: GetParams) => {
    try {
        const response: AxiosResponse = await apiClient.get(endPoint, {
            params,
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("error in getData", error);
        throw error;
    }
};

export const postData = async ({ endPoint, data, headers }: PostParams) => {
    try {
        const response: AxiosResponse = await apiClient.post(endPoint, data, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("error in postData", error);
        throw error;
    }
};

export const postImageData = async ({ endPoint, data }: PostParams) => {
    try {
        const response: AxiosResponse = await apiClient.post(endPoint, data, {
            headers: { 
                "Content-Type": "multipart/form-data" 
            },
        });
        return response.data;
    } catch (error) {
        console.error("error in postImageData", error);
        throw error;
    }
};

export const patchData = async ({ endPoint, data, headers }: PatchParams) => {
    try {
        const response: AxiosResponse = await apiClient.patch(endPoint, data, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("error in patchData", error);
        throw error;
    }
};

export const putData = async ({ endPoint, data, headers }: PutParams) => {
    try {
        const response: AxiosResponse = await apiClient.put(endPoint, data, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("error in putData", error);
        throw error;
    }
};

export const deleteData = async ({ endPoint, data, headers }: DeleteParams) => {
    try {
        const response: AxiosResponse = await apiClient.delete(endPoint, {
            data,
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("error in deleteData", error);
        throw error;
    }
};

export default apiClient;