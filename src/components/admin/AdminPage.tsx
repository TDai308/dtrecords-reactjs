import React from "react";
import {Route} from "react-router-dom";
import AdminMenu from "./AdminMenu";

export default function AdminPage() {
    return (
        <div className="background-signup-loggin">
            <div className="oval">
                <Route path="/admin" exact component={AdminMenu}/>
            </div>
        </div>
    );
}