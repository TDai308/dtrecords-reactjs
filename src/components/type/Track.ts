import {Vinyl} from "./Vinyl";

export type Track = {
    id: number;
    trackName: string;
    artists: string;
    vinyl: Vinyl;
}