import React, {useContext, useEffect, useState} from "react";
import AdminNavigation from "../AdminNavigation";
import {Order} from "../../type/Order";
import {orderApi} from "../../../api/orderApi";
import {UserContext} from "../../context/UserProvider";
import $ from "jquery";
import {handleCloseRemoveNotification, handleOpenRemoveNotification} from "../AdminFunction";

export default function AdminOrderList() {
    const {refreshToken} = useContext(UserContext);
    const [orders, setOrders] = useState<Order[]>([]);

    const getOrderList = async () => {
       try {
           const fetchOrderList = await orderApi.getOrderList();
           setOrders(fetchOrderList.data);
       } catch (e) {
           if (e.response.status === 403) {
               await refreshToken();
               await getOrderList();
           }
           console.log("error", e);
       }
    }

    useEffect(() => {
        getOrderList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleDeliverySelectorChange(event:  React.ChangeEvent<HTMLSelectElement>, orderDelivery: string, orderId: number, index: number) {
        if (event.target.value !== orderDelivery) {
            let saveButton = $(`#saveButton${index}`);
            saveButton.prop('disabled',false);
            saveButton.on("click",() => handleUpdateTheOrder(orderId, index));
        } else $(`#saveButton${index}`).prop('disabled',true);
    }

    const handleUpdateTheOrder = async (orderId:number, index:number) => {
        try {
            await orderApi.updateDeliveryTheOrder(orderId,(($(`#selector${index}`).val())!).toString());
            await getOrderList();
            let saveButton = $(`#saveButton${index}`);
            saveButton.addClass("save_button_success");
            saveButton.html("Lưu <i style='margin-left: 3px' class=\"fas fa-check\"></i>");
            setTimeout(function () {
                saveButton.prop('disabled',true);
                saveButton.html("Lưu");
                saveButton.removeClass("save_button_success");
            },2000);
        } catch (error) {
            if (error.response.status === 403) {
                refreshToken();
                await handleUpdateTheOrder(orderId,index);
            }
            console.log("error", error);
        }
    }

    const deleteOrder = async (orderId:number, index:number) => {
        try {
            await orderApi.deleteOrder(orderId);
            await getOrderList();
            $(".oval__notification")[index].setAttribute("style", "display:none");
        } catch (error) {
            if (error.response.status === 403) {
                refreshToken();
                await deleteOrder(orderId, index);
            }
            console.log("error", error);
        }
    }

    return (
        <div className={"admin_page__menu__manager"}>
            <AdminNavigation/>
            <h1>Danh sách đơn hàng</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Số tiền</th>
                        <th>Thời gian mua hàng</th>
                        <th>Tình trạng đơn hàng</th>
                    </tr>
                    {
                        orders.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>{order.orderCode}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.customerPhone}</td>
                                    <td>{order.customerEmail}</td>
                                    <td>{order.customerAddress}</td>
                                    <td>{order.vinyl.vinylName} - {order.vinyl.artist.nameArtist}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.price}$</td>
                                    <td>{order.dateTime}</td>
                                    <td>
                                        <form className="save_form">
                                            <select id={`selector${index}`} className="delivery" defaultValue={order.delivery} onChange={(event) => handleDeliverySelectorChange(event,order.delivery,order.id, index)}>
                                                <option value="Đang xử lý">Đang xử lý</option>
                                                <option value="Đang gửi đến dịch vụ vận chuyển">Đang gửi đến dịch vụ vận chuyển</option>
                                                <option value="Đang giao hàng">Đang giao hàng</option>
                                                <option value="Giao hàng thành công">Giao hàng thành công</option>
                                                <option value="Xử lý không thành công">Xử lý không thành công</option>
                                            </select>
                                        </form>
                                    </td>
                                    <td>
                                        <button id={`saveButton${index}`} style={{
                                            borderRadius: "5px",
                                            display: "flex"
                                        }} disabled>Lưu</button>
                                    </td>
                                    <td className="delete__button" onClick={() => handleOpenRemoveNotification(index)}><i className="fas fa-trash-alt"/></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            {
                orders.map((order, index) => {
                    return (
                        <div key={index} className="oval__notification">
                            <div className="admin_page__notification_delete">
                                <p>Bạn có chắc muốn xóa???</p>
                                <p>{order.orderCode} - {order.vinyl.vinylName}/{order.vinyl.artist.nameArtist}</p>
                                <div className="admin_page__notification_delete_btn">
                                    <button className="button__red__with-a" onClick={() => handleCloseRemoveNotification(index)}>Không</button>
                                    <button className="button__blue__with-a" onClick={() => deleteOrder(order.id,index)}>Xóa</button>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}