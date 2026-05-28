import type {
    CreatePollBody,
    GetAllPollsResponse,
    GetSinglePollResponse,
} from "@/types/PollTypes";
import { deleteData, getData, postData } from "./services";

export const createPollService = async (
    pollData: CreatePollBody,
    apartment_id: string,
): Promise<void> => {
    await postData({
        endPoint: `/apartments/${apartment_id}/polls`,
        data: pollData,
    });
};

export const getAllPollService = async (
    apartment_id: string,
): Promise<GetAllPollsResponse> => {
    return getData({
        endPoint: `/apartments/${apartment_id}/polls`,
    });
};

export const getPollByIdService = async (
    apartment_id: string,
    poll_id: string,
): Promise<GetSinglePollResponse> => {
    return getData({
        endPoint: `/apartments/${apartment_id}/polls/${poll_id}`,
    });
};

export const deletePollByIdService = async (
    apartment_id: string,
    poll_id: string,
): Promise<void> => {
    return deleteData({
        endPoint: `/apartments/${apartment_id}/polls/${poll_id}`,
    });
};