import React, {useEffect, useState} from "react";
import AdminNavigation from "../AdminNavigation";
import {artistApi} from "../../../api/artistApi";
import {handleCloseRemoveNotification, handleOpenRemoveNotification} from "../AdminFunction";
import $ from "jquery"

export default function AdminArtistList() {
    const [artists, setArtists] = useState<{
        id: number,
        nameArtist: string
    }[]>([]);
    const [newArtist, setNewArtist] = useState<string>("");

    const getArtistList = async () => {
       try {
           const fetchArtistList = await artistApi.getArtists();
           setArtists(fetchArtistList.data);
       } catch (e) {
           console.log("error", e);
       }
    }

    useEffect(() => {
        getArtistList();
    }, []);

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const addNewArtist = async () => {
          try {
              await artistApi.addNewArtist(newArtist);
          } catch (e) {
              console.log("error", e);
          }
    }

    const handleAddNewArtist = () => {
        if (newArtist !== "") {
            addNewArtist();
            $("#nameArtistInput").val('');
            getArtistList();
        }
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewArtist(event.target.value);
    }

    const deleteArtist = async (artistId:number , index:number) => {
        try {
            await artistApi.deleteArtist(artistId);
            await getArtistList();
            $(".oval__notification")[index].setAttribute("style", "display:none");
        } catch (e) {
            console.log("error", e);
        }
    }

    return(
        <div className={"admin_page__menu__manager"}>
            <AdminNavigation/>
            <h1>Danh sách nghệ sĩ</h1>
            <form className="form_add margin-10px" onSubmit={handleSubmit}>
                <label className="has-float-label margin-0px">
                    <input className="sign_up__input" id={"nameArtistInput"} required onChange={handleOnChange} type="text"/>
                    <span>Tên Nghệ Sĩ</span>
                </label>
                <input className="button__blue__with-a" type="button" onClick={handleAddNewArtist} value="Thêm Nghệ Sĩ"/>
            </form>
            <table className="table_of_admin">
                <tbody>
                <tr>
                    <td>Ảnh (do lười nên ảnh tự thêm trong BE)</td>
                    <td>Tên</td>
                </tr>
                {
                    artists.map((artist, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <img style={{
                                        width: "40%"
                                    }} src={`http://localhost:3000/images/artistImg/${artist.nameArtist}.png`} alt={`${artist.nameArtist}`}/>
                                </td>
                                <td>{artist.nameArtist}</td>
                                {/*<td className="edit__button"><Link to={"/admin/track/edit/"+track.id}>*/}
                                {/*    <i className="fas fa-edit"/>*/}
                                {/*</Link></td>*/}
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
                artists.map((artis, index) => {
                    return (
                        <div key={index} className="oval__notification">
                            <div className="admin_page__notification_delete">
                                <p>Bạn có chắc muốn xóa???</p>
                                <p>{artis.nameArtist}</p>
                                <div className="admin_page__notification_delete_btn">
                                    <button className="button__red__with-a" onClick={() => handleCloseRemoveNotification(index)}>Không</button>
                                    <button className="button__blue__with-a" onClick={() => deleteArtist(artis.id,index)}>Xóa</button>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}