import React from "react";
import {Route, Switch} from "react-router-dom";
import AdminOrderList from "./AdminOrderList";

export default function AdminOrder() {
    return (
        <div>
            <Switch>
                <Route path={"/admin/order"} exact component={AdminOrderList}/>
            </Switch>
        </div>
    );
}