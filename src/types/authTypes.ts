export interface User {
    id: string;
    apartment_id: string | null;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    role: "admin" | "user" | string; 
    gender: "male" | "female" | string;
    profile_image_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    access: string;
    refresh: string;
}

export interface AuthState {
    user: User | null;
    access: string | null;
    refresh: string | null;
    isAuthenticated: boolean;
}

export interface RegisterPayload {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    role : "admin" | "user" | string;
    gender: "male" | "female";
}