import React from "react";
import HeaderLogoAndMenu from "../sub-components/header/HeaderLogoAndMenu";

const Header = () => {
    return(
        <div className="header">
            <div className="grid wide">
                <div className="header__nav">
                    <HeaderLogoAndMenu/>
                </div>
            </div>
        </div>
    );
}

export default Header;