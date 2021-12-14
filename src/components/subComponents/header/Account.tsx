import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../../context/UserProvider";

export default function Account() {
    const {user, logOut} = useContext(UserContext);

    let roleArray = user.roles.map(function (role) {
        return role.roleName;
    })

    return (
        <div className="header__account">
            <Link to="/" className="header__account__link">
                <i className="fas fa-user-circle"/>
            </Link>
            <ul className="header__account__category">
                <li className="header__account__category-list">
                    <p className="header__account__title">Đăng nhập với tư cách:</p>
                    <p className="header__account__name">{user.email}</p>
                </li>
                {
                    roleArray.indexOf("ROLE_ADMIN") !== -1 &&
                        <li className="header__account__category-list">
                            <Link to="/admin">Admin</Link>
                        </li>
                }
                <li className="header__account__category-list">
                    <Link to="/showEditForm">Chỉnh sửa hồ sơ</Link>
                </li>
                <li className="header__account__category-list">
                    <Link to="/">Lịch sử mua hàng</Link>
                </li>
                <li className="header__account__category-list">
                    <p onClick={logOut}>Đăng xuất</p>
                </li>
            </ul>
        </div>
    );
}