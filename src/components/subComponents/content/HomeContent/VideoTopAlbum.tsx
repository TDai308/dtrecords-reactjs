import React from "react";
import TopAlbumVideo from "../../../../static/video/PiqFpPQ8-25631591.mp4"

export default function VideoTopAlbum() {
    return (
        <div className="container__video_top_album">
            <a href="https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/">
                <video autoPlay muted loop>
                    <source src={TopAlbumVideo} type="video/mp4"/>
                </video>
            </a>
            <div className="top_album__title">
                TOP<br/>500<br/>ALBUMS
            </div>
        </div>
    );
}