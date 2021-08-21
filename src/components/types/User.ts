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