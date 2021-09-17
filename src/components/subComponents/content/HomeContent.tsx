import React, {useEffect} from "react";
import SearchInput from "../SearchInput";
import VideoTopAlbum from "./HomeContent/VideoTopAlbum";

export default function HomeContent() {
    useEffect(() => {
        document.title = "DTrecords";
    }, []);

    return (
        <div className="container">
            <div className="grid wide">
                <h1 className="container__header">
                    Thiên đường âm nhạc dành cho bạn, nơi kết nối bạn với những nghệ sỹ và ban nhạc trên toàn thế giới!!!
                </h1>
                <SearchInput/>
                <VideoTopAlbum/>
            </div>
        </div>
    );
}