import {Vinyl} from "./Vinyl";
import {VinylDefault} from "./Vinyl";
import {defaultVinyls} from "./Vinyl";

export type Track = {
    id: number;
    trackName: string;
    artists: string;
    trackPreview: string,
    vinyl: Vinyl;
};

export type TrackForCreating = {
    trackName: string;
    artists: string;
    vinyl: Vinyl;
};

export const TrackForCreatingDefault : TrackForCreating = {
    trackName: "",
    artists: "",
    vinyl: VinylDefault
};

export type TrackForEditing = {
    id: number;
    trackName: string;
    artists: string;
    trackPreview: string;
    vinyl: Vinyl;
};

export const TrackForEditingDefault : TrackForEditing = {
    id: 0,
    trackName: "",
    artists: "",
    trackPreview: "",
    vinyl: VinylDefault
};

export const defaultTracks = [
    {
        id: 0,
        trackName: "",
        artists: "",
        trackPreview: "",
        vinyl: defaultVinyls[0]
    }
];