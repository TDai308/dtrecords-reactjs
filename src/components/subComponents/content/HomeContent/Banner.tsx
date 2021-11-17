import React from "react";
import {Artist} from "../../../type/Artist";
import ContentArtist from "./ContentArtist";

interface banner {
    artists: Artist[]
}

const Banner:React.FC<banner> = ({artists}) => {

    return (
        <div className="container__content_artist_ad">
            <ContentArtist artists={artists}/>
            {/*<div className="container__content_ad">*/}
            {/*    <img id="container__content_ad--thumbnails" className="container__content_ad--thumbnails"*/}
            {/*         src="../static/img/thumbnails/0.jpg" alt="thumbnails">*/}
            {/*</div>*/}
        </div>
    );
};

export default Banner;