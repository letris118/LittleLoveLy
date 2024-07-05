import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import instance from "../services/auth/customize-axios";
import { ordersAll } from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/manage.css";
import StaffBackToTop from "../components/StaffBackToTop";
import { routes } from "../routes";

export default function ManageOrder() {
  const [orderList, setOrderList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

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
          setFilteredOrders(response); // Initially set filteredOrders to all orders
        } else {
          setOrderList([]);
          setFilteredOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Không thể tải đơn hàng");
        setOrderList([]);
        setFilteredOrders([]);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter orders based on searchQuery whenever it changes
    if (searchQuery.trim() === "") {
      setFilteredOrders(orderList); // Reset to show all orders if searchQuery is empty
    } else {
      const filtered = orderList.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchQuery, orderList]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <table className="manage-table-none">
            <thead>
              <tr>
                <th className="index-head" style={{ width: "5%" }}>
                  STT
                </th>
                <th className="createdDate-head" style={{ width: "10%" }}>
                  Ngày tạo đơn
                </th>
                <th className="status-head" style={{ width: "10%" }}>
                  Tình trạng
                </th>
                <th className="name-head" style={{ width: "15%" }}>
                  Người nhận
                </th>
                <th className="phone-head" style={{ width: "10%" }}>
                  Số điện thoại
                </th>
                <th className="trackingCode-head" style={{ width: "10%" }}>
                  Mã đơn hàng
                </th>
                <th className="detail-head" style={{ width: "9%" }}>
                  Chi tiết
                </th>
              </tr>
            </thead>

            <tbody className="manage-table-body">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="index-body">{index + 1}</td>
                    <td className="createdDate-body">
                      {new Date(order.createdDate).toLocaleDateString()}
                    </td>
                    <td className="status-body">{order.status}</td>
                    <td className="name-body">{order.cusName}</td>
                    <td className="phone-body">{order.cusPhone}</td>
                    <td className="detail-body">{order.orderId}</td>
                    <td className="update-body">
                      <Link
                        to={`${routes.updateOrder}/${order.orderId}`}
                        className="update-link"
                      >
                        Xem thêm
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
