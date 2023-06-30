export interface IProduct {
    bookId: number | undefined;
    name: string | undefined;
    price: number | undefined;
    quantity: number | undefined;
}

export type ProductContextType = {
    product: IProduct;
    updateProduct: (product: IProduct) => void;
    newProduct: (product: IProduct) => void;
};
