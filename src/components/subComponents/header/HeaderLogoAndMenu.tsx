import React, {useState} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import ProductMenu from "./ProductMenu";
import BlogMenu from "./BlogMenu";

const HeaderLogoAndMenu = () => {
    const apiUrlDefault = process.env.REACT_APP_API_URL_DEFAULT;

    const logoSrc = `${apiUrlDefault}images/logos/logo.png`;

    const [showMenu,setShowMenu] = useState(false);

    const handleHoverMenu = () => {
        setShowMenu(!showMenu);
    }

    const [showBlog,setShowBlog] = useState(false);

    const handleHoverBlog = () => {
        setShowBlog(!showBlog);
    }

    return(
        <div className="header__logo_menu">
            <div>
                <Link to="/">
                    <img src={logoSrc} alt="DTRecords"/>
                </Link>
            </div>
            <div className="header__menu" onMouseEnter={handleHoverMenu} onMouseLeave={handleHoverMenu}>
                <Link to="/products" className="header__menu-link">
                    Cửa Hàng
                    <i className={classNames("fas", {"fa-angle-down": !showMenu}, {"fa-angle-up": showMenu})}/>
                </Link>
                <ProductMenu/>
            </div>
            <div className="header__menu" onMouseEnter={handleHoverBlog} onMouseLeave={handleHoverBlog}>
                <Link to="/all-vinyl-product" className="header__menu-link">
                    Bản Tin Trọng Đại
                    <i className={classNames("fas", {"fa-angle-down": !showBlog}, {"fa-angle-up": showBlog})}/>
                </Link>
                <BlogMenu/>
            </div>
        </div>
    );
}

export default HeaderLogoAndMenu;