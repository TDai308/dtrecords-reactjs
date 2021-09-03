import axiosClient from "./axiosClient";

export const vinylApi = {
    getVinylList: () => {
        const url = "/vinyls";
        return axiosClient.get(url);
    }
}