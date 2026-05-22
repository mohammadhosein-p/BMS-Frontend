// types/ticketTypes.ts

export interface CreateTicketPayload {
    title: string;
    description: string;
    body: string;
    category: string;
    accessibility: "private" | "public";
}

// =========================
// Backend Ticket
// =========================

export interface TicketResponse {
    id: number;
    user_id: string;
    title: string;
    description: string;
    body: string;
    category: string;
    accessibility: "private" | "public";
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    status: string;
    unit?: string;
}

export interface UpdateTicketStatusPayload {
    ticketId: number;
    status: string;
}