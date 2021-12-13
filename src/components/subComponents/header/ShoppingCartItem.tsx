import React from "react";

import {ShoppingCartInterface} from "../content/Cart/CartItem";

const ShoppingCartItem: React.FC<ShoppingCartInterface> = ({cartItem, updateQuantity, removeFromCart}) => {

    return (
        <div className="shopping_cart_item">
            <div className="shopping_cart_item_img">
                <img src={`https://dtrecords-api.herokuapp.com/${cartItem.vinyl.thumbnail1}`} alt={cartItem.vinyl.vinylName}/>
            </div>
            <div className="shopping_cart_item_infor_delete">
                <div className="shopping_cart_item_infor">
                    <div className="shopping_cart_item_title">
                        <p className="shopping_cart_item_name">{cartItem.vinyl.vinylName}</p>
                        <p className="shopping_cart_item_artistName">{cartItem.vinyl.artist.nameArtist}</p>
                        <p style={
                            {
                                color: "var(--gray-color)",
                                margin: "4px 0"
                            }
                        }>In Stock</p>
                    </div>
                    <div className="shopping_cart_item_quantity_price">
                        <div className="shopping_cart_item_quantity">
                            <button onClick={() => updateQuantity(cartItem,cartItem.quantity-1)}>-</button>
                            <p>{cartItem.quantity}</p>
                            <button onClick={() => updateQuantity(cartItem,cartItem.quantity+1)} disabled={cartItem.quantity===cartItem.vinyl.quantity}>+</button>
                        </div>
                        <p className="shopping_cart_item_price">Giá: {(Math.round(cartItem.quantity * cartItem.vinyl.realPrice * 100) / 100)}$</p>
                    </div>
                </div>
                <div className="shopping_cart_item_delete">
                    <i className="fas fa-trash-alt" onClick={() => removeFromCart(cartItem.vinyl.id)}/>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartItem;