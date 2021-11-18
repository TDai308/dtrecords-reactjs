import React, {useEffect} from "react";
import Category from "./ProductListContent/Category";
import ProductList from "./ProductListContent/ProductList";
import AlbumBanner from "./HomeContent/AlbumBanner";

const ProductListContent = () => {
    const srcImages:string[] = [
        "http://localhost:8080/images/thumbnails/5.jpg",
        "http://localhost:8080/images/thumbnails/6.jpg",
        "http://localhost:8080/images/thumbnails/7.jpg",
        "http://localhost:8080/images/thumbnails/8.jpg",
        "http://localhost:8080/images/thumbnails/9.jpg"
    ];

    useEffect(() => {
       document.title = "Đĩa Than Ngọt Ngào";
    }, []);

    return (
        <div className={"row sm-gutter"}>
            <div className={"col l-3"}>
                <Category/>
                <AlbumBanner srcImages={srcImages}/>
            </div>
            <div className={"col l-9 sm-gutter"}>
                <ProductList/>
            </div>
        </div>
    );
}

export default ProductListContent;