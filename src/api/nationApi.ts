import axiosClient from "./axiosClient";

export const nationApi = {
  getNationList: () => {
      const url = "/nation";
      return axiosClient(url);
  }
};