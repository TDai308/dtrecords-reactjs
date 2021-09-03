import React, {useContext} from "react";
import HeaderCart from "./HeaderCart";
import LoginSignup from "./LoginSignup";
import Account from "./Account";
import {UserContext} from "../../context/UserProvider";

export default function AccountAndCart() {
    const {isLogged} = useContext(UserContext);

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