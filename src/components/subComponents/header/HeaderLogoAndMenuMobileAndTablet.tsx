import React, {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import MenuOnMobileTablet from "./MenuOnMobileTablet";
import $ from "jquery";

const HeaderLogoAndMenuMobileAndTablet = ():JSX.Element => {
    const UrlDefault = process.env["REACT_APP_URL"];
    const location = useLocation();

    useEffect(() => {
        $("#showMenuOnMobileAndTablet").prop("checked", false);
    }, [location]);

    return (
        <div className={"header__logo_menu--Mobile-Tablet"}>
            <div className={"header__menu-bar"}>
                <input type="checkbox" hidden id={"showMenuOnMobileAndTablet"}/>
                <label htmlFor="showMenuOnMobileAndTablet">
                    <i className="fas fa-bars"/>
                    <i className="fas fa-times" style={{display:"none"}}/>
                </label>
                <MenuOnMobileTablet/>
                <label htmlFor="showMenuOnMobileAndTablet" className={"oval"} style={{
                    display: "none",
                    animation: "productMenuAppear ease-in .2s",
                    zIndex: -1
                }}/>
            </div>

            <Link to="/" style={{"lineHeight": "0"}}>
                <img src={`${UrlDefault}images/logos/logoInMobileTablet.png`} alt="DTRecords"/>
            </Link>
        </div>
    );
}

export default HeaderLogoAndMenuMobileAndTablet;

