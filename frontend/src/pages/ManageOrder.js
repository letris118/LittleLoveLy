import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import instance from "../services/auth/customize-axios";
import {
  ordersAll
} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/manage.css";
import StaffBackToTop from "../components/StaffBackToTop";
import { routes } from "../routes";


export default function ManageOrder() {
  const [orderList, setOrderList] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate("/");
      }
    };
    checkAuthentication();

    if (location.state && location.state.success) {
      toast.success(location.state.success);
      // Clear the state to prevent the message from showing again on page reload
      navigate(location.pathname, { replace: true, state: {} });
    }

    const fetchOrders = async () => {
      try {
        let response = await ordersAll();
        if (response) {
          setOrderList(response);
        } else {
          setOrderList([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Không thể tải đơn hàng");
        setOrderList([]);
      }
    };
    fetchOrders();
  }, []);



  return (
    <div>
      <StaffHeader />

      <div className="manage-content">
        <StaffSideBar />

        <div className="manage-content-detail">
          <div className="search-add-table">
            <div className="table-search-bar">
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng..."
              // value={searchQuery}
              // onChange={handleSearch}
              />
            </div>

          </div>

          <table className="manage-table-none">
            <thead>
              <tr>
                <th className="index-head" style={{ width: "5%" }}>STT</th>
                <th className="createdDate-head" style={{ width: "10%" }}>Ngày tạo đơn</th>
                <th className="status-head" style={{ width: "10%" }}>Tình trạng</th>
                <th className="name-head" style={{ width: "15%" }}>Người nhận</th>
                <th className="phone-head" style={{ width: "10%" }}>Số điện thoại</th>
                <th className="trackingCode-head" style={{ width: "10%" }}>Mã vận đơn</th>
                <th className="detail-head" style={{ width: '9%' }}>Chi tiết</th>
              </tr>
            </thead>

            <tbody className="manage-table-body">
              {orderList.length > 0 ? (
                orderList.map((order, index) => (
                  <tr key={index}>
                    <td className="index-body">{index + 1}</td>
                    <td className="createdDate-body">{new Date(order.createdDate).toLocaleDateString()}</td>
                    <td className="status-body">{order.status}</td>
                    <td className="name-body">{order.cusName}</td>
                    <td className="phone-body">{order.cusPhone}</td>
                    <td className="detail-body">{order.trackingCode}</td>
                    <td className="update-body">
                    <Link
                      to={routes.updateOrder}
                      className="update-link">
                      Chi tiết
                    </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    Không có đơn hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>

        <StaffBackToTop />
      </div>
    </div>
  );
}
