import React, {useContext} from "react";
import {Link} from "react-router-dom";
import ProductMenu from "./ProductMenu";
import $ from "jquery";
import BlogMenu from "./BlogMenu";
import LoginSignup from "./LoginSignup";
import {UserContext} from "../../context/UserProvider";

const MenuOnMobileTablet = () => {
    const {isLogged, logOut} = useContext(UserContext);

    const handleOpenProductMenu = (event: React.ChangeEvent<HTMLInputElement>) => {
        const productMenu = $("#handleShowProductMenu");
        const blogMenu = $("#handleShowBlogMenu");
        if (!event.currentTarget.checked) {
            productMenu.prop("checked", true);
            blogMenu.prop("checked", false);
        } else {
            productMenu.prop("checked", true);
            blogMenu.prop("checked", false);
        }
    }

    const handleOpenBlogMenu = (event: React.ChangeEvent<HTMLInputElement>) => {
        const productMenu = $("#handleShowProductMenu");
        const blogMenu = $("#handleShowBlogMenu");
        if (!event.currentTarget.checked) {
            productMenu.prop("checked", false);
            blogMenu.prop("checked", true);
        } else {
            productMenu.prop("checked", false);
            blogMenu.prop("checked", true);
        }
    }

    return (
        <div className={"header__menu-on-mobile-tablet"}>
            <div className={"header__menu__Account-SaleOff"}>
                {
                    isLogged ?
                        <div className={"header__menu__Account-Mobile-Tablet"}>
                            <Link to="/" className="button__blue__with-a">
                                Tài khoản của tôi
                            </Link>
                            <button onClick={logOut} className="button__red__with-a">
                                Đăng Xuất
                            </button>
                        </div>
                        :<LoginSignup/>
                }
                <div>
                    <Link to={"/products/saleProducts"} className={"button__red__with-a"}>
                        Sale Off!
                    </Link>
                </div>
            </div>
            <label htmlFor={"handleShowProductMenu"}>
                <input type="checkbox" id={"handleShowProductMenu"} hidden defaultChecked={true} onChange={handleOpenProductMenu}/>
                <Link to="/products" className="header__menu-link">
                    Cửa Hàng
                </Link>
                <ProductMenu/>
            </label>
            <label htmlFor={"handleShowBlogMenu"}>
                <input type="checkbox" id={"handleShowBlogMenu"} hidden onChange={handleOpenBlogMenu}/>
                <Link to="/products" className="header__menu-link">
                    Bản tin Trọng Đại
                </Link>
                <BlogMenu/>
            </label>
        </div>
    );
};

export default MenuOnMobileTablet;

