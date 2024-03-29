import React from "react";
import {Vinyl} from "../../type/Vinyl";
import {Link} from "react-router-dom";
import ProductItem from "./ProductItem";
import $ from "jquery";

interface ProductsContentRowInterface {
    productTitle: string,
    vinyls: Vinyl[],
    index: number
}

const ProductsContentRow:React.FC<ProductsContentRowInterface> = ({productTitle, vinyls, index}) => {

    const renderProductListRow = ():JSX.Element[] => {
        return vinyls.map((vinyl,index) => {
            return (
                <div className={"col l-3 m-4 c-6"} id={"vinyl_item"} key={index}>
                    <ProductItem vinyl={vinyl}/>
                </div>
            );
        })
    };

    const scrollLeft = (key:number) => {
        let scrollBar = $(`#scrollBar${key}`);
        scrollBar.animate({
            scrollLeft: scrollBar.scrollLeft()! - $("#vinyl_item").outerWidth()!
        }, 100)
    };

    // có thể sử dụng next và prev để cuộn scrollBar đến vị trí của 1 vinyl_item chỉ định nhưng gặp lỗi

    const scrollRight = (key:number) => {
        let scrollBar = $(`#scrollBar${key}`);
        scrollBar.animate({
            scrollLeft: scrollBar.scrollLeft()! + $("#vinyl_item").outerWidth()!
        }, 100)
    };

    return (
        <div className="container__content_product--selling">
            <div className="container__content_product--selling__title-link">
                <h3 className="container__content_product--selling__title">{productTitle}</h3>
                <Link className="container__content_product--selling__link" to="/products">Shop All</Link>
            </div>
            <div id={`scrollBar${index}`} className="row sm-gutter no-wrap container__content_product--selling-list">
                {
                    renderProductListRow()
                }
            </div>
            {
                vinyls.length > 4 &&
                    <div className="container__content_product--selling-list__scrollbar">
                        <button className="product--selling-list--scroll_btn-left" onClick={() => scrollLeft(index)}>
                            <i className="fas fa-chevron-left"/>
                        </button>
                        <button className="product--selling-list--scroll_btn-right" onClick={() => scrollRight(index)}>
                            <i className="fas fa-chevron-right"/>
                        </button>
                    </div>
            }
        </div>
);
}

export default ProductsContentRow;