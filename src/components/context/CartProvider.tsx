import React, {createContext, FC, useEffect, useState} from "react";
import {CartContextState} from "../type/CartContextState";
import {Cart} from "../type/Cart";

const CartContextStateDefault: CartContextState = {
    cart: [],
    quantity: 0,
    addToCart: (cartItem:Cart) => {},
    removeFromCart: () => {},
    updateQuantity: () => {}
}

export const CartContext = createContext<CartContextState>(CartContextStateDefault);

const CartProvider: FC = ({children}) => {
    const [cart, setCart] = useState<Cart[]>([]);
    const [quantity, setQuantity] = useState<number>(0);

    const addToCart = (cartItem:Cart) => {
        setCart(cart.concat(cartItem));
    };

    useEffect(() => {
        cart.forEach((item) => {
            const totalQuantity:number = quantity + item.quantity;
            setQuantity(totalQuantity);
        })
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