export interface News {
    id: number;
    createdAt: number;
    updatedAt: number;
    isDeleted: boolean;
    title: string;
    thumbnail: string;
    body: string;
    image: string;
    isHighlight: boolean;
    isRemoved: boolean;
}
