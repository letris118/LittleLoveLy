import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import "../assets/css/searchOrder.css";
import { orders } from "../services/auth/UsersService";
import { Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function Order() {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersList, setOrdersList] = useState([]);
  const itemsPerPage = 10;

  const CustomPagination = styled(Pagination)(({ theme }) => ({
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        backgroundColor: "#ff69b4",
        color: "white",
      },
    },
  }));

  const totalPages = useMemo(
    () => Math.ceil(ordersList.length / itemsPerPage),
    [ordersList.length]
  );

  const currentItems = useMemo(
    () =>
      ordersList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [currentPage, ordersList]
  );
  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("username");
      try {
        const response = await orders();
        const cusOrder = response.filter(
          (order) => order.user.username === userId
        );
        console.log(cusOrder);
        if (cusOrder) {
          setOrdersList(cusOrder);
        } else {
          setOrdersList([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrdersList([]);
      }
    };

    fetchOrders();
  }, []);
  return (
    <div>
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />
        <div className="content-detail">
          <div
            className="content-display "
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
            }}>
            <div className="row-top">
              <h4>Đơn hàng</h4>
            </div>
            <div className="content-order-row" style={{ minHeight: "100vh" }}>
              <div className="search-order">
                <form>
                  <input type="text" placeholder="Nhập mã đơn hàng" />
                  <button className="search-btn">Tìm</button>
                </form>
              </div>
              <div className="order-detail">
                {ordersList.length > 0 ? (
                  ordersList.map((order) => (
                    <div key={order.orderId}>
                      <div>Ở đây là tình trạng đơn hàng</div>
                      <div>
                        {order.orderDetails.slice(0, 1).map((orderDetail) => (
                          <div key={orderDetail.product.productId}>
                            {orderDetail.product.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Không có đơn hàng nào</div>
                )}
              </div>
            </div>

            <div
              className="pagination-container"
              style={{
                textAlign: "center",
                padding: "20px 0",
              }}>
              <CustomPagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
