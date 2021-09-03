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
                <Route path="/admin" exact component={AdminMenu}/>
            </div>
            <Route path="/admin/vinyl" exact component={AdminVinyl}/>
        </div>
    );
}