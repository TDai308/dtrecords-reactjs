import axiosClient from "./axiosClient";

export const trackApi = {
    getTrackListOfVinyl: (idVinyl : number) => {
        const url = `/tracks/${idVinyl}`;
        return axiosClient.get(url);
    },

    getTrackList: () => {
        const url = "/tracks";
        return axiosClient.get(url);
    }
}