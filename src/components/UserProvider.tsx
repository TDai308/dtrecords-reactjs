import React, {createContext, FC, useState} from "react";
import  {useHistory} from 'react-router-dom'
import {UserContextState} from "./types/UserContextState";
import {User} from "./types/User";

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
    loadUserInformation: () => {}
};

export const UserContext = createContext<UserContextState>(contextDefaultValues);

const UserProvider: FC = ({children}) => {
    const [user, setUser] = useState<User>(contextDefaultValues.user);
    const history = useHistory();

    const logOut = () => {
        localStorage.removeItem("access_token");
        history.push("/");
    }

    const loadUserInformation = () => {
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

    return (
        <UserContext.Provider value={
            {
                user,
                logOut,
                loadUserInformation
            }
        }>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

