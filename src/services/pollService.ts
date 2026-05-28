import type { CreatePollBody } from "@/types/PollTypes";
import { postData } from "./services";

export const createPollService = async (
    pollData: CreatePollBody,
    apartment_id: string
): Promise<void> => {
    await postData({
        endPoint: `/apartments/${apartment_id}/polls`,
        data: pollData,
    });
};