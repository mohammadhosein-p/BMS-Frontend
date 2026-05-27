import { getData } from "./services";

export interface UserInManagement {
    id: number; 
    first_name: string;
    last_name: string;
    username: string;
    created_at: string;
    phone: string;
    email: string;
    unit_number: string;
    profile_image_url: string;
}


export const getApartmentUsers = async (apartment_id: string ): Promise<UserInManagement[]> => {
    return getData({
        endPoint: `/apartments/${apartment_id}/users`,
    });
};