import axiosClient from "./axiosClient";
import {Vinyl, VinylForCreating} from "../components/type/Vinyl";

const size : number = 12;

export const vinylApi = {
    getVinylList: (page:number,sort:string|null,productsOption:string|undefined) => {
        let url : string;
        if (productsOption === undefined) {
            if (sort == null) {
                url = `/vinyls?page=${page-1}&size=${size}`;
            } else url = `/vinyls?page=${page-1}&size=${size}&${sort}`;
        } else {
            if (sort == null) {
                url = `/vinyls/${productsOption}?page=${page-1}&size=${size}`;
            } else url = `/vinyls/${productsOption}?page=${page-1}&size=${size}&${sort}`;
        }
        return axiosClient.get(url);
    },

    getVinylWithoutPage: () => {
        const url = "/vinylList";
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

    updateVinyl: (id:number, vinyl:Vinyl, thumbnail1:File|undefined, thumbnail2:File|undefined) => {
        const url = `/admin/vinyl/${id}`;
        const data = new FormData();
        data.append("vinyl", JSON.stringify(vinyl));
        if (thumbnail1 !== undefined) {
            data.append("thumbnail1", thumbnail1);
        }
        if (thumbnail2 !== undefined) {
            data.append("thumbnail2", thumbnail2);
        }
        return axiosClient.put(url,data,{
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem("access_token")
            }
        });
    },

    addNewVinyl: (vinyl:VinylForCreating, thumbnail1:File|undefined, thumbnail2:File|undefined) => {
        const url = "/admin/vinyl";
        const data = new FormData();
        data.append("vinyl", JSON.stringify(vinyl));
        if (thumbnail1 !== undefined && thumbnail2 !== undefined) {
            data.append("thumbnail1", thumbnail1);
            data.append("thumbnail2", thumbnail2);
        }
        return axiosClient.post(url,data,{
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem("access_token")
            }
        });
    },

    getVinylImage: (urlImage: string) => {
        return axiosClient({url:urlImage, baseURL:"http://localhost:8080/"});
    }
}