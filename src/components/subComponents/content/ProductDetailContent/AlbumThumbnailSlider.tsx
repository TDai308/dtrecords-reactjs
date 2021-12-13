import React, {useEffect, useState} from "react";
import $ from "jquery";

interface AlbumThumbnail {
    thumbnail1: string,
    thumbnail2: string,
    vinylName: string,
}

const AlbumThumbnailSlider:React.FC<AlbumThumbnail> = ({thumbnail1, thumbnail2, vinylName}) => {
    const [count, setCount] = useState<number>(1);

    const sliderImageWidth = $('#album_thumbnail__slider').width();
    $('.slider__image').css({
        'height': sliderImageWidth + 'px'
    });

    useEffect(() => {
        setTimeout(function () {
            let countSlider = count + 1;
            if (countSlider > 2) {
                countSlider = 1;
            }
            setCount(countSlider);
            $(`#radio${countSlider}`).prop("checked", true);
        },5000);
        // return () => {}
    },[count]);

    if (count === 1) {
        $('#radio1').prop("checked", true);
    }

    return (
        <div className="album_thumbnail__slider" id="album_thumbnail__slider">
            <input type="radio" name="radio-btn" id="radio1"/>
            <input type="radio" name="radio-btn" id="radio2"/>
            <img className="slider__image first" src={`https://dtrecords-api.herokuapp.com/${thumbnail1}`} alt={vinylName}/>
            <img className="slider__image" src={`https://dtrecords-api.herokuapp.com/${thumbnail2}`} alt={vinylName}/>
            <div className="slider__navigation_auto">
                <div className="auto-btn1"/>
                <div className="auto-btn2"/>
            </div>
            <div className="slider__navigation_manual">
                <label htmlFor="radio1" className="manual-btn"/>
                <label htmlFor="radio2" className="manual-btn"/>
            </div>
        </div>
    );
};

export default AlbumThumbnailSlider;