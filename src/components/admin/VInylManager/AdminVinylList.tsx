import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Vinyl} from "../../type/Vinyl";
import {vinylApi} from "../../../api/vinylApi";
import renderTableHeader from "../../table/renderTableHeader";
import AdminNavigation from "../AdminNavigation";
import CategoryPagination from "../../subComponents/CategoryPagination";

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
    const [vinylsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);

    const getVinylList = async () => {
        try {
            const fetchVinylList = await vinylApi.getVinylList(currentPage,vinylsPerPage);
            const {data} = fetchVinylList;
            if (data.content.length > 0) {
                setVinyls(data.content);
                setTotalPages(data.totalPages);
                setTotalElements(data.totalElements);
                setCurrentPage(data.number + 1);
            } else setVinyls(defaultVinyls);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getVinylList();
    }, []);

    const removeNotification = document.getElementsByClassName("oval__notification");

    function handleOpenRemoveNotification(index:number) {
        removeNotification[index].setAttribute("style", "display:block");
    }

    function handleCloseRemoveNotification(index:number) {
        removeNotification[index].setAttribute("style", "display:none");
    }

    const deleteVinyl = async (id:number)=> {
        try {
            await vinylApi.deleteVinyl(id);
            getVinylList();
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div className="admin_page__menu__manager">
            <AdminNavigation/>
            <h1>Danh sách sản phẩm</h1>
            <Link className="button__blue__with-a margin-10px" to="/admin/vinyl/create">Tạo sản phẩm mới</Link>
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
                                    <td className="edit__button"><Link to={"/admin/vinyl/edit/"+vinyl.id}>Sửa</Link></td>
                                    <td className="delete__button" onClick={() => handleOpenRemoveNotification(index)}>Xóa</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            {
                totalElements > 10 &&
                CategoryPagination(currentPage,totalPages)
            }
            {
                vinyls.map((vinyl, index) => {
                    return (
                        <div key={index} className="oval__notification">
                            <div className="admin_page__notification_delete">
                                <p>Bạn có chắc muốn xóa???</p>
                                <p>{vinyl.vinylName} - {vinyl.artist.nameArtist}</p>
                                <div className="admin_page__notification_delete_btn">
                                    <button className="button__red__with-a" onClick={() => handleCloseRemoveNotification(index)}>Không</button>
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