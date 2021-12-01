import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";

const ProductMenu = () => {
    const headerProductMenu = [
        {
            headerTitle: "Sản Phẩm",
            ProductMenuList: [
                {
                    url: "/products/saleProducts",
                    title: "Sản phẩm giảm giá"
                },
                {
                    url: "/products/under10Dollars",
                    title: "Dưới $10"
                },
                {
                    url: "/products/under20Dollars",
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
                    url: "/products/PopVinyl",
                    title: "Pop"
                },
                {
                    url: "/products/RockVinyl",
                    title: "Rock"
                },
                {
                    url: "/products/R&BVinyl",
                    title: "R&B"
                },
                {
                    url: "/products/HipHopVinyl",
                    title: "HipHop"
                },
                {
                    url: "/products/CountryVinyl",
                    title: "Country"
                },
                {
                    url: "/products",
                    title: "Tất cả thể loại"
                }
            ]
        }
    ];

    const renderHeaderMenu = (): JSX.Element[] => {
        return headerProductMenu.map((menu, index) => {
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

    return(
        <div className="product_menu">
            <ul className="product_menu__selectors">
                {
                    renderHeaderMenu()
                }
            </ul>
        </div>
    );
}

export default ProductMenu;