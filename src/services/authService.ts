import type { LoginPayload, LoginResponse, RegisterPayload, User } from "../types/authTypes";
import { postData, getData } from "./services"; 

export const loginService = async (
    credentials: LoginPayload
): Promise<LoginResponse> => {
    return postData({
        endPoint: `/v1/auth/login`,
        data: credentials,
    });
};

export const registerService = async (
    userData: RegisterPayload
): Promise<LoginResponse> => {
    return postData({
        endPoint: `/v1/auth/register`,
        data: userData,
    });
};

export const getCurrentUserService = async (): Promise<User> => {
    return getData({
        endPoint: `/v1/auth/me`,
    });
};

export const logoutService = async (): Promise<void> => {
    return postData({
        endPoint: `/v1/auth/logout`,
        data: {},
    });
};