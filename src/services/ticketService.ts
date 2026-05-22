import { deleteData, getData, patchData, postData } from "./services";
import type { CreateTicketPayload, TicketResponse, UpdateTicketStatusPayload } from "@/types/ticketTypes";

export const createTicketService = async (
    ticketData: CreateTicketPayload,
): Promise<void> => {
    await postData({
        endPoint: "/tickets",
        data: ticketData,
    });
};

export const getTicketsService = async (params?: {
    status?: string;
    category?: string;
}): Promise<TicketResponse[]> => {
    return getData({
        endPoint: "/tickets",
        params,
    });
};

export const updateTicketStatusService = async ({
    ticketId,
    status,
}: UpdateTicketStatusPayload) => {
    return await patchData({
        endPoint: `/tickets/${ticketId}/status`,
        data: {
            status,
        },
    });
};

export const deleteTicketService = async (ticketId: number) => {
    return await deleteData({
        endPoint: `/tickets/${ticketId}`,
    });
};
