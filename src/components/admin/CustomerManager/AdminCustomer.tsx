import React from "react";
import {Switch, Route} from "react-router-dom";
import AdminCustomerList from "./AdminCustomerList";

export default function AdminCustomer() {
    return (
        <Switch>
            <Route path={"/admin/customer"} exact component={AdminCustomerList}/>
        </Switch>
    );
}