import {Vinyl} from "./Vinyl";

export type Order = {
    id: number,
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerAddress: string;
    vinyl: Vinyl;
    quantity: number;
    price: number;
    delivery: string;
    orderCode: string;
    dateTime: string;
}