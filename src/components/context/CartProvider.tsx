import React, {createContext, FC, useEffect, useState} from "react";
import {CartContextState} from "../type/CartContextState";
import {Cart} from "../type/Cart";
import CookieService from "../../Cookie/CookieService";

const CartContextStateDefault: CartContextState = {
    cart: [],
    quantity: 0,
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {}
}

const expiresAt = 60 * 24;

const cartFromCookie = CookieService.get("cart");

export const CartContext = createContext<CartContextState>(CartContextStateDefault);

const CartProvider: FC = ({children}) => {
    const [cart, setCart] = useState<Cart[]>(cartFromCookie===undefined?[]:cartFromCookie);
    const [quantity, setQuantity] = useState<number>(0);

    const addToCart = (cartItem:Cart) => {
        setCart(prevState => {
            const isItemInCart = prevState.find(item => item.vinyl.id === cartItem.vinyl.id);
            if (isItemInCart) {
                return prevState.map(item =>
                    item.vinyl.id === cartItem.vinyl.id
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
        let date = new Date();
        date.setTime(date.getTime() + (expiresAt * 60 *1000));
        const option = {path: "/", expires: date};
        // localStorage.setItem("cart", JSON.stringify(cart));
        CookieService.set("cart", JSON.stringify(cart), option);
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