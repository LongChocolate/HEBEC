export interface OrderDetail {
    book: {
        code: string;
        createdAt: number;
        description: string;
        finalPrice: number;
        id: number;
        isHighlight: boolean;
        isOutOfStock: boolean;
        isRemoved: boolean;
        name: string;
        originPrice: number;
        page: number;
        publishDate: string;
        size: string;
        thumbnail: string;
        type: string;
        updatedAt: number;
    };
    finalPrice: number;
    originPrice: number;
    quantity: number;
}
