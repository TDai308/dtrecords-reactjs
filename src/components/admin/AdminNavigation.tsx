import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserProvider";

export default function AdminNavigation() {
    const {logOut} = useContext(UserContext);
    return (
        <div className="admin_page__menu__manager__navigation">
            <div className="admin_page__menu__manager__menu">
                <Link className="button__blue__with-a" to="/admin/vinyl">Quản lý sản phẩm</Link>
                <Link className="button__blue__with-a" to="/admin/track">Quản lý bài hát</Link>
                <Link className="button__blue__with-a" to="/admin/artist">Danh sách nghệ sĩ</Link>
                <Link className="button__blue__with-a" to="/admin/order">Quản lý đơn hàng</Link>
                <Link className="button__blue__with-a" to="/admin/customer">Quản lý khách hàng</Link>
            </div>
            <div className="admin_page__menu__manager__logout">
                <button className="button__red__with-a" onClick={logOut}>Đăng xuất</button>
            </div>
        </div>
    );
}