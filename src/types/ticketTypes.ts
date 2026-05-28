export interface Comment {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    user_id: string;
    ticket_id: string;
    body: string;
    user: {
        username: string;
        profile_image_url: string;
        id: string;
        first_name: string;
        last_name: string;
    };
}

export interface Ticket {
    id: string;
    user_id: string;
    title: string;
    description: string;
    body: string;
    category: string;
    accessability: "private" | "public";
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    status: "open" | "close" | "in-progress";
    comments: Comment[]
}
export interface CreateTicketPayload {
    title: string;
    description: string;
    body: string;
    category: string;
    accessability: "private" | "public";
}

export interface AllTicketResponse {
    data: Ticket[];
}

export interface UpdateTicketStatusPayload {
    ticketId: string;
    status: string;
}

export interface TicketFullyDetailsResponse {
    data: Ticket
}
