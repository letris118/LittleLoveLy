import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import "../assets/css/searchOrder.css";
import {
  formatPrice,
  getOrderById,
  getOrdersByUsername,
} from "../services/auth/UsersService";
import { Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import instance from "../services/auth/customize-axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function Order() {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersList, setOrdersList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  useEffect(() => {
    const fetchOrders = async (username) => {
      try {
        const response = await getOrdersByUsername(username);
        if (response) {
          setOrdersList(response);
        } else {
          setOrdersList([]);
        }
      } catch (error) {
        toast.error("Không thể lấy thông tin đơn hàng");
        console.error("Error fetching orders:", error);
        setOrdersList([]);
      }
    };

    const username = localStorage.getItem("username");
    if (username) {
      fetchOrders(username);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    enableReinitialize: true,
    onSubmit: async () => {
      setIsSubmitting(true);
      try {
        const response = await getOrderById(formik.values.search);
        if (response) {
          console.log(response);
          setOrdersList([response]);
        } else {
          setOrdersList([]);
        }
      } catch (error) {
        toast.error("Mã đơn hàng không hợp lệ");
        console.error("Error searching order:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

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
            }}
          >
            <div className="row-top">
              <h4>Đơn hàng</h4>
            </div>
            <div className="content-order-row" style={{ minHeight: "100vh" }}>
              <div className="search-order">
                <form onSubmit={formik.handleSubmit}>
                  <input
                    type="text"
                    placeholder="Nhập mã đơn hàng"
                    name="search"
                    value={formik.values.search}
                    onChange={formik.handleChange}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="search-btn"
                  >
                    Tìm
                  </button>
                </form>
              </div>
              <div className="order-detail">
                {ordersList.length > 0 ? (
                  ordersList.map((order) => (
                    <div className="order-container" key={order.orderId}>
                      <div>
                        {order.orderDetails.map((orderDetail) => (
                          <div
                            className="order-product"
                            key={orderDetail.product.productId}
                          >
                            <div className="order-product-img">
                              <img
                                src={`${instance.defaults.baseURL}/images/products/${orderDetail.product.productImages[0].imagePath}`}
                                alt={orderDetail.product.name}
                              />
                            </div>
                            <div
                              className="order-product-center"
                              style={{ borderRight: "1px solid #9fa0a0b0" }}
                            >
                              <div
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "17px",
                                  color: "black",
                                }}
                              >
                                {orderDetail.product.name}
                              </div>
                              <div>x{orderDetail.quantity}</div>
                              <div style={{ color: "black" }}>
                                {formatPrice(orderDetail.price)}đ
                              </div>
                            </div>
                            <div
                              className="order-product-right"
                              style={{ width: "35%" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  borderBottom: "1px solid #9fa0a0b0",
                                  marginTop: "10px",
                                }}
                              >
                                <div>{order.orderDetails.length} sản phẩm</div>
                                <div style={{ color: "black" }}>
                                  Thành tiền:{" "}
                                  <span
                                    style={{
                                      color: "#ff469e",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {formatPrice(order.postDiscountPrice)}đ
                                  </span>
                                </div>
                              </div>
                              <div className="order-product-right-below">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "15px",
                                    marginRight: "20px",
                                    color: "black",
                                  }}
                                >
                                  Tình trạng:&nbsp;
                                  <span
                                    style={{
                                      color: "#ff469e",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Đang giao
                                  </span>
                                </div>
                                <button>Đánh giá</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    Không có đơn hàng nào
                  </div>
                )}
              </div>
            </div>

            <div
              className="pagination-container"
              style={{
                textAlign: "center",
                padding: "20px 0",
              }}
            >
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
