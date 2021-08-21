import React, {useEffect, useState} from "react";
import  {useHistory} from 'react-router-dom'


export default function SuccessfulLogging() {
    const [user, setUser] = useState({
        userName: ""
    });
    const history = useHistory();

    const logOut = () => {
        localStorage.removeItem("access_token");
        history.push("/");
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
                setUser(result);
            })
            .catch(error => {
                console.log('error', error);
                logOut();
            });
    }

    useEffect(() => {
       loadUserInformation();
    }, []);

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