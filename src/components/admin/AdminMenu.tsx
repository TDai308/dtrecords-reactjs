import React from "react";
import {Link} from "react-router-dom";
import musicAlbum from "../../static/img/admin/music-album.png";
import music from "../../static/img/admin/music.png";
import box from "../../static/img/admin/box.png";
import musician from "../../static/img/admin/musician.png";
import shopper from "../../static/img/admin/shopper.png";
import karaoke from  "../../static/img/admin/karaoke.png";
import logout from "../../static/img/admin/logout.png";

export default function AdminMenu() {
    return (
        <div className="admin_page__menu">
            <h1>Hello Admin</h1>
            <div className="admin_page__menu_list">
                <Link className="admin_page__menu_item" to="/admin/vinyllist">
                    <img src={musicAlbum} alt="Vinyl"/>
                    <p>Vinyl Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/admin/tracklist">
                    <img src={music} alt="Track"/>
                    <p>Track Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/admin/orderlist">
                    <img src={box} alt="Order"/>
                    <p>Order Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/admin/customerlist">
                    <img src={shopper} alt="Customer"/>
                    <p>Customer Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/admin/artistlist">
                    <img src={musician} alt="Artist"/>
                    <p>Artist Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/admin/genrelist">
                    <img src={karaoke} alt="Genre"/>
                    <p>Genre Manager</p>
                </Link>
                <Link className="admin_page__menu_item" to="/" >
                    <img src={logout} alt="Log Out"/>
                    <p>Log Out</p>
                </Link>
            </div>
        </div>
    );
}