import React, {createContext, FC, useEffect, useState} from "react";
import {CartContextState} from "../type/CartContextState";
import {Cart} from "../type/Cart";
import CookieService from "../../Cookie/CookieService";

const CartContextStateDefault: CartContextState = {
    cart: [],
    quantity: 0,
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    price: 0
}

const expiresAt = 60 * 24;

const cartFromCookie = CookieService.get("cart");

export const CartContext = createContext<CartContextState>(CartContextStateDefault);

const CartProvider: FC = ({children}) => {
    const [cart, setCart] = useState<Cart[]>(cartFromCookie===undefined?[]:cartFromCookie);
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

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

        let totalPrice:number = 0;
        cart.forEach(item => {
            totalPrice += (Math.round(item.quantity * item.vinyl.realPrice * 100) / 100);
        })
        setPrice(totalPrice);

        let date = new Date();
        date.setTime(date.getTime() + (expiresAt * 60 *1000));
        const option = {path: "/", expires: date};
        CookieService.set("cart", JSON.stringify(cart), option);
    }, [cart]);

    const removeFromCart = (itemID:number) => {
        let cartArray = [...cart];
        cartArray.forEach((item, index) => {
            if (item.vinyl.id === itemID) {
                cartArray.splice(index,1);
            }
        });
        setCart(cartArray);
    };

    const updateQuantity = (cartItem:Cart, quantity:number) => {
        if (quantity === 0) {
            removeFromCart(cartItem.vinyl.id);
        } else {
            setCart(prevState => {
                const isItemInCart = prevState.find(item => item.vinyl.id === cartItem.vinyl.id);
                if (isItemInCart) {
                    return prevState.map(item =>
                        item.vinyl.id === cartItem.vinyl.id
                            ? {...item, quantity: quantity}
                            : item
                    );
                }
                return [...prevState, cartItem];
            });
        }
    };

    return (
        <CartContext.Provider value={
            {
                cart,
                quantity,
                addToCart,
                removeFromCart,
                updateQuantity,
                price
            }
        }>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;