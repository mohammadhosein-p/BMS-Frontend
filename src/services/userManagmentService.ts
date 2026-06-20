import type { ApiResponse } from "@/types/authTypes";
import { getData, patchData } from "./services";

export interface NestedUnit {
    id: string;
    unit_number: string;
    floor?: number;
    apartment_id?: string;
    created_at?: string;
}

export interface UserInManagement {
    user_id: string;
    first_name: string;
    last_name: string;
    username: string;
    created_at: string;
    phone: string;
    email: string;
    gender?: "male" | "female";
    role?: "admin" | "manager" | "resident";
    profile_image_url: string | null;
    unit?: NestedUnit | null;
}

export interface ApartmentData {
    id: string;
    name: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    created_at: string;
    users: UserInManagement[];
}

export interface RemoveUserFromUnitParams {
    unit_id: string;
}

export const getApartmentUsers = async (apartment_id: string): Promise<ApiResponse<ApartmentData>> => {
    return getData({
        endPoint: `/apartments/${apartment_id}/users`,
    });
};

export const removeUserFromUnitService = async ({
    unit_id
}: RemoveUserFromUnitParams): Promise<ApiResponse<any>> => {
    return patchData({
        endPoint: `/apartments/units/${unit_id}`,
        data: {},
    });
};