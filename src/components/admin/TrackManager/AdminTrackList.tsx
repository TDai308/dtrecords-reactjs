import React, {useEffect, useState} from "react";
import AdminNavigation from "../AdminNavigation";
import {Link} from "react-router-dom";
import {Track} from "../../type/Track";
import {defaultVinyls} from "../VinylManager/AdminVinylList";
import renderTableHeader from "../../table/renderTableHeader";
import {handleCloseRemoveNotification, handleOpenRemoveNotification} from "../AdminFunction";
import {trackApi} from "../../../api/trackApi";

const defaultTracks = [
    {
        id: 0,
        trackName: "",
        artists: "",
        vinyl: defaultVinyls[0]
    }
];

export default function AdminTrackList() {
    const [tracks, setTracks] = useState<Track[]>(defaultTracks);

    const getTrackList = async () => {
        try {
            const fetchTrackList = await trackApi.getTrackList();
            setTracks(fetchTrackList.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getTrackList();
    }, []);
    
    const deleteTracks = (id:number, key:number) => {

    }

    return (
        <div className={"admin_page__menu__manager"}>
            <AdminNavigation/>
            <h1>Danh sách bài hát</h1>
            <Link className="button__blue__with-a margin-10px" to="/admin/track/create">Tạo sản phẩm mới</Link>
            <table className="table_of_admin">
                <tbody>
                <tr>
                    {
                        renderTableHeader(tracks[0])
                    }
                </tr>
                {
                    tracks.map((track, index) => {
                        return (
                            <tr key={index}>
                                <td>{track.trackName}</td>
                                <td>{track.artists}</td>
                                <td>{track.vinyl.vinylName}</td>
                                <td className="edit__button"><Link to={"/admin/track/edit/"+track.id}>
                                    <i className="fas fa-edit"/>
                                </Link></td>
                                <td className="delete__button" onClick={() => handleOpenRemoveNotification(index)}>
                                    <i className="fas fa-trash-alt"/>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
            {
                tracks.map((track, index) => {
                    return (
                        <div key={index} className="oval__notification">
                            <div className="admin_page__notification_delete">
                                <p>Bạn có chắc muốn xóa???</p>
                                <p>{track.trackName} - {track.artists}</p>
                                <div className="admin_page__notification_delete_btn">
                                    <button className="button__red__with-a" onClick={() => handleCloseRemoveNotification(index)}>Không</button>
                                    <button className="button__blue__with-a" onClick={() => deleteTracks(track.id,index)}>Xóa</button>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}