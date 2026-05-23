export interface User {
    ID: string;
    CreatedAt: string;
    ApartmentID: string | null;
    UnitID : string | null;
    FirstName: string;
    LastName: string;
    Username: string;
    Email: string;
    Phone: string;
    Password: string;
    Role: "admin" | "resident" | string;
    Gender: "male" | "female" | string;
    ProfileImageURL: string | null;
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
    ApartmentID: string ;
    UnitID : string ;
}