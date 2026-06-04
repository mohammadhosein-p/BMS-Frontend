export interface BuildingInfo {
    name: string;
    address: string;
    city: string;
    postalCode: string;
}

export interface Rule {
  id: string;
  apartment_id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
}

export interface CreateRulePayload {
  title: string;
  description: string;
  category: string;
}

export type UpdateRulePayload = Partial<CreateRulePayload>;

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T; 
}
