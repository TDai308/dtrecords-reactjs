import React, {useEffect, useState} from "react";
import  {Redirect} from 'react-router-dom'


export default function SuccessfulLogging() {
    const [user, setUser] = useState({});

    const loggOut = () => {
        localStorage.removeItem("access_token");
        return <Redirect to="/"/>
    };
    
    function loadUserInformation() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+ localStorage.getItem("access_token"));

        const requestOptions : RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/user", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } throw new Error(response.status.toString());
            })
            .then(result => {
                console.log(result);
                setUser(result);
            })
            .catch(error => {
                console.log('error', error);
                loggOut();
            });
    }

    useEffect(() => {
       loadUserInformation();
    });

    const homePage = () => {
        return <Redirect to="/"/>
    };

    return (
        <div className="sign_up__form">
            <h1 className="sign_up__header">Hãng Đĩa Trọng Đại</h1>
            <div className="sign_up__note">
                <p>Bạn đã đăng nhập với tài khoản</p>
                <p>Bạn muốn đăng xuất khỏi tài khoản này hay trờ về trang chủ???</p>
            </div>
            <button className="button_Login_Signup" onClick={loggOut}>Đăng Xuất</button>
            <span className="margin-10px">Hoặc</span>
            <button type="button" className="button_Login_Signup" onClick={homePage}>Trở Về Trang Chủ
            </button>
        </div>
    );
}