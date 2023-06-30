import React, {useState, createContext} from 'react';

import {IProduct, ProductContextType} from '@/types/product';

export const ProductContext = createContext<ProductContextType>(null);

const defaultCard = {
    id: undefined,
    name: undefined,
    price: undefined,
    amount: undefined,
};

const ProductProvider = ({children}) => {
    const [product, setProduct] = useState<IProduct>(defaultCard);

    const updateProduct = (product: IProduct) => {
        setProduct((prevState) => ({
            ...prevState,
        }));
    };

    const newProduct = (product: IProduct) => {
        setProduct({
            id: product.id,
            name: product.name,
            price: product.price,
            amount: product.amount,
        });
    };

    return <ProductContext.Provider value={{product, updateProduct, newProduct}}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
