import React from "react";
import {Link} from "react-router-dom";
import MenuOnMobileTablet from "./MenuOnMobileTablet";

const HeaderLogoAndMenuMobileAndTablet = ():JSX.Element => {
    const apiUrlDefault = process.env.REACT_APP_API_URL_DEFAULT;

    return (
        <div className={"header__logo_menu--Mobile-Tablet"}>
            <input type="checkbox" hidden id={"showMenuOnMobileAndTablet"}/>
            <div className={"header__menu-bar"}>
                <label htmlFor="showMenuOnMobileAndTablet">
                    <i className="fas fa-bars"/>
                    <i className="fas fa-times" style={{display:"none"}}/>
                </label>
            </div>
            <MenuOnMobileTablet/>

            <Link to="/" style={{"lineHeight": "0"}}>
                <img src={`${apiUrlDefault}images/logos/logoInMobileTablet.png`} alt="DTRecords"/>
            </Link>
        </div>
    );
}

export default HeaderLogoAndMenuMobileAndTablet;

