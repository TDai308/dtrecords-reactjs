import React from "react";
import {Link} from "react-router-dom";

export default function HeaderCart() {
    return (
        <div className="header__cart">
            <Link to="/toCart" className="header__cart_icon">
                <i className="fas fa-shopping-cart"/>
                {/*<div className="cart__quantity">{quantity}</div>*/}
            </Link>
            <div className="header__shopping_cart">
                <h2 className="shopping_cart__header">Giỏ Hàng Của Bạn</h2>
                <div className="shopping_cart_view">
                    {/*th:if="not ${selectedVinyl.isEmpty()}"*/}
                    {/*<div className="shopping_cart_list">*/}
                    {/*    /!*<th:block th:each="vinyl: ${selectedVinyl}">*!/*/}
                    {/*        <div className="shopping_cart_item">*/}
                    {/*            <div className="shopping_cart_item_img">*/}
                    {/*                <img*/}
                    {/*                    th:src="@{/static/img/vinylImg/__${vinyl.getKey().name}__-__${vinyl.getKey().artist.name}__/__${vinyl.getKey().img1}__}"*/}
                    {/*                    th:alt="${vinyl.getKey().name}" alt="img">*/}
                    {/*            </div>*/}
                    {/*            <div className="shopping_cart_item_infor_delete">*/}
                    {/*                <div className="shopping_cart_item_infor">*/}
                    {/*                    <div className="shopping_cart_item_title">*/}
                    {/*                        <p className="shopping_cart_item_name" th:text="${vinyl.getKey().name}"></p>*/}
                    {/*                        <p className="shopping_cart_item_artistName"*/}
                    {/*                           th:text="${vinyl.getKey().artist.name}"></p>*/}
                    {/*                        <p style="color: var(--gray-coler); margin: 4px 0">In Stock</p>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="shopping_cart_item_quantity_price">*/}
                    {/*                        <p className="shopping_cart_item_quantity"*/}
                    {/*                           th:text="'Q: ' + ${vinyl.getValue()}"></p>*/}
                    {/*                        <p th:if="${vinyl.getKey().onSale}==false"*/}
                    {/*                           className="shopping_cart_item_price"*/}
                    {/*                           th:text="'P: '+${vinyl.getValue() * vinyl.getKey().price}+'$'"></p>*/}
                    {/*                        <p th:if="${vinyl.getKey().onSale}==true"*/}
                    {/*                           className="shopping_cart_item_price"*/}
                    {/*                           th:text="'P: '+${vinyl.getValue() * vinyl.getKey().salePrice}+'$'"></p>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className="shopping_cart_item_delete">*/}
                    {/*                    <a th:href="@{/remove/home/__${vinyl.getKey().vinylID}__}"><i className="fas fa-trash-alt"></i></a>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    <Link to="/toCart" className="button__red__with-a">Đi đến giỏ hàng của bạn</Link>*/}
                    {/*</div>*/}
                    {/*th:if="${selectedVinyl.isEmpty()}"*/}
                    <p className="shopping_cart_empty">Bạn không có sản phẩm nào trong giỏ hàng.</p>
                </div>
            </div>
        </div>
    );
}