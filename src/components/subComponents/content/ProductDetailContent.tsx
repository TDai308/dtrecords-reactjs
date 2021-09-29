import React, {useEffect, useState} from "react";
import {Vinyl} from "../../type/Vinyl";
import {VinylForEditingDefault} from "../../type/Vinyl";
import {useParams} from "react-router-dom";
import {vinylApi} from "../../../api/vinylApi";
import {Track} from "../../type/Track";
import $ from "jquery";
import {trackApi} from "../../../api/trackApi";

export default function ProductDetailContent() {
    const [vinyl, setVinyl] = useState<Vinyl>(VinylForEditingDefault);
    const [tracks, setTracks] = useState<Track[]>([]);

    const {id} = useParams<{id:string}>();

    const getTheVinyl = async () => {
        try {
            const fetchVinylData = await vinylApi.getVinyl(parseInt(id));
            setVinyl(fetchVinylData.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    const getTrackList = async () => {
        try {
            const fetchTrackList = await trackApi.getTrackListOfVinyl(vinyl.id);
            setTracks(fetchTrackList.data);
        } catch (error) {
            console.log("error",error);
        }
    }

    useEffect(() => {
        getTheVinyl();
    }, []);

    useEffect(() => {
        getTrackList();
        document.title = `${vinyl.vinylName} - ${vinyl.artist.nameArtist}`;
    }, [vinyl]);

    const sliderImageWidth = $('#album_thumbnail__slider').width();
    $('.slider__image').css({
        'height': sliderImageWidth + 'px'
    });

    const genres: string[] = [];
    vinyl.genres.forEach(genre => {
        genres.push(genre.genreName);
    });

    return (
        <div className="row sm-gutter app-content">
            <div className="col l-6">
                <div className="album_thumbnail__slider" id="album_thumbnail__slider">
                    <input type="radio" name="radio-btn" id="radio1"/>
                    <input type="radio" name="radio-btn" id="radio2"/>
                    <img className="slider__image first" src={`http://localhost:3000/images/vinylImg/${vinyl.vinylName}-${vinyl.artist.nameArtist}/${vinyl.thumbnail1}`} alt={vinyl.vinylName}/>
                    <img className="slider__image" src={`http://localhost:3000/images/vinylImg/${vinyl.vinylName}-${vinyl.artist.nameArtist}/${vinyl.thumbnail2}`} alt={vinyl.vinylName}/>
                    <div className="slider__navigation_auto">
                        <div className="auto-btn1"/>
                        <div className="auto-btn2"/>
                    </div>
                    <div className="slider__navigation_manual">
                        <label htmlFor="radio1" className="manual-btn"/>
                        <label htmlFor="radio2" className="manual-btn"/>
                    </div>
                </div>
            </div>
            <div className="col l-6">
                <div className="album_information">
                    <div className="album__artist">
                        <div className="album__artist_img_name">
                            <img src={`http://localhost:3000/images/artistImg/${vinyl.artist.nameArtist}.png`} alt={vinyl.artist.nameArtist} className="album__artist_img"/>
                            <p className="album__artist_name">{vinyl.artist.nameArtist}</p>
                        </div>
                        <div className="album__like">

                        </div>
                    </div>
                    <div className="album__name_price">
                        <h1 className="album__name">{vinyl.vinylName}</h1>
                        <h2 className="album__nation_genre">{vinyl.nation.nation} - {genres.toString()}</h2>
                        <div className={"produce_price"}>
                            {
                                vinyl.discount === 0 ?
                                    <div>
                                        <span className="produce_price_not_sale">{vinyl.price} $</span>
                                    </div> :
                                    <div>
                                        <span className="produce_sale_price">{vinyl.realPrice} $</span>
                                        <span className="produce_old_price">{vinyl.price} $</span>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="album__tracklist_player">
                        <h2>Danh Sách Các Bài Hát - Preview</h2>
                        <div className="album__tracklist">
                            {
                                tracks.map((track, index) => {
                                    return (
                                        <div className="album__tracklist__player" key={index}>
                                            <div className="album__track_name">
                                                <div>{track.trackName} - {track.artists}</div>
                                            </div>
                                            <div className="album__track_play_pause">
                                                {/*th:onclick="|play(${track.trackID},event)|"*/}
                                                <i  className="fas fa-play-circle"/>
                                                {/*th:onclick="|pause(${track.trackID},event)|"*/}
                                                <i className="fas fa-pause-circle" style={{
                                                    display: "none"
                                                }}/>
                                            </div>
                                            <audio className="audio" id={(track.id).toString()}/>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <form className="album__buy_button">
                        <input className="album__quantity" type="number" name="quantity" defaultValue={vinyl.quantity>0?1:0} min={1} max={vinyl.quantity} disabled={vinyl.quantity===0}/>
                        {
                            vinyl.quantity !== 0 ?
                                <input className="album__add_to_cart height_42px" type="submit" value="Thêm Vào Giỏ"/> :
                                <input className="album__sold_out height_42px" type="button" value="Hết Hàng"/>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}