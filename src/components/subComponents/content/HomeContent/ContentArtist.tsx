import React from "react";
import {Artist} from "../../../type/Artist";
import $ from "jquery";
import {Link} from "react-router-dom";

interface contentArtist {
    artists: Artist[]
}

const ContentArtist:React.FC<contentArtist> = ({artists}) => {
    const handleMouseEnter = (index: number) => {
        $(`#artist${index}`).css({
            "color":"var(--pink-color)",
            "textDecoration": "underline 1px solid"
        })
    };

    const handleMouseLeave = (index:number) => {
        $(`#artist${index}`).css({
            "color":"var(--black-color)",
            "textDecoration": "none"
        })
    }

    const renderArtistList = ():JSX.Element[] => {
        return artists.map((artist, index) => {
            return (
                <div className="container__content_artist-infor" key={index}>
                    <div className="album__artist_img_name">
                        <img src={`https://dtrecords-api.herokuapp.com/images/artistImage/${artist.nameArtist}.png`} alt={artist.nameArtist} className="album__artist_img"/>
                        <Link id={`artist${index}`} to="" className="album__artist_name" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>{artist.nameArtist}</Link>
                    </div>
                    <div className="album__artist_find">
                        <Link id={`artistSearch${index}`} to="" className="container__content_artist__link" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>Tìm kiếm</Link>
                    </div>
                </div>
            );
        })
    };

    return (
        <div className="container__content_artist">
            <h2 className="container__content_artist-title">Nghệ sỹ</h2>
            {
                renderArtistList()
            }
        </div>
    );
}

export default ContentArtist;