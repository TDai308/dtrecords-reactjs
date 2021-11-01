import React from "react";
import {Route, Switch} from "react-router-dom";

import HomeContent from "../subComponents/content/HomeContent";
import ProductListContent from "../subComponents/content/ProductListContent";
import ProductDetailContent from "../subComponents/content/ProductDetailContent";
import SearchInput from "../subComponents/SearchInput";
import Cart from "../subComponents/content/Cart";

const ContentBody = () => {
    return(
        <div className="container">
            <div className="grid wide">
                <h1 className="container__header">
                    Thiên đường âm nhạc dành cho bạn, nơi kết nối bạn với những nghệ sỹ và ban nhạc trên toàn thế giới!!!
                </h1>
                <SearchInput/>
                <Switch>
                    <Route path="/" exact component={HomeContent}/>
                    <Route path="/products" exact component={ProductListContent}/>
                    <Route path="/cart" exact component={Cart}/>
                    <Route path="/products/:productsOption" exact component={ProductListContent}/>
                    <Route path="/product/:id" exact component={ProductDetailContent}/>
                </Switch>
            </div>
        </div>
    );
}

export default ContentBody;