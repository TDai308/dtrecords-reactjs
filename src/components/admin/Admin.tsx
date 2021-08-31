import React, {useContext} from "react";
import {UserContext} from "../context/UserProvider";
import AdminPage from "./AdminPage";
import ErrorPage from "../ErrorPage";

export default function Admin() {
    const {user,isLogged} = useContext(UserContext);

    let adminPage;
    if (isLogged) {
        user.roles.forEach(role => {
            if (role.roleName === "ROLE_ADMIN") {
                adminPage = <AdminPage/>;
            } else adminPage = <ErrorPage/>;
        })
    } else adminPage = <ErrorPage/>;

    return (
        <div>
            {adminPage}
        </div>
    );
}