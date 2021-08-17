import React from "react";
import {Route} from "react-router-dom";

import HomeContent from "../sub-components/content/HomeContent";
import ProductListContent from "../sub-components/content/ProductListContent";

const ContentBody = () => {
    return(
        <div>
            <Route path="/" exact component={HomeContent}/>
            <Route path="/all-vinyl-product" exact component={ProductListContent}/>
        </div>
    );
}

export default ContentBody;