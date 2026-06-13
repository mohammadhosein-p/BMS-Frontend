import type { ApiResponse } from "../types/authTypes"; 
import type { 
    CreateUnitPayload, 
    CreateUnitResponse, 
    UpdateUnitPayload, 
    UnitResponse, 
    ApartmentDataResponse
} from "../types/unitTypes";
import { postData, getData, putData, patchData, deleteData } from "./services"; 


export const createUnitService = async (
    apartmentId: string, 
    payload: CreateUnitPayload
): Promise<CreateUnitResponse> => {
    const res: ApiResponse<CreateUnitResponse> = await postData({
        endPoint: `/apartments/${apartmentId}/units`, 
        data: payload,
    });
    return res.data;
};

export const updateUnitService = async (
    unitId: string, 
    payload: UpdateUnitPayload
): Promise<UnitResponse> => {
    const res: ApiResponse<UnitResponse> = await putData({
        endPoint: `/apartments/units/${unitId}`,
        data: payload,
    });
    return res.data;
};


export const getUnitByIdService = async (unitId: string): Promise<UnitResponse> => {
    const res: ApiResponse<UnitResponse> = await getData({
        endPoint: `/apartments/units/${unitId}`,
    });
    return res.data;
};

export const deleteUnitService = async (unitId: string): Promise<void> => {
    await deleteData({
        endPoint: `/apartments/units/${unitId}`,
    });
};

export const pushUserToUnitService = async (
    unitId: string, 
    payload: { user_id: string }
): Promise<UnitResponse> => {
    const res: ApiResponse<UnitResponse> = await postData({
        endPoint: `/apartments/units/${unitId}/users`,
        data: payload,
    });
    return res.data;
};


export const popUserFromUnitService = async (unitId: string): Promise<UnitResponse> => {
    const res: ApiResponse<UnitResponse> = await patchData({
        endPoint: `/apartments/units/${unitId}`,
        data: {},
    });
    return res.data;
};


export const getApartmentUnitsService = async (apartmentId: string): Promise<ApartmentDataResponse> => {
    const res: ApiResponse<ApartmentDataResponse> = await getData({
        endPoint: `/apartments/${apartmentId}`, 
    });
    return res.data; 
};