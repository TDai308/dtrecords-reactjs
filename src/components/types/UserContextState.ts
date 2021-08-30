import {User} from "./User";

export type UserContextState = {
    user: User;
    logOut: () => void;
    loadUserInformation: () => void;
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
};