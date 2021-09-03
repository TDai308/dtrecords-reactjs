import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Vinyl} from "../types/Vinyl";
import {vinylApi} from "../../api/vinylApi";
import renderTableHeader from "../table/renderTableHeader";

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

export default function AdminVinyl() {
    const [vinyls, setVinyls] = useState<Vinyl[]>(defaultVinyls);

    useEffect(() => {
        const getVinylList = async () => {
            try {
                const fetchVinylList = await vinylApi.getVinylList();
                setVinyls(fetchVinylList.data);
            } catch (error) {
                console.log("error", error);
            }
        }
        getVinylList();
    }, []);

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
                    <button className="button__red__with-a">Đăng xuất</button>
                </div>
            </div>
            <h1>Danh sách sản phẩm</h1>
            <Link className="button__blue__with-a margin-10px" to="/admin/create-vinyl">Tạo sản phẩm mới</Link>
            <table  className="table_of_admin">
                <tbody>
                    <tr>
                        {
                            renderTableHeader(vinyls[0])
                        }
                        {/*<th>Tên</th>*/}
                        {/*<th>Tên nghệ sỹ</th>*/}
                        {/*<th>Thumbnail 1</th>*/}
                        {/*<th>Thumbnail 2</th>*/}
                        {/*<th>Số lượng</th>*/}
                        {/*<th>Giá ($)</th>*/}
                        {/*<th>Thể loại</th>*/}
                        {/*<th>Quốc gia</th>*/}
                        {/*<th>Discount</th>*/}
                        {/*<th>Giá bán</th>*/}
                    </tr>
                    {
                        vinyls.map((vinyl,index) => {
                            const genres: string[] = [];
                            vinyl.genres.forEach(genre => {
                                genres.push(genre.genreName);
                            });
                            return (
                                <tr key={index}>
                                    <td>{vinyl.vinylName}</td>
                                    <td><Link to={"/admin/vinyl/" + vinyl.id}>{vinyl.artist.nameArtist}</Link></td>
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
            {/*// <th:block th:each="vinyl : ${vinyls}">*/}
            {/*//     <div className="oval__notification">*/}
            {/*//         <form className="admin_page__notification_delete" th:action="@{/delete-vinyl/__${vinyl.vinylID}__}"*/}
            {/*//               method="post">*/}
            {/*//             <p>Bạn có chắc muốn xóa???</p>*/}
            {/*/!*            <p th:text="${vinyl.name}+' - '+${vinyl.artist.name}"></p>*!/*/}
            {/*/!*            <div className="admin_page__notification_delete_btn">*!/*/}
            {/*/!*                <input className="button__red__with-a" type="button" value="Không">*!/*/}
            {/*/!*                    <input className="button__blue__with-a" type="submit" value="Xóa">*!/*/}
            {/*/!*            </div>*!/*/}
            {/*/!*        </form>*!/*/}
            {/*/!*    </div>*!/*/}
            {/*/!*</th:block>*!/*/}
        </div>
);
}