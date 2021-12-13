import React, {useContext, useEffect} from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import homePage from "./MainPage/homePage";
import LogIn from "./LoginAndSignUp/LogIn";
import SignUp from "./LoginAndSignUp/SignUp";
import ProceedToCheckOut from "./ProceedToCheckout/ProceedToCheckOut";
import {UserContext} from "./context/UserProvider";
import Admin from "./admin/Admin";

export default function DTrecords() {
    const {isLogged,loadUserInformation} = useContext(UserContext);

    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])

    useEffect(() => {
        if (isLogged) {
            loadUserInformation();
        }
    }, [isLogged]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Switch>
            <Route path="/login" exact component={LogIn}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/ProceedToCheckout" component={ProceedToCheckOut}/>
            <Route path="/" component={homePage}/>
        </Switch>
    );
}