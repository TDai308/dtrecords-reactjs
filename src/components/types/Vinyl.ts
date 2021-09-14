import {Genre} from "./Genre";
import {Artist} from "./Artist";
import {Nation} from "./Nation";

export type Vinyl = {
    id: number,
    vinylName: string,
    artist: Artist,
    thumbnail1: string,
    thumbnail2: string,
    quantity: number,
    price: number,
    genres: Genre[],
    nation: Nation,
    discount: number,
    realPrice: number
}

export type VinylForCreating = {
    vinylName: string,
    artist: Artist,
    thumbnail1: string,
    thumbnail2: string,
    quantity: number,
    price: number,
    genres: Genre[],
    nation: Nation,
    discount: number
}

export const VinylForCreatingDefault : VinylForCreating = {
    vinylName: "",
    artist: {
        id: 0,
        nameArtist: ""
    },
    thumbnail1: "",
    thumbnail2: "",
    quantity: 0,
    price: 0,
    genres: [],
    nation: {
        id: 0,
        nation: ""
    },
    discount: 0
}

export type VinylForEditing = {
    id: number,
    vinylName: string,
    artist: Artist,
    thumbnail1: string,
    thumbnail2: string,
    quantity: number,
    price: number,
    genres: Genre[],
    nation: Nation,
    discount: number,
    realPrice: number
}

export const VinylForEditingDefault : VinylForEditing = {
    id: 0,
    vinylName: "",
    artist: {
        id: 0,
        nameArtist: ""
    },
    thumbnail1: "",
    thumbnail2: "",
    quantity: 0,
    price: 0,
    genres: [],
    nation: {
        id: 0,
        nation: ""
    },
    discount: 0,
    realPrice: 0
}