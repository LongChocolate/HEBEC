export interface AddressDistrict {
    id: number;
    createdAt: number;
    updatedAt: number;
    isBlock: boolean;
    priority: number;
    parentCode: string;
    code: string;
    pathWithType: string;
    path: string;
    nameWithType: string;
    type: string;
    slug: string;
    name: string;
    feeDelivery: number;
}
