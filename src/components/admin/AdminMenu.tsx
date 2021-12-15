import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserProvider";

export default function AdminMenu() {
    const {logOut} = useContext(UserContext);

    const UrlDefault = process.env["REACT_APP_URL"];

    return (
        <div className="admin_page__menu">
            <h1>Hello Admin</h1>
            <div className="admin_page__menu_list">
                <Link to="/admin/vinyl" className="admin_page__menu_item" >
                    <img src={`${UrlDefault}images/admin/music-album.png`} alt="Vinyl"/>
                    <p>Vinyl Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/admin/track">
                    <img src={`${UrlDefault}images/admin/music.png`} alt="Track"/>
                    <p>Track Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/admin/order">
                    <img src={`${UrlDefault}images/admin/box.png`} alt="Order"/>
                    <p>Order Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/admin/customer">
                    <img src={`${UrlDefault}images/admin/shopper.png`} alt="Customer"/>
                    <p>Customer Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/admin/artist">
                    <img src={`${UrlDefault}images/admin/musician.png`} alt="Artist"/>
                    <p>Artist Manager</p>
                </Link>
                <div className="admin_page__menu_item" style={{
                    cursor: "pointer"
                }}  onClick={logOut}>
                    <img src={`${UrlDefault}images/admin/logout.png`} alt="Log Out"/>
                    <p>Log Out</p>
                </div>
            </div>
        </div>
    );
}