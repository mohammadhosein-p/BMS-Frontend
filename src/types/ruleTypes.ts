export interface Rule {
    id: string; // یا number بسته به بک‌اند
    title: string;
    description: string;
    category: string; // مثلا 'قوانین عمومی'
    ruleNumber: number;
}

export interface BuildingInfo {
    name: string;
    managerName: string;
    address: string;
    city: string;
    postalCode: string;
}