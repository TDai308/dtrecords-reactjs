import React, {useState} from "react";
import {UserForSigningUp} from "../type/User";
import {userApi} from "../../api/userApi";
import {useHistory} from "react-router-dom";
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import {Link} from "react-router-dom";

export default function SignUp() {
    const [newUser,setNewUser] = useState<UserForSigningUp>({
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

    const UrlDefault = process.env["REACT_APP_URL"];

    const logoSrc = `${UrlDefault}images/logos/logo-black.png`;

    return (
        <div className="background-signup-loggin">
            <div className="oval">
                <form className="sign_up__form" onSubmit={handleSubmit}>
                    <img src={logoSrc} alt="DTRecords" style={{width: "240px"}}/>
                    <h2>Tạo tài khoản.</h2>
                    <div className="has-float-label">
                        <input className="sign_up__input" name="userName" required type="text" onChange={handleChange}/>
                        <span>Tên Tài Khoản</span>
                    </div>

                    <div className="has-float-label">
                        <input className="sign_up__input" name="password" required type="password" onChange={handleChange}/>
                        <span>Mật Khẩu</span>
                    </div>

                    <div className="width_100 display_flex--space-between margin-20px-top name_phoneNumber_input">
                        <div className="has-float-label width_45 margin-0px" style={{flex: "unset"}}>
                            <input className="sign_up__input" name="name" required type="text" onChange={handleChange}/>
                            <span>Họ Tên</span>
                        </div>

                        <div className="has-float-label width_45 margin-0px" style={{flex: "unset"}}>
                            <ReactPhoneInput containerClass="sign_up__input"
                                             inputStyle={{
                                                 fontSize: "1rem",
                                                 border: "none",
                                                 width: "100%"
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
                    <span className="margin-20px-top">
                        Nếu bạn đã có tài khoản! <Link style={{
                        color:"var(--cyan-color)"
                    }} to={"/login"}> Đăng nhập</Link>
                    </span>
                </form>
            </div>
        </div>
);
}