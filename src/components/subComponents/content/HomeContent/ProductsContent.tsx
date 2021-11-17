import React from "react";
import {Vinyl} from "../../../type/Vinyl";
import {Genre} from "../../../type/Genre";
import ProductsContentRow from "../productsContentRow";
import {Link} from "react-router-dom";
import GenresItem from "./GenresItem";

interface productsContent {
    productContents: {
        productTitle:string,vinyls:Vinyl[]
    }[],
    genres: Genre[]
}

const ProductsContent: React.FC<productsContent> = ({productContents, genres}) => {
    const renderProductContentRows = (): JSX.Element[] => {
        return productContents.map((productContent, index) => {
            return (
                <ProductsContentRow key={index} productTitle={productContent.productTitle} vinyls={productContent.vinyls} index={index}/>
            );
        })
    };

    const renderGenresList = (): JSX.Element[] => {
        return genres.map((genre,index) => {
            return (
                <div className="col l-4" key={index}>
                    <GenresItem genre={genre}/>
                </div>
            );
        })
    };

    const renderGenresContent = ():JSX.Element => {
        return (
            <div className="container__content_product--genres">
                <div className="container__content_product--selling__title-link">
                    <h3 className="container__content_product--selling__title">Thể loại</h3>
                </div>
                <div className="grid__row">
                    <div className="col l-4">
                        <Link className="genres_box" to="/products">
                            <div className="genres_box__image_genres">
                                <img src={"http://localhost:8080/images/genres/AllGenre.jpg"} alt="genre" className="genres_box__img"/>
                            </div>
                            <p className="genres_box__title">All</p>
                        </Link>
                    </div>
                    {
                        renderGenresList()
                    }
                </div>
            </div>
        );
    };


    return (
        <div className={"container__content_product"}>
            {
                renderProductContentRows()
            }
            {
                renderGenresContent()
            }
        </div>
    );
}

export default ProductsContent;