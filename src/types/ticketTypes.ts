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
    title: string;
    description: string;
    body: string;
    category: string;
    accessibility: "private" | "public";
    createdAt: string;
    status: string;
    unit?: string;
}
