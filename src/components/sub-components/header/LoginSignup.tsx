import React from "react";
import {Link} from "react-router-dom";

export default function LoginSignup() {
    return (
        <div className="header__login-signup">
            <Link to="/signup" className="button__balck__with-a">
                Đăng Ký
            </Link>
            <Link to="/login" className="button__blue__with-a">
                Đăng Nhập
            </Link>
        </div>
    );
}