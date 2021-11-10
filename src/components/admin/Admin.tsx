import React, {useContext} from "react";
import {UserContext} from "../context/UserProvider";
import AdminPage from "./AdminPage";
import ErrorPage from "../ErrorPage";

export default function Admin() {
    const {user,isLogged} = useContext(UserContext);

    let adminPage;
    if (isLogged) {
        user.roles.every(function (role) {
            if (role.roleName === "ROLE_ADMIN") {
                adminPage = <AdminPage/>;
                return false;
            } else {
                adminPage = <ErrorPage/>;
                return true;
            }
        })
    } else adminPage = <ErrorPage/>;

    return (
        <div>
            {adminPage}
        </div>
    );
}