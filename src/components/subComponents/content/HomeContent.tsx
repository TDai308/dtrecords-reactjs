import React, {useEffect} from "react";
import VideoTopAlbum from "./HomeContent/VideoTopAlbum";

export default function HomeContent() {
    useEffect(() => {
        document.title = "DTrecords";
    }, []);

    return (
        <div>
            <VideoTopAlbum/>
        </div>
    );
}