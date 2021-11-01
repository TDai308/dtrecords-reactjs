import axiosClient from "./axiosClient";
import {CustomerInformation} from "../components/type/User";
import {Cart} from "../components/type/Cart";

export const orderApi = {
    handleOrder: (customerInformation: CustomerInformation, cartList:Cart[]) => {
        const url = "/ProceedToCheckout";
        const data = new FormData();
        data.append("customerInformation",JSON.stringify(customerInformation));
        data.append("cart",JSON.stringify(cartList));
        return axiosClient.post(url,data);
    }
};