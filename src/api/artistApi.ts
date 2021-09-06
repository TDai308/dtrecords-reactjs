import axiosClient from "./axiosClient";

export const artistApi = {
    getArtists: () => {
        const url = "/artists";
        return axiosClient.get(url);
    }
}