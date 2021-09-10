import axiosClient from "./axiosClient";

export const genreApi = {
    getGenreList: () => {
        const url = "/genres";
        return axiosClient.get(url);
    }
}