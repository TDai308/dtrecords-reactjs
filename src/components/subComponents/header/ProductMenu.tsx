import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";

const ProductMenu = () => {
    const headerMenu = [
        {
            headerTitle: "Sản Phẩm",
            ProductMenuList: [
                {
                    url: "/products/justAdded",
                    title: "Sản phẩm mới"
                },
                {
                    url: "/products/under10Dollars",
                    title: "Dưới $10"
                },
                {
                    url: "/aproducts/under20Dollars",
                    title: "Dưới $20"
                },
                {
                    url: "/products/under30Dollars",
                    title: "Dưới $30"
                },
                {
                    url: "/products/over30Dollars",
                    title: "Trên $30"
                },
                {
                    url: "/products",
                    title: "Tất cả sản phẩm"
                }
            ]
        },
        {
            headerTitle: "Thể Loại",
            ProductMenuList: [
                {
                    url: "/products/popVinyl",
                    title: "Pop"
                },
                {
                    url: "/products/rockVinyl",
                    title: "Rock"
                },
                {
                    url: "/products/r&bVinyl",
                    title: "R&B"
                },
                {
                    url: "/products/hiphopVinyl",
                    title: "HipHop"
                },
                {
                    url: "/products/countryVinyl",
                    title: "Country"
                },
                {
                    url: "/products",
                    title: "Xem toàn bộ thể loại"
                }
            ]
        }
    ]

    return(
        <div className="product_menu">
            <ul className="product_menu__selectors">
                {
                    headerMenu.map((menu, index) => {
                        return(
                            <li className="product_menu__selector" key={index}>
                                <ul className="product_menu__list">
                                    <li>
                                        <h2 className="product__selector__header">{menu.headerTitle}</h2>
                                    </li>
                                    {
                                        menu.ProductMenuList.map((productType,index) => {
                                            return(
                                                <li key={index}>
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