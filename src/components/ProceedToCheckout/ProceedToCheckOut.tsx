import React, {useContext} from "react";
import {CartContext} from "../context/CartProvider";

export default function ProceedToCheckOut() {
    const {cart, price} = useContext(CartContext);

    return (
        <div className={"background-signup-loggin"}>
            <div className="oval">
                <form className="sign_up__form">
                    <h1 className="sign_up__header">Hãng Đĩa Trọng Đại</h1>
                    <h2>Kiểm Tra Đơn Hàng Của Bạn.</h2>

                    <div className="grid">
                        <div className="row sm-gutter app-content">
                            <div className="col l-8">
                                <div className="order__form">
                                    <label className="has-float-label">
                                        <input className="sign_up__input" name="customerName" required type="text"/>
                                            <span>Tên *</span>
                                    </label>

                                    <label className="has-float-label">
                                        <input className="sign_up__input" name="customerPhone" required type="tel" pattern="[0-9]{4}[0-9]{3}[0-9]{3}"/>
                                            <span>Số Điện Thoại</span>
                                    </label>

                                    <label className="has-float-label">
                                        <input className="sign_up__input" name="customerEmail" required type="email"/>
                                            <span>Email</span>
                                    </label>

                                    <label className="has-float-label">
                                        <input className="sign_up__input" name="customerAddress" required type="text"/>
                                            <span>Địa chỉ</span>
                                    </label>
                                </div>
                            </div>
                            <div className="col l-4">
                                <div className="order_cart">
                                    {
                                        cart.map((item, inex) => {
                                            return (
                                                <div className="shopping_cart_item" key={inex}>
                                                    <div className="shopping_cart_item_img">
                                                        <img src={`http://localhost:8080/${item.vinyl.thumbnail1}`} alt={item.vinyl.vinylName}/>
                                                    </div>
                                                    <div className="shopping_cart_item_infor_delete">
                                                        <div className="shopping_cart_item_infor">
                                                            <div className="shopping_cart_item_title">
                                                                <p className="shopping_cart_item_name">{item.vinyl.vinylName}</p>
                                                                <p className="shopping_cart_item_artistName">{item.vinyl.artist.nameArtist}</p>
                                                                <p style={{"color": "var(--gray-coler)", "margin": "4px 0"}}>In Stock</p>
                                                            </div>
                                                            <div className="shopping_cart_item_quantity_price">
                                                                <p className="shopping_cart_item_quantity">Q: {item.quantity}</p>
                                                                <p className={"shopping_cart_item_price"}>P: {(Math.round(item.quantity * item.vinyl.realPrice * 100) / 100).toFixed(2)}$</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                <div className="order_totalPrice">
                                    <p style={{"margin": "0 5px 0", "display": "inline-block"}}>Free Ship Với</p>
                                    <i style={{"color": "var(--red-color)", "background": "yellow", "display": "inline-block"}} className="fab fa-dhl fa-3x"/>
                                </div>
                                <div className="order_totalPrice">Tổng Tiền: {price}$
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="button_Login_Signup" type="button">Xác Nhận Đơn Hàng</button>
                </form>
            </div>
        </div>
    );
}