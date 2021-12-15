import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {CartContext} from "../../context/CartProvider";
import ShoppingCartList from "./ShoppingCartList";

export default function HeaderCart() {
    const {cart,quantity, removeFromCart, updateQuantity, price} = useContext(CartContext);

    const UrlDefault = process.env["REACT_APP_URL"];

    return (
        <div className="header__cart">
            <Link to="/cart" className="header__cart_icon">
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
                            <ShoppingCartList cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart}/>:
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <img src={`${UrlDefault}images/image/cartEmpty.png`} alt="shoppingCartEmpty" style={{
                                    margin: "10px 0",
                                    width: "20%"
                                }}/>
                                <p className="shopping_cart_empty">Bạn không có sản phẩm nào trong giỏ hàng.</p>
                            </div>
                        }
                </div>
                {
                    cart.length>0 &&
                        <div>
                            <p>Tổng tiền: {price}$</p>
                            <Link to="/cart" className="button__red__with-a">Đi đến giỏ hàng của bạn</Link>
                        </div>
                }
            </div>
        </div>
    );
}