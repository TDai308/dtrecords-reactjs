import React, {useContext, useEffect, useState} from "react";
import AdminNavigation from "../AdminNavigation";
import {Order} from "../../type/Order";
import {orderApi} from "../../../api/orderApi";
import {UserContext} from "../../context/UserProvider";
import $ from "jquery";

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
    }, [])

    function handleDeliverySelectorChange(event:  React.ChangeEvent<HTMLSelectElement>, orderDelivety: string, index: number) {
        if (event.target.value !== orderDelivety) {
            $(".save_button")[index].removeAttribute("disabled");
        } else $(".save_button")[index].setAttribute("disabled", "disabled");
    }

    function handleUpdateTheOrder(orderId:number, index:number) {
        console.log("hahahah");
        console.log(orderId);
        console.log(index);
        console.log("hahahah");
        try {
            orderApi.updateDeliveryTheOrder(orderId,(($(`#selector${index}`).val())!).toString());
        } catch (error) {
            if (error.response.status === 403) {
                refreshToken();
                handleUpdateTheOrder(orderId,index);
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
                                            <select id={`selector${index}`} className="delivery" defaultValue={order.delivery} onChange={(event) => handleDeliverySelectorChange(event,order.delivery, index)}>
                                                <option value="Đang xử lý">Đang xử lý</option>
                                                <option value="Đang gửi đến dịch vụ vận chuyển">Đang gửi đến dịch vụ vận chuyển</option>
                                                <option value="Đang giao hàng">Đang giao hàng</option>
                                                <option value="Giao hàng thành công">Giao hàng thành công</option>
                                                <option value="Xử lý không thành công">Xử lý không thành công</option>
                                            </select>
                                        </form>
                                    </td>
                                    <td>
                                        <button className="save_button" onClick={() => handleUpdateTheOrder(order.id,index)} disabled>Lưu</button>
                                    </td>
                                    <td className="delete__button">Xóa</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}