import React from "react";
import {Route, Switch} from "react-router-dom";
import AdminArtistList from "./AdminArtistList";

export default function AdminArtist() {
    return (
        <Switch>
            <Route path="/admin/artist" exact component={AdminArtistList}/>
            {/*<Route path="/admin/vinyl/edit/:id" exact component={AdminEditArtist}/>*/}
        </Switch>
    );
}