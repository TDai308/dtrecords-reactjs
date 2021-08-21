import React from "react";
import HeaderCart from "./HeaderCart";
import LoginSignup from "./LoginSignup";
import Account from "./Account";

export default function AccountAndCart() {
    const isLogged = localStorage.getItem("access_token")!=null;

    return (
        <div className="header__account_cart">
            {
                isLogged ? <Account/>
                    :<LoginSignup/>
            }
            <HeaderCart/>
        </div>
    );
}