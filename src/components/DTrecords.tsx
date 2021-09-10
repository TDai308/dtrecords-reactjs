import React, {useContext, useEffect} from "react";
import {Route} from "react-router-dom";
import mainPage from "./mainPage/mainPage";
import LogIn from "./LoginAndSignUp/LogIn";
import SignUp from "./LoginAndSignUp/SignUp";
import {UserContext} from "./context/UserProvider";
import Admin from "./admin/Admin";

export default function DTrecords() {
    const {isLogged,loadUserInformation} = useContext(UserContext);

    useEffect(() => {
        if (isLogged) {
            loadUserInformation();
        }
    }, [isLogged]);

    return (
        <div>
            <Route path="/" exact component={mainPage}/>
            <Route path="/login" exact component={LogIn}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/admin" component={Admin}/>
        </div>
    );
}