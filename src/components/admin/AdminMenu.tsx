import React, {useContext} from "react";
import {Link} from "react-router-dom";
import musicAlbum from "../../static/img/admin/music-album.png";
import music from "../../static/img/admin/music.png";
import box from "../../static/img/admin/box.png";
import musician from "../../static/img/admin/musician.png";
import shopper from "../../static/img/admin/shopper.png";
import logout from "../../static/img/admin/logout.png";
import {UserContext} from "../context/UserProvider";

export default function AdminMenu() {
    const {logOut} = useContext(UserContext);

    return (
        <div className="admin_page__menu">
            <h1>Hello Admin</h1>
            <div className="admin_page__menu_list">
                <Link to="/admin/vinyl" className="admin_page__menu_item" >
                    <img src={musicAlbum} alt="Vinyl"/>
                    <p>Vinyl Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/admin/track">
                    <img src={music} alt="Track"/>
                    <p>Track Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/admin/order">
                    <img src={box} alt="Order"/>
                    <p>Order Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/admin/customer">
                    <img src={shopper} alt="Customer"/>
                    <p>Customer Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/admin/artist">
                    <img src={musician} alt="Artist"/>
                    <p>Artist Manager</p>
                </Link>
                <div className="admin_page__menu_item" style={{
                    cursor: "pointer"
                }}  onClick={logOut}>
                    <img src={logout} alt="Log Out"/>
                    <p>Log Out</p>
                </div>
            </div>
        </div>
    );
}