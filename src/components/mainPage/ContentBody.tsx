import React from "react";
import {Route} from "react-router-dom";

import HomeContent from "../subComponents/content/HomeContent";
import ProductListContent from "../subComponents/content/ProductListContent";

const ContentBody = () => {
    return(
        <div>
            <Route path="/" exact component={HomeContent}/>
            <Route path="/all-vinyl-product" exact component={ProductListContent}/>
        </div>
    );
}

export default ContentBody;