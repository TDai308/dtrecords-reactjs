import React, {createContext, FC, useEffect, useState} from "react";
import {CartContextState} from "../type/CartContextState";
import {Cart} from "../type/Cart";

const CartContextStateDefault: CartContextState = {
    cart: [],
    quantity: 0,
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {}
}

export const CartContext = createContext<CartContextState>(CartContextStateDefault);

const CartProvider: FC = ({children}) => {
    const [cart, setCart] = useState<Cart[]>([]);
    const [quantity, setQuantity] = useState<number>(0);

    const addToCart = (cartItem:Cart) => {
        setCart(prevState => {
            const isItemInCart = prevState.find(item => item.vinyl === cartItem.vinyl);

            if (isItemInCart) {
                return prevState.map(item =>
                    item.vinyl === cartItem.vinyl
                        ? {...item, quantity: item.quantity+cartItem.quantity}
                        : item
                );
            }
            return [...prevState, cartItem];
        });
    };

    useEffect(() => {
        let totalQuantity:number = 0;
        cart.forEach(item => {
            totalQuantity += item.quantity;
        })
        setQuantity(totalQuantity);
    }, [cart]);

    const removeFromCart = () => {

    };

    const updateQuantity = () => {

    };

    return (
        <CartContext.Provider value={
            {
                cart,
                quantity,
                addToCart,
                removeFromCart,
                updateQuantity
            }
        }>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;