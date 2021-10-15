import axiosClient from "./axiosClient";
import {TrackForCreating, TrackForEditing} from "../components/type/Track";

export const trackApi = {
    getTrackListOfVinyl: (idVinyl : number) => {
        const url = `/tracks/${idVinyl}`;
        return axiosClient.get(url);
    },

    getTrackList: () => {
        const url = "/tracks";
        return axiosClient.get(url);
    },

    addNewTrack: (track:TrackForCreating, fileAudio:File) => {
        const url = "/admin/track";
        const data = new FormData();
        data.append("track", JSON.stringify(track));
        data.append("trackPreview", fileAudio);
        return axiosClient.post(url,data,{
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem("access_token")
            }
        });
    },

    getTrackById: (id: number) => {
        const url = `/track/${id}`;
        return axiosClient.get(url);
    },

    updateTrack: (id:number, track:TrackForEditing, trackPreview:File|undefined) => {
        const url = `/admin/track/${id}`;
        const data = new FormData();
        data.append("track", JSON.stringify(track));
        if (trackPreview !== undefined) {
            data.append("trackPreview", trackPreview);
        }
        return axiosClient.put(url, data , {
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem("access_token")
            }
        });
    }
}