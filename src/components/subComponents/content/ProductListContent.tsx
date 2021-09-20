import React, {useEffect} from "react";
import SearchInput from "../SearchInput";
import Category from "./ProductListContent/Category";
import ProductList from "./ProductListContent/ProductList";

const ProductListContent = () => {
    useEffect(() => {
       document.title = "Đĩa Than Ngọt Ngào";
    }, []);

    return(
        <div className="container">
            <div className={"grid wide"}>
                <h1 className="container__header">
                    Thiên đường âm nhạc dành cho bạn, nơi kết nối bạn với những nghệ sỹ và ban nhạc trên toàn thế giới!!!
                </h1>
                <SearchInput/>
                <div className={"row sm-gutter"}>
                    <div className={"col l-3"}>
                        <Category/>
                    </div>
                    <div className={"col l-9 sm-gutter"}>
                        <ProductList/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductListContent;