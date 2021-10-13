import React from "react";
import {Route, Switch} from "react-router-dom";
import AdminVinylList from "./AdminVinylList";
import AdminCreateVinyl from "./AdminCreateVinyl";
import AdminEditVinyl from "./AdminEditVinyl";

export default function AdminVinyl() {
    return (
        <Switch>
            <Route path="/admin/vinyl" exact component={AdminVinylList}/>
            <Route path="/admin/vinyl/create" exact component={AdminCreateVinyl}/>
            <Route path="/admin/vinyl/edit/:id" exact component={AdminEditVinyl}/>
        </Switch>
    );
}