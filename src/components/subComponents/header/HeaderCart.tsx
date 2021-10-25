import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {CartContext} from "../../context/CartProvider";

export default function HeaderCart() {
    const {cart,quantity, removeFromCart} = useContext(CartContext);

    return (
        <div className="header__cart">
            <Link to="/toCart" className="header__cart_icon">
                <i className="fas fa-shopping-cart"/>
                {
                    quantity>0 &&
                        <div className="cart__quantity">{quantity}</div>
                }
            </Link>
            <div className="header__shopping_cart">
                <h2 className="shopping_cart__header">Giỏ Hàng Của Bạn</h2>
                <div className="shopping_cart_view">
                    {
                        cart.length !== 0 ?
                            <div className="shopping_cart_list">
                                {
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
                                                            <p className="shopping_cart_item_quantity">Q: {cartItem.quantity}</p>
                                                            <p className="shopping_cart_item_price">P: {cartItem.quantity * cartItem.vinyl.realPrice}$</p>
                                                        </div>
                                                    </div>
                                                    <div className="shopping_cart_item_delete">
                                                        <i className="fas fa-trash-alt" onClick={() => removeFromCart(cartItem.vinyl.id)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>:
                            <p className="shopping_cart_empty">Bạn không có sản phẩm nào trong giỏ hàng.</p>
                        }
                </div>
                {
                    cart.length>0 &&
                        <Link to="/toCart" className="button__red__with-a">Đi đến giỏ hàng của bạn</Link>
                }
            </div>
        </div>
    );
}