import React, {useEffect, useState} from "react";
import {Vinyl} from "../../type/Vinyl";
import {VinylForEditingDefault} from "../../type/Vinyl";
import {useParams} from "react-router-dom";
import {vinylApi} from "../../../api/vinylApi";
import $ from "jquery";

export default function ProductDetailContent() {
    const [vinyl, setVinyl] = useState<Vinyl>(VinylForEditingDefault);

    const {id} = useParams<{id:string}>();

    const getTheVinyl = async () => {
        try {
            const fetchVinylData = await vinylApi.getVinyl(parseInt(id));
            setVinyl(fetchVinylData.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getTheVinyl();
    }, []);

    const sliderImageWidth = $('#album_thumbnail__slider').width();
    $('.slider__image').css({
        'height': sliderImageWidth + 'px'
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
            {/*<div className="col l-6">*/}
            {/*    <div className="album_information">*/}
            {/*        <div className="album__artist">*/}
            {/*            <div className="album__artist_img_name">*/}
            {/*                <img src="@{/static/img/artistImg/__${vinyl.artist.name}__.png}" alt="${vinyl.artist.name}" className="album__artist_img"/>*/}
            {/*                    <p className="album__artist_name" th:text="${vinyl.artist.name}"></p>*/}
            {/*            </div>*/}
            {/*            <div className="album__like">*/}

            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="album__name_price">*/}
            {/*            <h1 className="album__name" th:text="${vinyl.name}"></h1>*/}
            {/*            <h2 className="album__nation_genre"*/}
            {/*                th:text="${vinyl.nation}+' - '+ ${vinyl.genre.genrename}"></h2>*/}
            {/*            <div className="produce_price" th:switch="${vinyl.onSale}">*/}
            {/*                <div th:case="false">*/}
            {/*                    <span className="produce_price_not_sale" th:text="${vinyl.price}+'$'"></span>*/}
            {/*                </div>*/}
            {/*                <div th:case="true">*/}
            {/*                    <span className="produce_sale_price" th:text="${vinyl.salePrice}+'$'"></span>*/}
            {/*                    <span className="produce_old_price" th:text="${vinyl.price}+'$'"></span>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="album__tracklist_player">*/}
            {/*            <h2>Danh Sách Các Bài Hát - Preview</h2>*/}
            {/*            <div className="album__tracklist">*/}
            {/*                <th:block th:each="track : ${tracklist}">*/}
            {/*                    <div className="album__tracklist__player">*/}
            {/*                        <div className="album__track_name">*/}
            {/*                            <div th:text="${track.name}+' - '+${track.artistName}"></div>*/}
            {/*                        </div>*/}
            {/*                        <div className="album__track_play_pause">*/}
            {/*                            <i th:onclick="|play(${track.trackID},event)|"*/}
            {/*                               className="fas fa-play-circle"></i>*/}
            {/*                            <i th:onclick="|pause(${track.trackID},event)|" className="fas fa-pause-circle"*/}
            {/*                               style="display: none"></i>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <audio className="audio" th:id="${track.trackID}"*/}
            {/*                           th:src="@{/static/trackpreview/__${vinyl.artist.name}__-__${vinyl.name}__/__${track.name}__-__${track.artistName}__.mp3}"></audio>*/}
            {/*                </th:block>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <form className="album__buy_button" th:action="@{/addToCart/__${vinyl.vinylID}__}">*/}
            {/*            <input th:if="${vinyl.quantity > 0}" className="album__quantity" type="number" name="quantity"*/}
            {/*                   value="1" min="1" th:max="${vinyl.quantity}">*/}
            {/*                <input th:if="${vinyl.quantity == 0}" className="album__quantity" type="number"*/}
            {/*                       name="quantity" value="0" disabled>*/}
            {/*                    <input th:if="${vinyl.quantity != 0}" className="album__add_to_cart height_42px"*/}
            {/*                           type="submit" value="Thêm Vào Giỏ">*/}
            {/*                        <input th:if="${vinyl.quantity == 0}" className="album__sold_out height_42px"*/}
            {/*                               type="button" value="Hết Hàng">*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}