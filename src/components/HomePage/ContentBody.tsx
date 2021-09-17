import React from "react";
import {Route, Switch} from "react-router-dom";

import HomeContent from "../subComponents/content/HomeContent";
import ProductListContent from "../subComponents/content/ProductListContent";

const ContentBody = () => {
    return(
        <Switch>
            <Route path="/" exact component={HomeContent}/>
            <Route path="/products" exact component={ProductListContent}/>
        </Switch>
    );
}

export default ContentBody;