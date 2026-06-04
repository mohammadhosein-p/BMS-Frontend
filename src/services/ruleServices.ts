import { deleteData, getData, postData, putData } from "./services";
import type {
  Rule,
  CreateRulePayload,
  UpdateRulePayload,
  ApiResponse,
} from "../types/ruleTypes";

export const getRulesService = async (
  apartmentId: string
): Promise<ApiResponse<Rule[]>> => {
  return getData({
    endPoint: `/apartments/${apartmentId}/rules`,
  });
};

export const createRuleService = async (
  apartmentId: string,
  ruleData: CreateRulePayload
): Promise<ApiResponse<Rule>> => {
  return postData({
    endPoint: `/apartments/${apartmentId}/rules`,
    data: ruleData,
  });
};

export const updateRuleService = async (
  apartmentId: string,
  ruleId: string,
  ruleData: UpdateRulePayload
): Promise<ApiResponse<Rule>> => {
  return putData({
    endPoint: `/apartments/${apartmentId}/rules/${ruleId}`,
    data: ruleData,
  });
};

export const deleteRuleService = async (
  apartmentId: string,
  ruleId: string
): Promise<ApiResponse<null>> => {
  return deleteData({
    endPoint: `/apartments/${apartmentId}/rules/${ruleId}`,
  });
};

export const getApartmentInfoService = async (id: string) => {
  return getData({
    endPoint: `/apartments/${id}`,
  });
};