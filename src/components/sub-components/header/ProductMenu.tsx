import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";

const ProductMenu = () => {
    const headerMenu = [
        {
            headerTitle: "Sản Phẩm",
            ProductMenuList: [
                {
                    url: "/all-vinyl-product/justAdded",
                    title: "Sản phẩm mới"
                },
                {
                    url: "/all-vinyl-product/under10Dollars",
                    title: "Dưới $10"
                },
                {
                    url: "/all-vinyl-product/under20Dollars",
                    title: "Dưới $20"
                },
                {
                    url: "/all-vinyl-product/under30Dollars",
                    title: "Dưới $30"
                },
                {
                    url: "/all-vinyl-product/over30Dollars",
                    title: "Trên $30"
                },
                {
                    url: "/all-vinyl-product",
                    title: "Tất cả sản phẩm"
                }
            ]
        },
        {
            headerTitle: "Thể Loại",
            ProductMenuList: [
                {
                    url: "/all-vinyl-product/popVinyl",
                    title: "Pop"
                },
                {
                    url: "/all-vinyl-product/rockVinyl",
                    title: "Rock"
                },
                {
                    url: "/all-vinyl-product/r&bVinyl",
                    title: "R&B"
                },
                {
                    url: "/all-vinyl-product/hiphopVinyl",
                    title: "HipHop"
                },
                {
                    url: "/all-vinyl-product/countryVinyl",
                    title: "Country"
                },
                {
                    url: "/all-vinyl-product",
                    title: "Xem toàn bộ thể loại"
                }
            ]
        }
    ]

    return(
        <div className="product_menu">
            <ul className="product_menu__selectors">
                {
                    headerMenu.map(menu => {
                        return(
                            <li className="product_menu__selector">
                                <ul className="product_menu__list">
                                    <li>
                                        <h2 className="product__selector__header">{menu.headerTitle}</h2>
                                    </li>
                                    {
                                        menu.ProductMenuList.map((productType,index) => {
                                            return(
                                                <li>
                                                    <Link to={productType.url} className={classNames("product__selector", {"font_weight_500": index===(menu.ProductMenuList.length-1)})}>{productType.title}</Link>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default ProductMenu;