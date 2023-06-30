import React, {useState, createContext} from 'react';
import {ICart, CartContextType} from '@/types/cart';
import { IProduct } from '@/types/product';

export const CartContext = createContext<CartContextType>(null);

const defaultCard = {
    product: [],
    total: 0,
};

const CartProvider = ({children}) => {
    const [cart, setCart] = useState<ICart>(defaultCard);

    const updateProduct = (product: IProduct) => {
        setCart((prevState) => ({
            ...prevState,
        }));
    };

    const insertProduct = (product: IProduct) => {
        setCart((prevState) => ({
            ...prevState,
            product: cart.product.concat(product),
        }));
    };

    const removeProduct = (id: number) => {
        let indexP = undefined;
        cart.product.map((product, index) => {
            if (product.id == id) {
                indexP = index;
            }
        });
        setCart({product: cart.product.splice(indexP, 1), total: cart.total});
    };

    return (
        <CartContext.Provider value={{cart, updateProduct, insertProduct, removeProduct}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
