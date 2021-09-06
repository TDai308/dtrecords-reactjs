import React from "react";
import {Route, Switch} from "react-router-dom";
import AdminVinylList from "./AdminVinylList";
import AdminCreateVinyl from "./AdminCreateVinyl";

export default function AdminVinyl() {
    return (
        <Switch>
            <Route path="/admin/vinyl" exact component={AdminVinylList}/>
            <Route path="/admin/vinyl/createVinyl" exact component={AdminCreateVinyl}/>
        </Switch>
    );
}