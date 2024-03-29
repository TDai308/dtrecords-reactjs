import React from "react";
import {Cart} from "../../../type/Cart";

export interface ShoppingCartInterface {
    cartItem: Cart,
    updateQuantity: (cartItem:Cart, quantity:number) => void,
    removeFromCart: (itemID:number) => void
}

const CartItem: React.FC<ShoppingCartInterface> = ({cartItem, updateQuantity, removeFromCart}) => {

    const UrlDefault = process.env["REACT_APP_URL"];

    return (
        <div className="cart__product_items">
            <div className="cart__product_img">
                <img src={`${UrlDefault}${cartItem.vinyl.thumbnail1}`} alt={cartItem.vinyl.vinylName}/>
            </div>
            <div className="cart__product_infor">
                <h3>Vinyl Record</h3>
                <div className="cart__product_name">{cartItem.vinyl.vinylName} - {cartItem.vinyl.artist.nameArtist}</div>
                <div className="cart__product_quantity_and_price">
                    <div className="cart__product_quantity">
                        <button onClick={() => updateQuantity(cartItem,cartItem.quantity-1)}>-</button>
                        <p>{cartItem.quantity}</p>
                        <button onClick={() => updateQuantity(cartItem,cartItem.quantity+1)} disabled={cartItem.quantity===cartItem.vinyl.quantity}>+</button>
                    </div>
                    <div className="cart__product_price" >
                        <div>Price: {(Math.round(cartItem.quantity * cartItem.vinyl.realPrice * 100) / 100)}$</div>
                    </div>
                </div>
                <div className="cart__product_delete">
                    <span style={{fontSize: "1rem",color: "var(--gray-coler)"}}>Hiện đang có sẵn</span>
                    <i style={{margin: "10px", cursor: "pointer"}} className="fas fa-trash-alt" onClick={() => removeFromCart(cartItem.vinyl.id)}/>
                </div>
            </div>
        </div>
    );
}

export default CartItem;