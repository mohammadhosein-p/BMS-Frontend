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
    id: string;
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
    ticketId: string;
    status: string;
}

export interface TicketComment {
    id: number;
    user: string;
    text: string;
    date: string;
    isOwner: boolean;
}

export interface TicketFullyDetailsResponse {
    id: number;
    title: string;
    description: string;
    body: string;
    category: string;
    status: "open" | "in_progress" | "closed";
    accessibility: "private" | "public";
    created_at: string;

    comments: TicketComment[];
}