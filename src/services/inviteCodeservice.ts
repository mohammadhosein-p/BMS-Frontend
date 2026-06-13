import type { CreateInvitePayload, InviteCodeResponse } from "@/types/InviteCodeTypes";
import type { ApiResponse } from "../types/authTypes"; 
import { postData } from "./services"; 

export const createInviteService = async (
    payload: CreateInvitePayload
): Promise<InviteCodeResponse> => {
    const res: ApiResponse<InviteCodeResponse> = await postData({
        endPoint: `/invite-code`, 
        data: payload,
    });
    
    return res.data;
};
