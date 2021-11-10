import React, {useContext, useEffect, useState} from "react";
import AdminNavigation from "../AdminNavigation";
import {User} from "../../type/User";
import {userApi} from "../../../api/userApi";
import {UserContext} from "../../context/UserProvider";
import {Link} from "react-router-dom";
import {handleCloseRemoveNotification, handleOpenRemoveNotification} from "../AdminFunction";
import axiosClient from "../../../api/axiosClient";

export default function AdminCustomerList() {
    const [customers, setCustomer] = useState<User[]>([]);
    const {refreshToken} = useContext(UserContext);

    const getCustomerList = async () => {
        try {
            const fetchCustomerList = await userApi.getUsers();
            setCustomer(fetchCustomerList.data);
        } catch (error) {
            if (error.response.status === 403) {
                await refreshToken();
                await getCustomerList();
            }
            console.log("error", error);
        }
    }

    useEffect(() => {
        getCustomerList();
    }, []);
    
    const deleteCustomer = async (customerId:number, index:number) => {
        try {
            await userApi.deleteUser(customerId);
            await getCustomerList();
            handleCloseRemoveNotification(index);
        } catch (error) {
            if (error.response.status === 403) {
                await refreshToken();
                await deleteCustomer(customerId, index);
            }
            console.log("error", error);
        }
    }

    const handleSettingAdminRole = async (customerId:number) => {
        console.log("hahaha");
        try {
            await userApi.setAdminRole(customerId);
            await getCustomerList();
        } catch (error) {
            if (error.response.status === 403) {
                await refreshToken();
                await handleSettingAdminRole(customerId);
            }
            console.log("error", error);
        }
    }

    const handleRemovingAdminRole = async (customerId:number) => {
        console.log("heheheh");
        try {
            await userApi.removeAdminRole(customerId);
            await getCustomerList();
        } catch (error) {
            if (error.response.status === 403) {
                await refreshToken();
                await handleSettingAdminRole(customerId);
            }
            console.log("error", error);
        }
    }

    return (
        <div className={"admin_page__menu__manager"}>
            <AdminNavigation/>
            <h1>Danh sách khách hàng</h1>
            <table className={"table_of_admin"}>
                <tbody>
                    <tr>
                        <td>Tên</td>
                        <td>Tên tài khoản</td>
                        <td>Số điện thoại</td>
                        <td>Email</td>
                        <td>Địa chỉ</td>
                        <td>Quyền hạng</td>
                    </tr>
                    {
                        customers.map((customer, index) => {
                            const userRoles : string[] = [];
                            customer.roles.forEach(role => {
                                if (role.roleName === "ROLE_USER") {
                                    userRoles.push("User");
                                } else userRoles.push("Admin");
                            })
                            return (
                                <tr key={index}>
                                    <td>{customer.name}</td>
                                    <td>{customer.userName}</td>
                                    <td>{customer.phoneNumber}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.address}</td>
                                    <td>{userRoles.toString()}</td>
                                    <td>
                                        {
                                            customer.roles.map(function (role) {
                                                return role.roleName
                                            }).includes("ROLE_ADMIN") ?
                                                <button onClick={() => handleRemovingAdminRole(customer.id)}>remove Admin</button>:
                                                <button onClick={() => handleSettingAdminRole(customer.id)}>set Admin</button>
                                        }
                                    </td>
                                    <td className="delete__button" onClick={() => handleOpenRemoveNotification(index)}><i className="fas fa-trash-alt"/></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            {
                customers.map((customer, index) => {
                    return (
                        <div key={index} className="oval__notification">
                            <div className="admin_page__notification_delete">
                                <p>Bạn có chắc muốn xóa tài khoản???</p>
                                <p>{customer.userName}</p>
                                <div className="admin_page__notification_delete_btn">
                                    <button className="button__red__with-a" onClick={() => handleCloseRemoveNotification(index)}>Không</button>
                                    <button className="button__blue__with-a" onClick={() => deleteCustomer(customer.id,index)}>Xóa</button>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}