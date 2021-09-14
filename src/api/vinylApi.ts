import axiosClient from "./axiosClient";
import {VinylForCreating} from "../components/types/Vinyl";

export const vinylApi = {
    getVinylList: () => {
        const url = "/vinyls";
        return axiosClient.get(url);
    },

    deleteVinyl: (id:number) => {
        const url = `/admin/vinyl/${id}`;
        return axiosClient.delete(url,{
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem("access_token")
            }
        });
    },

    addNewVinyl: (vinyl:VinylForCreating) => {
        const url = "/admin/vinyl";
        const data = JSON.stringify(vinyl);
        return axiosClient.post(url,data,{
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem("access_token")
            }
        });
    }
}