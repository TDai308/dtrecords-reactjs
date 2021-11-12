import React from "react";
import {Cart} from "../../type/Cart";

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
                    <div className="shopping_cart_item" key={index}>
                        <div className="shopping_cart_item_img">
                            <img src={`http://localhost:8080/${cartItem.vinyl.thumbnail1}`} alt={cartItem.vinyl.vinylName}/>
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

