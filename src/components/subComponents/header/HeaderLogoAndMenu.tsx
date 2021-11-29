import React from "react";
import {Link} from "react-router-dom";
import ProductMenu from "./ProductMenu";
import BlogMenu from "./BlogMenu";

const HeaderLogoAndMenu = () => {
    const apiUrlDefault = process.env.REACT_APP_API_URL_DEFAULT;

    const logoSrc = `${apiUrlDefault}images/logos/logo.png`;

    return(
        <div className="header__logo_menu">
            <div>
                <Link to="/">
                    <img src={logoSrc} alt="DTRecords" style={{width: "240px"}}/>
                </Link>
            </div>
            <div className="header__menu">
                <Link to="/products" className="header__menu-link">
                    Cửa Hàng
                    <i className={"fas fa-angle-down"}/>
                </Link>
                <ProductMenu/>
            </div>
            <div className="header__menu">
                <Link to="/all-vinyl-product" className="header__menu-link">
                    Bản Tin Trọng Đại
                    <i className={"fas fa-angle-down"}/>
                </Link>
                <BlogMenu/>
            </div>
        </div>
    );
}

export default HeaderLogoAndMenu;