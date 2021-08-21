import {User} from "./User";

export type UserContextState = {
    user: User;
    logOut: () => void;
    loadUserInformation: () => void;
};