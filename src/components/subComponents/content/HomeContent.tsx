import React, {useEffect} from "react";
import SearchInput from "../SearchInput";
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