import React from "react";
import {Vinyl} from "../../../type/Vinyl";
import {Genre} from "../../../type/Genre";
import ProductsContentRow from "../productsContentRow";
import {Link} from "react-router-dom";
import GenresItem from "./GenresItem";
import ContentArtist from "./ContentArtist";
import {Artist} from "../../../type/Artist";

interface productsContent {
    productContents: {
        productTitle:string,
        vinyls:Vinyl[]
    }[],
    genres: Genre[],
    artists: Artist[]
}

const ProductsContent: React.FC<productsContent> = ({productContents, genres,artists}) => {

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
                <div className="col l-4 m-4 c-6" key={index}>
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
                <div className="row sm-gutter">
                    <div className="col l-4 m-4 c-6" id={"all-genres"}>
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

    const renderArtistList = ():JSX.Element[] => {
        return artists.map((artist, index) => {
            return (
                <div className="container__content_artist-infor" key={index}>
                    <div className="album__artist_img_name">
                        <img src={`http://localhost:8080/images/artistImage/${artist.nameArtist}.png`} alt={artist.nameArtist} className="album__artist_img"/>
                        <Link to="/" className="album__artist_name">{artist.nameArtist}</Link>
                    </div>
                    <div className="album__artist_find">
                        <Link to="" className="container__content_artist__link">Tìm kiếm</Link>
                    </div>
                </div>
            );
        })
    };

    return (
        <div className={"container__content_product"}>
            {
                renderProductContentRows()
            }
            <div className="container__content_artist__Mobile_tablet">
                <h2 className="container__content_artist-title">Nghệ sỹ</h2>
                {
                    renderArtistList()
                }
            </div>
            {
                renderGenresContent()
            }
        </div>
    );
}

export default ProductsContent;