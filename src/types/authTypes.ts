export interface User {
    id: string;
    created_at: string;
    apartment_id: string | null;
    unit_id : string | null;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    role: "admin" | "resident" | "manager" | string;
    gender: "male" | "female" | string;
    profile_image_url: string | null;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface AuthState {
    user: User | null ;
    access_token: string | null;
    refresh_token: string | null;
}

export interface LoginResponse {
    user: User;
    access_token: string;
    refresh_token: string;
}

export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T ;
}

export interface RegisterPayload {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    gender: "male" | "female";
}

export interface InviteCode{
    code : string
}
export interface VlidateInviteCodeResponse {
    apartment_id: string ;
    unit_id : string ;
}