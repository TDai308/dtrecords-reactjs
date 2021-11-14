import React from "react";
import {Cart} from "../../type/Cart";
import ShoppingCartItem from "./ShoppingCartItem";

interface ShoppingCartListInterface {
    cart: Cart[],
    updateQuantity: (cartItem:Cart, quantity:number) => void,
    removeFromCart: (itemID:number) => void
}

const ShoppingCartList: React.FC<ShoppingCartListInterface> = ({cart, updateQuantity, removeFromCart}) => {
    const renderShoppingCartList = (): JSX.Element[] => {
        return (
            cart.map((cartItem,index) => {
                return (
                    <ShoppingCartItem key={index} cartItem={cartItem} updateQuantity={updateQuantity} removeFromCart={removeFromCart}/>
                );
            })
        );
    }

    return (
        <div className="shopping_cart_list">
            {
                renderShoppingCartList()
            }
            </div>
    );
}

export default ShoppingCartList;

