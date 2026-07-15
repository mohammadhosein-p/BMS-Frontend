import type { ApiResponse, CheckPhonePayload, ExistsResponse, LoginPayload, LoginResponse, RegisterPayload, User, VlidateInviteCodeResponse } from "../types/authTypes";
import { postData, getData } from "./services"; 

export const loginService = async (credentials: LoginPayload): Promise<LoginResponse> => {
    const res: ApiResponse<LoginResponse> = await postData({
        endPoint: `/login`, 
        data: credentials,
    });
    return res.data;
};

export const registerService = async (userData: RegisterPayload): Promise<LoginResponse> => {
    const res: ApiResponse<LoginResponse> = await postData({
        endPoint: `/register`, 
        data: userData,
    });
    return res.data;
};

export const getCurrentUserService = async (userId: string): Promise<User> => {
    return getData({
        endPoint: `/users/${userId}`,
    });
};

export const refreshTokenRequest = async (refresh: string): Promise<ApiResponse<{ access_token: string, refresh_token: string }>> => {
    return postData({
        endPoint: `/refresh`,
        data: { refresh_token:refresh },
    });
};

export const verifyOtpService = async (payload: { phone: string; code: string; }): Promise<ApiResponse<LoginResponse | null>> => {
    return postData({
        endPoint: `/verify-otp`,
        data: payload,
    });
};

export const sendOtpService = async (phone: string): Promise<ApiResponse<{otp: string}>> => {
    return postData({
        endPoint: `/send-otp`,
        data: { phone },
    });
};


export const validateInviteCode = async (code: string): Promise<ApiResponse<VlidateInviteCodeResponse>> => {
    return postData({
        endPoint: `/invite-code/validate`,
        data: { code },
    });
};

export const logoutService = async (): Promise<ApiResponse<void>> => {
    return postData({
        endPoint: `/logout`,
        data: {},
    });
};

export const checkPhoneExistsService = async (payload: CheckPhonePayload): Promise<ApiResponse<ExistsResponse>> => {
    return postData({
        endPoint: `/auth/check-phone`,
        data: payload,
    });
};

export const getWhoAmI = async (): Promise<User> => {
  return getData({
    endPoint: `/user/me`,
  });
};
