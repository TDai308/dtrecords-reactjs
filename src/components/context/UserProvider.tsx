import React, {createContext, FC, useState} from "react";
import  {useHistory} from 'react-router-dom'
import {UserContextState} from "../types/UserContextState";
import {User} from "../types/User";
import {userApi} from "../../api/userApi";
import {tokenApi} from "../../api/tokenApi";

const contextDefaultValues : UserContextState = {
    user: {
        id: 0,
        name: "",
        userName: "",
        phoneNumber: "",
        email: "",
        address: "",
        roles: []
    },
    logOut: () => {},
    loadUserInformation: () => {},
    isLogged: false,
    setIsLogged: () => {},
    refreshToken: () => {}
};

export const UserContext = createContext<UserContextState>(contextDefaultValues);

const UserProvider: FC = ({children}) => {
    const [user, setUser] = useState<User>(contextDefaultValues.user);
    const history = useHistory();
    const [isLogged, setIsLogged] = useState(localStorage.getItem("access_token")!=null);

    const logOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsLogged(false);
        history.push("/");
    }

    const refreshToken = async () => {
        try {
            const fetchAccessToken = await tokenApi.refreshToken();
            localStorage.setItem("access_token",fetchAccessToken.data.access_token);
            console.log("Refreshed token, new access token was created");
            await loadUserInformation();
        } catch (error) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setIsLogged(false);
            setUser(contextDefaultValues.user);
            console.log('error', error);
            console.log('Token expired');
            alert("Phiên đăng nhập đã hết, bạn hãy đăng nhập lại!!!");
        }
    }

    const loadUserInformation = async () => {
        try {
            const fetchUser = await userApi.getUserWithToken();
            setUser(fetchUser.data);
        } catch (error) {
            await refreshToken();
            console.log('error', error);
            console.log('refreshing access token');
        }
    }

    return (
        <UserContext.Provider value={
            {
                user,
                logOut,
                loadUserInformation,
                isLogged,
                setIsLogged,
                refreshToken
            }
        }>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

