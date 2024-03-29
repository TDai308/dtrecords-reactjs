import React, {useContext, useEffect, useState} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import {Vinyl} from "../../type/Vinyl";
import {vinylApi} from "../../../api/vinylApi";
import renderTableHeader from "../../table/renderTableHeader";
import AdminNavigation from "../AdminNavigation";
import classNames from "classnames";
import $ from "jquery";
import {UserContext} from "../../context/UserProvider";
import {handleCloseRemoveNotification,handleOpenRemoveNotification} from "../AdminFunction";
import {defaultVinyls} from "../../type/Vinyl";

export default function AdminVinylList() {
    const location = useLocation();
    let query = new URLSearchParams(location.search);

    const UrlDefault = process.env["REACT_APP_URL"];

    const history = useHistory();

    const [vinyls, setVinyls] = useState<Vinyl[]>([]);
    const [vinylsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(query.get("page")===null?1:parseInt(query.get("page")!));
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);

    const {refreshToken} = useContext(UserContext);

    const getVinylList = async (currentPage:number) => {
        try {
            const fetchVinylList = await vinylApi.getVinylList(currentPage,null,undefined);
            const {data} = fetchVinylList;
            if (data.content.length > 0) {
                setVinyls(data.content);
                setTotalPages(data.totalPages);
                setTotalElements(data.totalElements);
                setCurrentPage(data.number + 1);
            } else setVinyls([]);
            if (data.content.length === 0 && data.totalElements > 10) {
                history.push(`/admin/vinyl?page=${currentPage-1}`);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        setCurrentPage(query.get("page")===null?1:parseInt(query.get("page")!));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location]);

    useEffect(() => {
        getVinylList(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const deleteVinyl = async (id:number, index:number)=> {
        try {
            await vinylApi.deleteVinyl(id);
            await getVinylList(currentPage);
            $(".oval__notification")[index].setAttribute("style", "display:none");
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    await refreshToken();
                    await deleteVinyl(id, index);
                }
            }
            console.log("error", error);
        }
    }

    const handleFirstPage = () => {
        let firstPage = 1;
        if (currentPage > firstPage) {
            history.push(`/admin/vinyl?page=${firstPage}`);
        }
    }

    const handlePrevPage = () => {
        let prevPage = 1;
        if (currentPage > prevPage) {
            history.push(`/admin/vinyl?page=${currentPage - prevPage}`);
        }
    }

    const handleLastPage = () => {
        let condition = Math.ceil(totalElements/ vinylsPerPage);
        if (currentPage < condition) {
            history.push(`/admin/vinyl?page=${condition}`);
        }
    }

    const handleNextPage = () => {
        if (currentPage < Math.ceil(totalElements / vinylsPerPage)) {
            history.push(`/admin/vinyl?page=${currentPage + 1}`);
        }
    }

    const handleChangePage = (event :  React.ChangeEvent<HTMLInputElement>) => {
        let targetPage = parseInt(event.target.value);
        history.push(`/admin/vinyl?page=${targetPage}`);
    }

    const sliderImageWidth = $('.adminPageVinyl__imageVinyl__box').width();
    $('.adminPageVinyl__imageVinyl').css({
        'height': sliderImageWidth + 'px'
    });

    return (
        <div className="admin_page__menu__manager">
            <AdminNavigation/>
            <h1>Danh sách sản phẩm</h1>
            <Link className="button__blue__with-a margin-10px" to="/admin/vinyl/create">Tạo sản phẩm mới</Link>
            <table className="table_of_admin">
                <tbody>
                    <tr>
                        {
                            renderTableHeader(defaultVinyls[0])
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
                                    <td><Link to={"/admin/vinyl/" + vinyl.id} className={"vinylItem__hover"}>{vinyl.vinylName}</Link></td>
                                    <td>{vinyl.artist.nameArtist}</td>
                                    <td>
                                        <div className={"adminPageVinyl__imageVinyl__box"}>
                                            <img className={"adminPageVinyl__imageVinyl"} id={"thumbnail1"} src={`${UrlDefault}${vinyl.thumbnail1}`} alt="thumbnail1"/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={"adminPageVinyl__imageVinyl__box"}>
                                            <img className={"adminPageVinyl__imageVinyl"} id={"thumbnail2"} src={`${UrlDefault}${vinyl.thumbnail2}`} alt="thumbnail2"/>
                                        </div>
                                    </td>
                                    <td>{vinyl.quantity}</td>
                                    <td>{vinyl.price}</td>
                                    <td>{
                                        genres.toString()
                                    }
                                    </td>
                                    <td>{vinyl.nation.nation}</td>
                                    <td>{vinyl.discount}</td>
                                    <td>{vinyl.realPrice}</td>
                                    <td className="edit__button"><Link to={"/admin/vinyl/edit/"+vinyl.id}>
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
                totalElements > 10 &&
                <div className="home_produce__category__pagination display_flex--space-between">
                    <div>
                        Showing Page {currentPage} of {totalPages}
                    </div>

                    <div className={"display_flex--space-between"}>
                        <div className={"display_flex--center pagination__buttons"}>
                            <button disabled={currentPage === 1} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== 1})} onClick={handleFirstPage}>
                                <i className="fas fa-angle-double-left"/> First
                            </button>
                            <button disabled={currentPage === 1} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== 1})} onClick={handlePrevPage}>
                                <i className="fas fa-angle-left"/> Prev
                            </button>
                        </div>

                        <input type="number" name={"currentPage"} className={"pagination__inputPage"} value={currentPage} max={totalPages} min={1} onChange={handleChangePage}/>

                        <div className={"display_flex--center"}>
                            <button disabled={currentPage === totalPages} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== totalPages})} onClick={handleNextPage}>
                                <i className="fas fa-angle-right"/> Next
                            </button>
                            <button disabled={currentPage === totalPages} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== totalPages})} onClick={handleLastPage}>
                                <i className="fas fa-angle-double-right"/> Last
                            </button>
                        </div>
                    </div>
                </div>
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
                                    <button className="button__blue__with-a" onClick={() => deleteVinyl(vinyl.id,index)}>Xóa</button>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
);
}