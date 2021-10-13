import {Vinyl} from "./Vinyl";
import {VinylDefault} from "./Vinyl";

export type Track = {
    id: number;
    trackName: string;
    artists: string;
    vinyl: Vinyl;
}

export type TrackForCreating = {
    trackName: string;
    artists: string;
    vinyl: Vinyl;
}

export const TrackForCreatingDefault : TrackForCreating = {
    trackName: "",
    artists: "",
    vinyl: VinylDefault
};