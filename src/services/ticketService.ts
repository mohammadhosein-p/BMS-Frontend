import type { CreateTicketPayload } from "../types/ticketTypes";

import { postData } from "./services";

// =========================
// Create Ticket Service
// =========================

export const createTicketService = async (
    ticketData: CreateTicketPayload,
): Promise<void> => {
    return postData({
        endPoint: `/tickets`,
        data: ticketData,
    });
};
