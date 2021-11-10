import React from "react";
import {Route} from "react-router-dom";
import AdminMenu from "./AdminMenu";
import AdminVinyl from "./VinylManager/AdminVinyl";
import AdminTrack from "./TrackManager/AdminTrack";
import AdminArtist from "./ArtistManager/AdminArtist";
import AdminOrder from "./OrderManager/AdminOrder";
import AdminCustomer from "./CustomerManager/AdminCustomer";

export default function AdminPage() {
    return (
        <div className="background-signup-loggin">
            <div className="oval" style={{
                zIndex: -1
            }}>
            </div>
            <Route path="/admin" exact component={AdminMenu}/>
            <Route path="/admin/vinyl" component={AdminVinyl}/>
            <Route path="/admin/track" component={AdminTrack}/>
            <Route path="/admin/artist" component={AdminArtist}/>
            <Route path="/admin/order" component={AdminOrder}/>
            <Route path="/admin/customer" component={AdminCustomer}/>
        </div>
    );
}