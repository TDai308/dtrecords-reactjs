import React from "react";
import {Artist} from "../../../type/Artist";
import ContentArtist from "./ContentArtist";
import AlbumBanner from "./AlbumBanner";

interface banner {
    artists: Artist[]
}

const Banner:React.FC<banner> = ({artists}) => {
    const srcImages:string[] = [
        "https://dtrecords-api.herokuapp.com/images/thumbnails/0.jpg",
        "https://dtrecords-api.herokuapp.com/images/thumbnails/1.jpg",
        "https://dtrecords-api.herokuapp.com/images/thumbnails/2.jpg",
        "https://dtrecords-api.herokuapp.com/images/thumbnails/3.jpg",
        "https://dtrecords-api.herokuapp.com/images/thumbnails/4.jpg"
    ];

    return (
        <div className="container__content_artist_ad">
            <ContentArtist artists={artists}/>
            <AlbumBanner srcImages={srcImages}/>
        </div>
    );
};

export default Banner;