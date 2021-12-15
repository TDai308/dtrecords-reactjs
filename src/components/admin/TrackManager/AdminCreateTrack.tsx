import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {TrackForCreating, TrackForCreatingDefault} from "../../type/Track";
import {Vinyl} from "../../type/Vinyl";
import {vinylApi} from "../../../api/vinylApi";
import $ from "jquery";
import {trackApi} from "../../../api/trackApi";
import {UserContext} from "../../context/UserProvider";

export default function AdminCreateTrack() {
    const [newTrack, setNewTrack] = useState<TrackForCreating>(TrackForCreatingDefault)
    const [vinylList, setVinylList] = useState<Vinyl[]>([]);
    const [fileAudio, setFileAudio] = useState<File>();
    const [creatingSuccessful, setCreatingSuccessful] = useState<boolean>(false)

    const {refreshToken} = useContext(UserContext);

    const getVinylList = async () => {
        try {
            const fetchVinylList = await vinylApi.getVinylWithoutPage();
            setVinylList(fetchVinylList.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getVinylList();
    }, [])

    useEffect(() => {
        setNewTrack({...newTrack, vinyl: vinylList[0]});
    }, [vinylList]); // eslint-disable-line react-hooks/exhaustive-deps
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
        if (event.currentTarget.name === "vinyl") {
            setNewTrack({...newTrack, vinyl: vinylList.find(vinyl => vinyl.id === parseInt(event.target.value))!});
        } else {
            setNewTrack({...newTrack, [event.currentTarget.name]: event.target.value});
        }
    }
    
    const handleAddNewTrack = async () => {
        try {
            await trackApi.addNewTrack(newTrack, fileAudio!);
            setCreatingSuccessful(true);
            setNewTrack({...TrackForCreatingDefault,vinyl : vinylList[0]});
            setFileAudio(undefined);
            $("#trackPreview").val("");
            $("#file__input--trackPreview").text("None");
            $("#vinylInput").prop("selectedIndex", 0);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    await refreshToken();
                    await handleAddNewTrack();
                }
            }
            console.log("error",error);
        }
    }
    
    const handleChangeTrackPreview = (event:React.ChangeEvent<HTMLInputElement>) => {
        $("#file__input--trackPreview").text(event.target.files?.[0].name!);
        setFileAudio(event.target.files?.[0]);
    }
    
    return (
        <form className="admin_page__menu__manager" style={{width: "60%"}}>
            <h1>Thêm bài hát</h1>
            <Link to="/admin/track" className="button__blue__with-a">Danh sách bài hát</Link>
            {
                creatingSuccessful &&
                <p>Bài hát mới đã được thêm</p>
            }
            <label className="has-float-label">
                <input className="sign_up__input" name="trackName" required type="text" value={newTrack.trackName} onChange={handleChange}/>
                <span>Tên bài hát</span>
            </label>

            <label className="has-float-label">
                <input className="sign_up__input" name="artists" required type="text" value={newTrack.artists} onChange={handleChange}/>
                <span>Nghệ sĩ</span>
            </label>

            <label className="has-float-label">
                <input className="sign_up__input" id={"trackPreview"} name="trackPreview" required type="file" accept={"audio/*"} onChange={handleChangeTrackPreview}/>
                <div className={"file__input"}>
                    <span id={"file__input--trackPreview"}>None</span>
                </div>
                <label htmlFor="trackPreview">
                    <i className="fas fa-upload"/> Choose a file...
                </label>
                <span style={{
                    transform: "translateX(10px) translateY(-24px)"
                }}>File track preview</span>
            </label>

            <label className="has-float-label">
                <select name="vinyl" className="sign_up__input" id={"vinylInput"} onChange={handleChange}>
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

            <input className="button_Login_Signup" type="button" value="Cập nhật thông tin sản phẩm" onClick={handleAddNewTrack}/>
        </form>
    );
}