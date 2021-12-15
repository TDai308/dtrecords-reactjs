import React, {useEffect} from "react";
import Category from "./ProductListContent/Category";
import ProductList from "./ProductListContent/ProductList";
import AlbumBanner from "./HomeContent/AlbumBanner";

const ProductListContent = () => {
    const srcImages:string[] = [
        "images/thumbnails/5.jpg",
        "images/thumbnails/6.jpg",
        "images/thumbnails/7.jpg",
        "images/thumbnails/8.jpg",
        "images/thumbnails/9.jpg"
    ];

    useEffect(() => {
       document.title = "Đĩa Than Ngọt Ngào";
    }, []);

    return (
        <div className={"row sm-gutter"}>
            <div className={"col l-3 m-0 c-0"}>
                <Category/>
                <AlbumBanner srcImages={srcImages}/>
            </div>
            <div className={"col l-9 m-12 c-12"}>
                <ProductList/>
            </div>
        </div>
    );
}

export default ProductListContent;