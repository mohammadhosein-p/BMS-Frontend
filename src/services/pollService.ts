import type { CreatePollBody, GetAllPollsResponse } from "@/types/PollTypes";
import { getData, postData } from "./services";

export const createPollService = async (
    pollData: CreatePollBody,
    apartment_id: string,
): Promise<void> => {
    await postData({
        endPoint: `/apartments/${apartment_id}/polls`,
        data: pollData,
    });
};

export const getAllPollService = async (apartment_id: string): Promise<GetAllPollsResponse> => {
    return getData({
        endPoint: `/apartments/${apartment_id}/polls`
    });
};