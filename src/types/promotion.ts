export interface Promotion {
    id: number;
    createdAt: number;
    updatedAt: number;
    value: number;
    minMoneyTotalCanApprove: number;
    type: string;
    endAt: number;
    startAt: number;
    code: string;
    title: string;
    thumbnail: string;
    image: string;
    description: string;
}
