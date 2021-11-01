import {Role} from "./Role";

export type User = {
    id: number;
    name: string;
    userName: string;
    phoneNumber: string;
    email: string;
    address: string;
    roles: Role[];
}

export type UserForSigningUp = {
    name: string;
    userName: string;
    password: string
    phoneNumber: string;
    email: string;
    address: string;
}

export type CustomerInformation = {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerAddress: string;
}