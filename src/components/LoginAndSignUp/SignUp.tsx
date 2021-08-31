import React, {useState} from "react";
import {UserForSignUp} from "../types/UserForSignUp";
import {userApi} from "../../api/userApi";
import {useHistory} from "react-router-dom";
import ReactPhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'

export default function SignUp() {
    const [newUser,setNewUser] = useState<UserForSignUp>({
        name: "",
        password: "",
        userName: "",
        phoneNumber: "",
        email: "",
        address: ""
    });

    const [emailError, setEmailError] = useState("");

    const history = useHistory();

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser,[event.currentTarget.name]: event.target.value});
    };

    const handleChangePhoneNumber = (value:string) => {
        setNewUser({...newUser,phoneNumber: value});
    }

    const goToLogIn = () => {
        window.location.href = "/login";
    };

    const signUp = async () => {
        try {
            const fetchSignUp = await userApi.signUp(newUser);
            console.log(fetchSignUp);
            history.push("/login");
        } catch (error) {
            setEmailError("(Email đã được sử dụng hãy sử dụng email khác)");
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className="background-signup-loggin">
            <div className="oval">
                <form className="sign_up__form" onSubmit={handleSubmit}>
                    <h1 className="sign_up__header">Hãng Đĩa Trọng Đại</h1>
                    <h2>Tạo tài khoản.</h2>
                    <div className="has-float-label">
                        <input className="sign_up__input" name="userName" required type="text" onChange={handleChange}/>
                        <span>Tên Tài Khoản</span>
                    </div>

                    <div className="has-float-label">
                        <input className="sign_up__input" name="password" required type="password" onChange={handleChange}/>
                        <span>Mật Khẩu</span>
                    </div>

                    <div className="width_100 display_flex margin-20px-top" >
                        <div className="has-float-label width_45 margin-0px" style={{flex: "unset"}}>
                            <input className="sign_up__input" name="name" required type="text" onChange={handleChange}/>
                            <span>Họ Tên</span>
                        </div>

                        <div className="has-float-label width_45 margin-0px" style={{flex: "unset"}}>
                            <ReactPhoneInput containerClass="sign_up__input"
                                             containerStyle={{
                                                 // paddingLeft: 0
                                             }}
                                             inputStyle={{
                                                 fontSize: "1rem",
                                                 border: "none"
                                             }}
                                             buttonStyle={{
                                                 background: "none",
                                                 border: "none",
                                                 fontSize: "1rem"
                                             }}
                                             inputProps={{
                                                 name: "phoneNumber",
                                                 required: true
                                             }}
                                             placeholder={""}
                                             country={"vn"}
                                             value={newUser.phoneNumber}
                                             onChange={handleChangePhoneNumber}/>
                                <span style={{
                                    transform: "translateX(10px) translateY(-24px)"
                                }}>Số Điện Thoại</span>
                        </div>
                    </div>

                    <div className="has-float-label">
                        <input className="sign_up__input" name="email" required type="email" onChange={handleChange}/>
                            <span>Email
                                {
                                emailError.length !== 0 &&
                                    <p className="message_Email_Error">{emailError}</p>
                                }
                            </span>
                    </div>

                    <div className="has-float-label">
                        <input className="sign_up__input" name="address" required type="text" onChange={handleChange}/>
                            <span>Địa Chỉ</span>
                    </div>

                    <button className="button_Login_Signup" onClick={signUp} type="submit">Đăng Ký</button>
                    <span className="margin-10px">Hoặc</span>
                    <button type="button" className="button_Login_Signup" onClick={goToLogIn}>Đăng Nhập</button>
                </form>
            </div>
        </div>
);
}