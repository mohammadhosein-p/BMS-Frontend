
export interface CreateTicketPayload {
    title: string;
    description: string;
    body: string;
    category: string;
    accessibility: "private" | "public";
}

// export interface Ticket {
//     id: string;

//     title: string;
//     description: string;
//     body: string;

//     category: string;

//     accessibility: "private" | "public";

//     createdAt: string;
//     updatedAt: string;
// }
