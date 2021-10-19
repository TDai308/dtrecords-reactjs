import {Cart} from "./Cart";

export type CartContextState = {
    cart: Cart[];
    quantity: number;
    addToCart: (cartItem:Cart) => void;
    removeFromCart: () => void;
    updateQuantity: () => void;
};