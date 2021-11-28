import React from "react";
import {Link} from "react-router-dom";
import MenuOnMobileTablet from "./MenuOnMobileTablet";

const HeaderLogoAndMenuMobileAndTablet = ():JSX.Element => {
    const apiUrlDefault = process.env.REACT_APP_API_URL_DEFAULT;

    return (
        <div className={"header__logo_menu--Mobile-Tablet"}>
            <div className={"header__menu-bar"}>
                <label htmlFor="showMenuOnMobileAndTablet">
                    <i className="fas fa-bars"/>
                </label>
            </div>

            <input type="checkbox" hidden id={"showMenuOnMobileAndTablet"} className={"showMenuOnMobileAndTablet"}/>

            <MenuOnMobileTablet/>

            <Link to="/">
                <img src={`${apiUrlDefault}images/logos/logoInMobileTablet.png`} alt="DTRecords"/>
            </Link>
        </div>
    );
}

export default HeaderLogoAndMenuMobileAndTablet;

