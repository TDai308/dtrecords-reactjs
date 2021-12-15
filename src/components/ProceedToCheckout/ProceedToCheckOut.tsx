import React, {useContext, useState} from "react";
import {CartContext} from "../context/CartProvider";
import {UserContext} from "../context/UserProvider";
import {CustomerInformation} from "../type/User";
import {orderApi} from "../../api/orderApi";
import $ from "jquery";

export default function ProceedToCheckOut() {
    const {cart, price, removeAllCart} = useContext(CartContext);
    const {user} = useContext(UserContext);
    const [customerInformation, setCustomerInformation] = useState<CustomerInformation>({
        customerName : user.name,
        customerPhone : user.phoneNumber,
        customerEmail : user.email,
        customerAddress : user.address,
    })

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerInformation({...customerInformation,[event.currentTarget.name]: event.target.value});
    }
    
    const handleTheOrder = async () => {
        try {
            await orderApi.handleOrder(customerInformation,cart);
            $("#successNotification").css({"display": "block"});
            setTimeout(() => {
                removeAllCart();
                window.location.href = "/";
            },2000);
        } catch (e) {
            console.log("error",e);
        }
    }

    const handleGoToHomePage = () => {
        removeAllCart();
        window.location.href = "/";
    }

    const UrlDefault = process.env["REACT_APP_URL"];

    const logoSrc = `${UrlDefault}images/logos/logo-black.png`;

    return (
        <div className={"background-signup-loggin"}>
            <div className="oval" style={{zIndex: 1, display: "none"}} id={"successNotification"}>
                <div className="thank_order">
                    <img src={logoSrc} alt="DTRecords" style={{width: "240px"}}/>
                    <h2>Cảm ơn vì đã mua hàng tại Hãng Đĩa Trọng Đại</h2>
                    <i className="fas fa-check fa-5x" style={{color: "#58EA2F"}}/>
                    <p>Đơn hàng của bạn đã được đặt thành công và đang được xử lý. Bạn sẽ nhận được mail xác nhận
                        đơn hàng và chúng mình sẽ gọi điện để xác nhận đơn hàng.</p>
                    <p id={"goToHomePageLink"} onClick={handleGoToHomePage}>Trở về trang chủ</p>
                </div>
            </div>
            <div className="oval">
                <form className="sign_up__form">
                    <img src={logoSrc} alt="DTRecords" style={{width: "240px"}}/>

                    <h2>Kiểm Tra Đơn Hàng Của Bạn.</h2>

                    <div className="grid">
                        <div className="row sm-gutter app-content">
                            <div className="col l-8 m-12 c-12">
                                <div className="order__form">
                                    <label className="has-float-label">
                                        <input className="sign_up__input" name="customerName" defaultValue={customerInformation.customerName} onChange={handleChangeInput} required type="text"/>
                                            <span>Tên</span>
                                    </label>

                                    <label className="has-float-label">
                                        <input className="sign_up__input" name="customerPhone" defaultValue={customerInformation.customerPhone} onChange={handleChangeInput} required type="tel" pattern="[0-9]{4}[0-9]{3}[0-9]{3}"/>
                                            <span>Số Điện Thoại</span>
                                    </label>

                                    <label className="has-float-label">
                                        <input className="sign_up__input" name="customerEmail" defaultValue={customerInformation.customerEmail} onChange={handleChangeInput} required type="email"/>
                                            <span>Email</span>
                                    </label>

                                    <label className="has-float-label">
                                        <input className="sign_up__input" name="customerAddress" defaultValue={customerInformation.customerAddress} onChange={handleChangeInput} required type="text"/>
                                            <span>Địa chỉ</span>
                                    </label>
                                </div>
                            </div>
                            <div className="col l-4 m-12 c-12">
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

                    <button className="button_Login_Signup" type="button" onClick={handleTheOrder}>Xác Nhận Đơn Hàng</button>
                </form>
            </div>
        </div>
    );
}