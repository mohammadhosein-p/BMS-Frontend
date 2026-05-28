import type { AxiosError } from "axios";

export interface ApiErrorResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: null;
    errors: string[]; 
}

export type AxiosBackendError = AxiosError<ApiErrorResponse>;

export interface BaseParams {
	endPoint: string;
	headers?: Record<string, string>;
}

export interface GetParams extends BaseParams {
	params?: Record<string, any>;
}

export interface PostParams extends BaseParams {
	data: any;
}

export type PatchParams = PostParams;
export type PutParams = PostParams;
export interface DeleteParams extends BaseParams {
	data?: any;
}
