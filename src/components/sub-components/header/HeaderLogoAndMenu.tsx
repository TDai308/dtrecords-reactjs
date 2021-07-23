import React, {useState} from "react";
import {Link} from "react-router-dom";
import logo from "../../../static/img/logo.png"
import classNames from "classnames";
import ProductMenu from "./ProductMenu";
import BlogMenu from "./BlogMenu";

const HeaderLogoAndMenu = () => {
    const [showmenu,setShowmenu] = useState(false);

    const handleHoverMenu = () => {
        setShowmenu(!showmenu);
    }

    const [showblog,setShowblog] = useState(false);

    const handleHoverBlog = () => {
        setShowblog(!showblog);
    }

    return(
        <div className="header__logo_menu">
            <div>
                <Link to="/">
                    <img src={logo} alt="DTRecords"/>
                </Link>
            </div>
            <div className="header__menu" onMouseEnter={handleHoverMenu} onMouseLeave={handleHoverMenu}>
                <Link to="/all-vinyl-product" className="header__menu-link">
                    Cửa Hàng
                    <i className={classNames("fas", {"fa-angle-down": !showmenu}, {"fa-angle-up": showmenu})}/>
                </Link>
                <ProductMenu/>
            </div>
            <div className="header__menu" onMouseEnter={handleHoverBlog} onMouseLeave={handleHoverBlog}>
                <Link to="/all-vinyl-product" className="header__menu-link">
                    Bản Tin Trọng Đại
                    <i className={classNames("fas", {"fa-angle-down": !showblog}, {"fa-angle-up": showblog})}/>
                </Link>
                <BlogMenu/>
            </div>
        </div>
    );
}

export default HeaderLogoAndMenu;