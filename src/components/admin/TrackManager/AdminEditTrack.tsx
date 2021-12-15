import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {TrackForEditing, TrackForEditingDefault} from "../../type/Track";
import {Vinyl} from "../../type/Vinyl";
import {vinylApi} from "../../../api/vinylApi";
import {trackApi} from "../../../api/trackApi";
import {UserContext} from "../../context/UserProvider";
import $ from "jquery";

export default function AdminEditTrack() {
    const [editingSuccessful, setEditingSuccessful] = useState<boolean>(false);
    const [track, setTrack] = useState<TrackForEditing>(TrackForEditingDefault);
    const [trackPreview, setTrackPreview] = useState<File>();
    const [vinylList, setVinylList] = useState<Vinyl[]>([]);

    const {refreshToken} = useContext(UserContext);

    const {id} = useParams<{id:string}>();

    const UrlDefault = process.env["REACT_APP_URL"];

    const getVinylList = async () => {
        try {
            const fetchVinylList = await vinylApi.getVinylWithoutPage();
            setVinylList(fetchVinylList.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    const getTrack = async () => {
        try {
            const  fetchTrack = await trackApi.getTrackById(parseInt(id));
            setTrack(fetchTrack.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
       getVinylList();
       getTrack();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
        if (event.currentTarget.name === "vinyl") {
            setTrack({...track, vinyl: vinylList.find(vinyl => vinyl.id === parseInt(event.target.value))!});
        } else {
            setTrack({...track, [event.currentTarget.name]: event.target.value});
        }
    }

    const handleChangeTrackPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrackPreview(event.target.files?.[0]);
        $("#file__input--trackPreview").text(event.target.files?.[0].name!);
    };

    const handleUpdateTrack = async () => {
        try {
            const fetchNewTrack = await trackApi.updateTrack(parseInt(id), track, trackPreview);
            setTrack(fetchNewTrack.data);
            setEditingSuccessful(true);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    await refreshToken();
                    await handleUpdateTrack();
                }
            }
            console.log("error", error);
        }
    };

    return (
        <form className="admin_page__menu__manager" style={{width: "60%"}}>
            <h1>Chỉnh sửa thông tin bài hát</h1>
            <Link to="/admin/track" className="button__blue__with-a">Danh sách bài hát</Link>
            {
                editingSuccessful &&
                <p>Bài hát đã được cập nhật</p>
            }
            <label className="has-float-label">
                <input className="sign_up__input" name="trackName" required type="text" value={track.trackName} onChange={handleChange}/>
                <span>Tên bài hát</span>
            </label>

            <label className="has-float-label">
                <input className="sign_up__input" name="artists" required type="text" value={track.artists} onChange={handleChange}/>
                <span>Nghệ sĩ</span>
            </label>

            <label className="has-float-label">
                <input className="sign_up__input" id={"trackPreview"} name="trackPreview" required type="file" accept={"audio/*"} onChange={handleChangeTrackPreview}/>
                <div className={"file__input"}>
                    <span id={"file__input--trackPreview"}>{UrlDefault}{track.trackPreview}</span>
                </div>
                <label htmlFor="trackPreview">
                    <i className="fas fa-upload"/> Choose a file...
                </label>
                <span style={{
                    transform: "translateX(10px) translateY(-24px)"
                }}>File track preview</span>
            </label>

            <label className="has-float-label">
                <select name="vinyl" className="sign_up__input" value={track.vinyl.id} id={"vinylInput"} onChange={handleChange}>
                    {
                        vinylList.map((vinyl, index) => {
                            return (
                                <option key={index} value={vinyl.id}>{vinyl.vinylName}</option>
                            );
                        })
                    }
                </select>
                <span>Album</span>
            </label>

            <input className="button_Login_Signup" type="button" value="Cập nhật thông tin sản phẩm" onClick={handleUpdateTrack}/>
        </form>
    );
}