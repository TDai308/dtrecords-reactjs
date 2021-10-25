import {Cart} from "./Cart";

export type CartContextState = {
    cart: Cart[];
    quantity: number;
    addToCart: (cartItem:Cart) => void;
    removeFromCart: (itemID:number) => void;
    updateQuantity: () => void;
};