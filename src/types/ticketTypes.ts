// types/ticketTypes.ts


export interface Comment {
    ID: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    UserID: string;
    TicketID: string;
    Body: string;
    User: {
        Username: string;
        ProfileImageURL: string;
    };
}

export interface Ticket {
    ID: string;
    UserID: string;
    Title: string;
    Description: string;
    Body: string;
    Category: string;
    Accessibility: "private" | "public";
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    Status: "open" | "close" | "in-progress";
    Comments: Comment[]
}
export interface CreateTicketPayload {
    title: string;
    description: string;
    body: string;
    category: string;
    accessibility: "private" | "public";
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
