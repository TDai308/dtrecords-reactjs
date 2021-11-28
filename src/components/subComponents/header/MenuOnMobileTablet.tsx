import React from "react";
import {Link} from "react-router-dom";

const MenuOnMobileTablet = () => {
    return (
        <div className={"header__menu-on-mobile-tablet"}>
            <div>
                <Link to="/products" className="header__menu-link">
                    Cửa Hàng
                </Link>
                <input type="checkbox"/>
            </div>
            <div>
                <Link to="/products" className="header__menu-link">
                    Bản tin Trọng Đại
                </Link>
            </div>
        </div>
    );
};

export default MenuOnMobileTablet;

