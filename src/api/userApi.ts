import axiosClient from "./axiosClient";
import {UserForSigningUp} from "../components/types/User";

export const userApi = {
    getUserWithToken: () => {
        const url = "/token/user";
        return axiosClient.get(url,
            {
                headers: {
                    'Authorization': "Bearer "+ localStorage.getItem("access_token")
            }
        });
    },

    getUsers: () => {
        const url = "/users";
        return axiosClient.get(url);
    },

    getRoles: () => {
        const url = "/roles";
        return axiosClient.get(url);
    },

    signUp: (newUser:UserForSigningUp) => {
        const url = "/user";
        const data = JSON.stringify(newUser);
        return axiosClient.post(url,data);
    }
}