import React from "react";
import HeaderCart from "./HeaderCart";
import LoginSignup from "./LoginSignup";

export default function AccountAndCart() {
    return (
        <div className="header__account_cart">
            <LoginSignup/>
            <HeaderCart/>
        </div>
    );
}