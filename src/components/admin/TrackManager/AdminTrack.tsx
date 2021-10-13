import React from "react";
import {Route, Switch} from "react-router-dom";
import AdminTrackList from "./AdminTrackList";
import AdminCreateTrack from "./AdminCreateTrack";
import AdminEditTrack from "./AdminEditTrack";

export default function AdminTrack() {
    return (
        <Switch>
            <Route path="/admin/track" exact component={AdminTrackList}/>
            <Route path="/admin/track/create" exact component={AdminCreateTrack}/>
            <Route path="/admin/track/edit/:id" exact component={AdminEditTrack}/>
        </Switch>
    );
}