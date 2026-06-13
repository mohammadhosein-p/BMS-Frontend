import type { User } from "./authTypes";

export interface ApartmentDataResponse {
    id: string;
    name: string;
    province: string;
    city: string;
    address: string;
    postal_code: string;
    created_at: string;
    units: UnitResponse[];
}

export interface CreateUnitPayload {
    unit_number: string;
    floor: number;
    user_id?: string | null; 
}

export interface UpdateUnitPayload {
    unit_number?: string;
    floor?: number;
}

export interface CreateUnitResponse {
    id: string;
    apartment_id: string;
    user_id?: string | null;
    unit_number: string;
    floor: number;
    created_at: string;
}

export interface UnitResponse {
    id: string;
    apartment_id: string;
    user_id?: string | null;
    unit_number: string;
    floor: number;
    created_at: string;
    apartment?: ApartmentDataResponse; 
    user?: User;        
}
