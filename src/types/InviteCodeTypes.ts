export interface CreateInvitePayload {
    unit_id: string;
    apartment_id: string;
    expires_at: string;
}

export interface InviteCodeResponse {
    id: string;
    apartment_id: string;
    unit_id: string;
    code: string;
    expires_at: string;
    created_at: string;
}