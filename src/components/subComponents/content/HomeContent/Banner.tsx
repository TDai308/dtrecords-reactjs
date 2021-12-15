import React from "react";
import {Artist} from "../../../type/Artist";
import ContentArtist from "./ContentArtist";
import AlbumBanner from "./AlbumBanner";

interface banner {
    artists: Artist[]
}

const Banner:React.FC<banner> = ({artists}) => {
    const srcImages:string[] = [
        "images/thumbnails/0.jpg",
        "images/thumbnails/1.jpg",
        "images/thumbnails/2.jpg",
        "images/thumbnails/3.jpg",
        "images/thumbnails/4.jpg"
    ];

    return (
        <div className="container__content_artist_ad">
            <ContentArtist artists={artists}/>
            <AlbumBanner srcImages={srcImages}/>
        </div>
    );
};

export default Banner;