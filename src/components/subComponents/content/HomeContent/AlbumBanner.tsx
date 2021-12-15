import React from "react";

interface albumBanner {
    srcImages: string[]
}

const AlbumBanner: React.FC<albumBanner> = ({srcImages}) => {
    const UrlDefault = process.env["REACT_APP_URL"];

    return (
        <div className="container__content_ad">
            {
                srcImages.map((image,index) => {
                    return (
                        <img key={index} className="container__content_ad--thumbnails" src={`${UrlDefault}${image}`} alt="thumbnails"/>
                    );
                })
            }
        </div>
    );
}

export default AlbumBanner;