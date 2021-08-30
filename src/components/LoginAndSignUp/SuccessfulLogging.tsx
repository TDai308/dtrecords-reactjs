import React, {useContext} from "react";
import  {useHistory} from 'react-router-dom'
import {UserContext} from "../context/UserProvider";

export default function SuccessfulLogging() {
    const {user, logOut} = useContext(UserContext);

    const history = useHistory();

    const homePage = () => {
        history.push("/");
    };

    return (
        <div className="sign_up__form">
            <h1 className="sign_up__header">Hãng Đĩa Trọng Đại</h1>
            <div className="sign_up__note">
                <p>Bạn đã đăng nhập với tài khoản {user.userName}</p>
                <p>Bạn muốn đăng xuất khỏi tài khoản này hay trờ về trang chủ???</p>
            </div>
            <button className="button_Login_Signup" onClick={logOut}>Đăng Xuất</button>
            <span className="margin-10px">Hoặc</span>
            <button type="button" className="button_Login_Signup" onClick={homePage}>Trở Về Trang Chủ
            </button>
        </div>
    );
}