import React from "react";
import HeaderLogoAndMenu from "../sub-components/header/HeaderLogoAndMenu";
import AccountAndCart from "../sub-components/header/AccountAndCart";

const Header = () => {
    return(
        <div className="header">
            <div className="grid wide">
                <div className="header__nav">
                    <HeaderLogoAndMenu/>
                    <AccountAndCart/>
                </div>
            </div>
        </div>
    );
}

export default Header;