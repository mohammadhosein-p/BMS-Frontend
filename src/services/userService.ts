import type { UpdateProfileInput } from "@/utils/authSchema";
import type { ApiResponse, User } from "../types/authTypes";
import { getData, putData, patchData, deleteData, postImageData } from "./services"; 

/**
 * GET {{base_url}}/user/me
 * Fetches the currently authenticated user's profile
 */
export const getMyProfileService = async (): Promise<User> => {
    const res: ApiResponse<User> = await getData({
        endPoint: `/user/me`,
    });
    return res.data;
};

/**
 * GET {{base_url}}/user/:id
 * Fetches a specific user profile by their unique ID
 */
export const getUserByIdService = async (userId: string): Promise<User> => {
    const res: ApiResponse<User> = await getData({
        endPoint: `/user/${userId}`,
    });
    return res.data;
};

/**
 * PUT {{base_url}}/user/me
 * Updates the fields of the currently authenticated user
 */
export const updateMyProfileService = async (userData: UpdateProfileInput): Promise<ApiResponse<User>> => {
    const res = await putData({
        endPoint: `/user/me`,
        data: userData,
    });
    
    // Return the entire response object so mutation handlers can safely access res.data
    return res;
};

/**
 * PATCH {{base_url}}/user/me/password
 * Updates the user's password securely
 */
export const changePasswordService = async (password: string): Promise<ApiResponse<null>> => {
    return patchData({
        endPoint: `/user/me/password`,
        data: { password },
    });
};

/**
 * POST {{base_url}}/user/profile-image
 * Uploads a profile picture using multipart/form-data
 */
export const uploadProfileImageService = async (imageFile: File): Promise<ApiResponse<{ profile_image_url: string }>> => {
    const formData = new FormData();
    formData.append("image", imageFile);

    return postImageData({
        endPoint: `/user/profile-image/`,
        data: formData,
    });
}
/**
 * DELETE {{base_url}}/user/me
 * Permanently deletes the logged-in user account
 */
export const deleteAccountService = async (): Promise<ApiResponse<null>> => {
    return deleteData({
        endPoint: `/user/me`,
    });
};