import type { AxiosError } from "axios";

export interface ApiErrorResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: null;
    errors: string[]; 
}

export type AxiosBackendError = AxiosError<ApiErrorResponse>;