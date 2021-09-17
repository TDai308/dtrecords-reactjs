import React, {useContext, useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import homePage from "./HomePage/homePage";
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
        <Switch>
            <Route path="/login" exact component={LogIn}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/" component={homePage}/>
        </Switch>
    );
}