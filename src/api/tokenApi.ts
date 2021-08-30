import axiosClient from "./axiosClient";
import * as queryString from "querystring";

export const tokenApi = {
    logIn: (email:string,password:string) => {
        const url = "/login";
        const data = queryString.stringify({
            "email": email,
            "password": password
        });
        return axiosClient.post(url, data, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        });
    },

    refreshToken: () => {
        const url = "/token/refresh";
        return axiosClient.get(url,
            {
                headers: {
                    'Authorization': "Bearer "+ localStorage.getItem("refresh_token")
                }
            });
    }
}