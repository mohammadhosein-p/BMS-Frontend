import type { LoginPayload, LoginResponse, RegisterPayload, User } from "../types/authTypes";
import { postData, getData } from "./services"; 

export const loginService = async (
    credentials: LoginPayload
): Promise<LoginResponse> => {
    return postData({
        endPoint: `/login`, 
        data: credentials,
    });
};


export const registerService = async (
    userData: RegisterPayload
): Promise<LoginResponse> => {
    return postData({
        endPoint: `/users`, 
        data: userData,
    });
};

export const getCurrentUserService = async (userId: string): Promise<User> => {
    return getData({
        endPoint: `/users/${userId}`,
    });
};

export const logoutService = async (): Promise<void> => {
    console.log("Logged out from mockAPI");
};

export const sendOtpService = async (phone: string): Promise<{ success: boolean }> => {
    return postData({
        endPoint: `/send-otp`,
        data: { phone },
    });
};

export interface OtpNotRegisteredResponse {
    isUser: false;
}

export const verifyOtpService = async (payload: { 
    phone: string; 
    code: string; 
}): Promise<LoginResponse | OtpNotRegisteredResponse> => {
    return postData({
        endPoint: `/verify-otp`,
        data: payload,
    });
};