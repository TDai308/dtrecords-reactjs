import React, {useContext} from "react";
import {CartContext} from "../../context/CartProvider";
import {Link} from "react-router-dom";
import CartItem from "./Cart/CartItem";

const Cart = (): JSX.Element => {
    const {cart, price, updateQuantity, removeFromCart} = useContext(CartContext);

    const renderCartList = (): JSX.Element[] => {
        return cart.map((cartItem, index) => {
            return (
                <CartItem key={index} cartItem={cartItem} updateQuantity={updateQuantity} removeFromCart={removeFromCart}/>
            );
        })
    };

    const renderCartTotalPrice = (): JSX.Element => {
      return (
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
      );
    }

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
                                    renderCartList()
                                }
                            </div>

                            <div className="col l-3">
                                {
                                    renderCartTotalPrice()
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Cart;