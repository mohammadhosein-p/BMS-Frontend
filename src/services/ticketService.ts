import { getData, postData } from "./services";
import type { CreateTicketPayload, TicketResponse } from "@/types/ticketTypes";

export const createTicketService = async (
    ticketData: CreateTicketPayload,
): Promise<void> => {
    await postData({
        endPoint: "/tickets",
        data: ticketData,
    });
};

export const getTicketsService = async (): Promise<TicketResponse[]> => {
    return getData({
        endPoint: "/tickets",
    });
};
