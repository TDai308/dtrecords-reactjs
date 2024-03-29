import React from "react";
import {Genre} from "../../../type/Genre";
import {Link} from "react-router-dom";

interface genresItem {
    genre: Genre
}

const GenresItem:React.FC<genresItem> = ({genre}) => {
    const UrlDefault = process.env["REACT_APP_URL"];

    return (
        <Link className="genres_box" to={`/products/${genre.genreName}Vinyl`}>
            <div className="genres_box__image_genres">
                <img src={`${UrlDefault}images/genres/${genre.genreName}Genre.jpg`} alt="genre" className="genres_box__img"/>
            </div>
            <p className="genres_box__title">{genre.genreName}</p>
        </Link>
    );
}

export default GenresItem;