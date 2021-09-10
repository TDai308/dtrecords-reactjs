import React from "react";
import {Route} from "react-router-dom";
import AdminMenu from "./AdminMenu";
import AdminVinyl from "./AdminVinyl";

export default function AdminPage() {
    return (
        <div className="background-signup-loggin">
            <div className="oval" style={{
                zIndex: -1
            }}>
            </div>
            <Route path="/admin" exact component={AdminMenu}/>
            <Route path="/admin/vinyl" component={AdminVinyl}/>
        </div>
    );
}