import React, {useContext, useEffect, useState} from 'react';
import SuccessfulLogging from "./SuccessfulLogging";
import  {useHistory} from 'react-router-dom'
import {tokenApi} from "../../api/tokenApi";
import {UserContext} from "../context/UserProvider";

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const logged = localStorage.getItem("access_token") != null;
    const history = useHistory();
    const {setIsLogged} = useContext(UserContext);

    useEffect(() => {
        if (email.charAt(email.length - 1) === ' ') {
            const emailWithSpace = email;
            setEmail(emailWithSpace.substring(0, emailWithSpace.length-1));
        }
    }, [email]);

    const setParameter = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "email") {
            setEmail(event.target.value);
        } else setPassword(event.target.value);
    };

    const handleSignUp = () => {
        window.location.href = "/signup";
    };

    useEffect(() => {
        document.title = "Login";
    }, []);

    const login = async () => {
        try {
            const response = await tokenApi.logIn(email,password);
            localStorage.setItem("access_token",response.data.access_token);
            localStorage.setItem("refresh_token",response.data.refresh_token);
            setIsLogged(true);
            history.push("/");
        } catch (error) {
            console.log(error);
            setError("Email hoặc mật khẩu của bạn đã bị sai!!!");
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return(
        <div className="background-signup-loggin">
            <div className="oval">
                {
                    logged ?
                        <SuccessfulLogging/> :
                        <form className="sign_up__form" onSubmit={handleSubmit}>
                            <h1 className="sign_up__header">Hãng Đĩa Trọng Đại</h1>
                            <h2>Chào Mừng Quay Trở Lại.</h2>
                            <p className="log-in__title">Đăng nhập để tận hưởng những dịch vụ tốt</p>
                            <label className="has-float-label">
                                <input className="sign_up__input" name="email" required type="text"
                                       onChange={setParameter}/>
                                <span>Email *</span>
                            </label>

                            <label className="has-float-label">
                                <input className="sign_up__input" name="password" required type="password"
                                       onChange={setParameter}/>
                                <span>Mật Khẩu *</span>
                            </label>
                            {
                                error.length > 0 &&
                                <div>
                                    <p className="login-error">{error}</p>
                                </div>
                            }
                            <button className="button_Login_Signup" onClick={login} type="submit">Đăng Nhập</button>
                            <span className="margin-10px">Hoặc</span>
                            <button type="button" className="button_Login_Signup" onClick={handleSignUp}>Đăng Ký
                            </button>
                        </form>
                }
            </div>
        </div>
    );
}