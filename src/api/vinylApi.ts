import axiosClient from "./axiosClient";

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
    }
}