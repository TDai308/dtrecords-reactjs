import React, {useEffect, useState} from "react";
import SuccessfulLogging from "./SuccessfulLogging";
import  {useHistory} from 'react-router-dom'

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const logged = localStorage.getItem("access_token") != null;
    const history = useHistory();

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

    const login = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);

        const requestOptions : RequestInit= {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/login", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } throw Error(response.status.toString())
            })
            .then(result => {
                localStorage.setItem("access_token",result.access_token);
                history.push("/");
            })
            .catch(error => {
                console.log(error);
                setError("Username or password are wrong!!!");
            });
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