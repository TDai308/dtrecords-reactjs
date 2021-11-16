import React from "react";
import {Artist} from "../../../type/Artist";
import {Link} from "react-router-dom";

interface banner {
    artists: Artist[]
}

const Banner:React.FC<banner> = ({artists}) => {

    const renderArtistList = ():JSX.Element[] => {
        return artists.map((artist, index) => {
            return (
                <div className="container__content_artist-infor">
                    <div className="album__artist_img_name">
                        <img src={`http://localhost:8080/images/artistImage/${artist.nameArtist}.png`} alt={artist.nameArtist} className="album__artist_img"/>
                        <Link to="" className="album__artist_name">{artist.nameArtist}</Link>
                    </div>
                    <div className="album__artist_find">
                        <Link to="" className="container__content_artist__link">Tìm kiếm</Link>
                    </div>
                </div>
            );
        })
    }

    const renderContentArtist = () => {
      return (
          <div className="container__content_artist">
              <h2 className="container__content_artist-title">Nghệ sỹ</h2>
              {
                  renderArtistList()
              }
          </div>
      );
    }

    return (
        <div className="container__content_artist_ad">
            {
                renderContentArtist()
            }
            {/*<div className="container__content_ad">*/}
            {/*    <img id="container__content_ad--thumbnails" className="container__content_ad--thumbnails"*/}
            {/*         src="../static/img/thumbnails/0.jpg" alt="thumbnails">*/}
            {/*</div>*/}
        </div>
    );
};

export default Banner;