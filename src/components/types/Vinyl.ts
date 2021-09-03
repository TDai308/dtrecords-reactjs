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