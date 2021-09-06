import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Vinyl} from "../types/Vinyl";
import {vinylApi} from "../../api/vinylApi";
import renderTableHeader from "../table/renderTableHeader";
import {UserContext} from "../context/UserProvider";

const defaultVinyls = [
    {
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
        genres: [{
            id: 0,
            genreName: ""
        }],
        nation: {
            id: 0,
            nation: ""
        },
        discount: 0,
        realPrice: 0
    }
];

export default function AdminVinylList() {
    const [vinyls, setVinyls] = useState<Vinyl[]>(defaultVinyls);
    const {logOut} = useContext(UserContext);

    const getVinylList = async () => {
        try {
            const fetchVinylList = await vinylApi.getVinylList();
            if (fetchVinylList.data.length > 0) {
                setVinyls(fetchVinylList.data);
            } else setVinyls(defaultVinyls);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getVinylList();
    }, []);

    let deleteButton = document.getElementsByClassName("delete__button");
    let ovalNotification = document.getElementsByClassName("oval__notification");
    let NoButton = document.getElementsByClassName("button__red__with-a");
    for (let i=0; i<deleteButton.length;i++) {
        deleteButton[i].addEventListener("click", function () {
            ovalNotification[i].setAttribute("style", "display:block");
        })
        NoButton[i+1].addEventListener("click", function () {
            ovalNotification[i].setAttribute("style", "display:none");
        })
    }

    const deleteVinyl = async (id:number)=> {
        try {
            const fetchDeleteVinyl = await vinylApi.deleteVinyl(id);
            console.log(fetchDeleteVinyl);
            setVinyls(defaultVinyls);
            getVinylList();
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div className="admin_page__menu__manager">
            <div className="admin_page__menu__manager__navigation">
                <div className="admin_page__menu__manager__menu">
                    <Link className="button__blue__with-a" to="/admin/vinyl">Quản lý sản phẩm</Link>
                    <Link className="button__blue__with-a" to="/admin/track">Quản lý bài hát</Link>
                    <Link className="button__blue__with-a" to="/admin/artist">Danh sách nghệ sĩ</Link>
                    <Link className="button__blue__with-a" to="/admin/order">Quản lý đơn hàng</Link>
                    <Link className="button__blue__with-a" to="/admin/customer">Quản lý khách hàng</Link>
                </div>
                <div className="admin_page__menu__manager__logout">
                    <button className="button__red__with-a" onClick={logOut}>Đăng xuất</button>
                </div>
            </div>
            <h1>Danh sách sản phẩm</h1>
            <Link className="button__blue__with-a margin-10px" to="/admin/vinyl/createVinyl">Tạo sản phẩm mới</Link>
            <table  className="table_of_admin">
                <tbody>
                    <tr>
                        {
                            renderTableHeader(vinyls[0])
                        }
                    </tr>
                    {
                        vinyls.map((vinyl,index) => {
                            const genres: string[] = [];
                            vinyl.genres.forEach(genre => {
                                genres.push(genre.genreName);
                            });
                            return (
                                <tr key={index}>
                                    <td><Link to={"/admin/vinyl/" + vinyl.id}>{vinyl.vinylName}</Link></td>
                                    <td>{vinyl.artist.nameArtist}</td>
                                    <td>{vinyl.thumbnail1}</td>
                                    <td>{vinyl.thumbnail2}</td>
                                    <td>{vinyl.quantity}</td>
                                    <td>{vinyl.price}</td>
                                    <td>{
                                        genres.toString()
                                    }
                                    </td>
                                    <td>{vinyl.nation.nation}</td>
                                    <td>{vinyl.discount}</td>
                                    <td>{vinyl.realPrice}</td>
                                    <td className="edit__button"><Link to={"/admin/vinyl/edit-vinyl/"+vinyl.id}>Sửa</Link></td>
                                    <td className="delete__button">Xóa</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            {
                vinyls.map((vinyl, index) => {
                    return (
                        <div key={index} className="oval__notification">
                            <div className="admin_page__notification_delete">
                                <p>Bạn có chắc muốn xóa???</p>
                                <p>{vinyl.vinylName} - {vinyl.artist.nameArtist}</p>
                                <div className="admin_page__notification_delete_btn">
                                    <button className="button__red__with-a">Không</button>
                                    <button className="button__blue__with-a" onClick={() => deleteVinyl(vinyl.id)}>Xóa</button>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
);
}