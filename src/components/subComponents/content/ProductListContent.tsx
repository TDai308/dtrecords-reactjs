import React, {useEffect} from "react";
import SearchInput from "../SearchInput";
import Category from "./ProductListContent/Category";
import ProductList from "./ProductListContent/ProductList";

const ProductListContent = () => {
    useEffect(() => {
       document.title = "Đĩa Than Ngọt Ngào";
    }, []);

    return (
        <div className={"row sm-gutter"}>
            <div className={"col l-3"}>
                <Category/>
            </div>
            <div className={"col l-9 sm-gutter"}>
                <ProductList/>
            </div>
        </div>
    );
}

export default ProductListContent;