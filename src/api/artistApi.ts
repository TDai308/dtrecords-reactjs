import axiosClient from "./axiosClient";

export const artistApi = {
    getArtists: () => {
        const url = "/artists";
        return axiosClient.get(url);
    },

    get5RandomArtists: () => {
        const url = "/artists/random5Artists";
        return axiosClient.get(url);
    },

    addNewArtist: (newArtist:string) => {
        const url = "/admin/artist";
        const data = new FormData();
        data.append("newArtist", newArtist);
        return axiosClient.post(url,data,{
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem("access_token")
            }
        })
    },

    deleteArtist: (id:number) => {
        const url = `/admin/artist/${id}`;
        return axiosClient.delete(url,{
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem("access_token")
            }
        });
    }
}