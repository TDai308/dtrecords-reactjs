import axiosClient from "./axiosClient";
import {Vinyl, VinylForCreating} from "../components/type/Vinyl";

const size : number = 10;

export const vinylApi = {
    getVinylList: (page:number) => {
        const url = `/vinyls?page=${page-1}&size=${size}`;
        return axiosClient.get(url);
    },

    getVinyl: (id:number) => {
        const url = `/vinyl/${id}`;
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

    updateVinyl: (id:number, vinyl:Vinyl) => {
        const url = `/admin/vinyl/${id}`;
        const data = JSON.stringify(vinyl);
        return axiosClient.put(url,data,{
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