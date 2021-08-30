import React, {useContext, useEffect} from "react";
import {Route} from "react-router-dom";
import mainPage from "./main-page/mainPage";
import LogIn from "./LoginAndSignUp/LogIn";
import SignUp from "./LoginAndSignUp/SignUp";
import {UserContext} from "./context/UserProvider";

export default function DTrecords() {
    const {isLogged,loadUserInformation} = useContext(UserContext);

    useEffect(() => {
        if (isLogged) {
            loadUserInformation();
        }
    }, []);

    return (
        <div>
            <Route path="/" exact component={mainPage}/>
            <Route path="/login" exact component={LogIn}/>
            <Route path="/signup" exact component={SignUp}/>
            {/*<Route path="/admin" exact component={}/>*/}
        </div>
    );
}