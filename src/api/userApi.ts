import axiosClient from "./axiosClient";
import {UserForSigningUp} from "../components/type/User";

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
        const url = "/admin/users";
        return axiosClient.get(url,{
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem("access_token")
            }
        });
    },

    getUser: (userId: number) => {
        const url = `/user/${userId}`;
        return axiosClient.get(url);
    },

    getRoles: () => {
        const url = "/roles";
        return axiosClient.get(url);
    },

    setAdminRole: (customerId:number) => {
        const url = `/admin/user/setAdmin/${customerId}`;
        return axiosClient.put(url, {},{
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem("access_token")
            }
        });
    },

    removeAdminRole: (customerId:number) => {
        const url = `/admin/user/removeAdmin/${customerId}`;
        return axiosClient.put(url, {},{
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem("access_token")
            }
        });
    },

    signUp: (newUser:UserForSigningUp) => {
        const url = "/user";
        const data = JSON.stringify(newUser);
        return axiosClient.post(url,data);
    },

    deleteUser: (userId:number) => {
        const url = `/admin/user/${userId}`;
        return axiosClient.delete(url, {
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem("access_token")
            }
        });
    }
}