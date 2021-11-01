import React, {useContext} from "react";
import {CartContext} from "../../context/CartProvider";
import {Link} from "react-router-dom";

const Cart = () => {
    const {cart, price, updateQuantity, removeFromCart} = useContext(CartContext);

    return (
        <div>
            {
                cart.length === 0 ?
                    <div>
                        <h1>Bạn chưa thêm món đồ nào vào giỏ hàng nè :(((((</h1>
                    </div> :
                    <div>
                        <h1 className="cart__title">Giỏ hàng của bạn</h1>
                        <div className="row sm-gutter app-content">
                            <div className="col l-9">
                                {
                                    cart.map((cartItem, index) => {
                                        return (
                                            <div className="cart__product_items" key={index}>
                                                <div className="cart__product_img">
                                                    <img src={`http://localhost:8080/${cartItem.vinyl.thumbnail1}`} alt={cartItem.vinyl.vinylName}/>
                                                </div>
                                                <div className="cart__product_infor">
                                                    <h3>Vinyl Record</h3>
                                                    <div className="cart__product_name">{cartItem.vinyl.vinylName} - {cartItem.vinyl.artist.nameArtist}</div>
                                                    <div className="cart__product_quantity_and_price">
                                                        <div className="cart__product_quantity" style={{
                                                            width: "15%"
                                                        }}>
                                                            <button onClick={() => updateQuantity(cartItem,cartItem.quantity-1)}>-</button>
                                                            <p style={{margin: "0"}}>{cartItem.quantity}</p>
                                                            <button onClick={() => updateQuantity(cartItem,cartItem.quantity+1)} disabled={cartItem.quantity===cartItem.vinyl.quantity}>+</button>
                                                        </div>
                                                        <div className="cart__product_price" >
                                                            <div>Price: {cartItem.quantity * cartItem.vinyl.realPrice}$</div>
                                                        </div>
                                                    </div>
                                                    <div className="cart__product_delete">
                                                        <span style={{fontSize: "1rem",color: "var(--gray-coler)"}}>Hiện đang có sẵn</span>
                                                        <i style={{margin: "10px", cursor: "pointer"}} className="fas fa-trash-alt" onClick={() => removeFromCart(cartItem.vinyl.id)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>

                            <div className="col l-3">
                                <div className="cart__total_price">
                                    <h2>Tổng Đơn Hàng</h2>
                                    <div className="subtotal">
                                        <p className="cart__total_price__title">Tổng tiền:</p>
                                        <p className="subtotal_price">{price}$</p>
                                    </div>
                                    <div className="total">
                                        <p className="cart__total_price__title">Tổng:</p>
                                        <p className="total_price">{price}$</p>
                                    </div>
                                    <div className="button_checkout">
                                        <Link to={"/ProceedToCheckout"} className="button__blue__with-a width_100">Kiểm tra thông tin</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Cart;