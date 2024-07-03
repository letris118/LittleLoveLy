import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import "../assets/css/searchOrder.css";
import {
  formatPrice,
  getProductById,
  orders,
} from "../services/auth/UsersService";
import { Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import instance from "../services/auth/customize-axios";

export default function Order() {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersList, setOrdersList] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [searchClick, setSearchClick] = useState("");
  const [searchInput, setSearchInput] = useState("");
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
        console.log(response.user.username);
        const cusOrder = response.find(
          (order) => order.user.username === userId
        );

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

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setSearchClick(searchInput);
  };

  // const filteredOrders = ordersList.filter((order) =>
  //   order.orderId.toString().equals(searchClick)
  // );
  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const image = {};
        for (const order of ordersList) {
          for (const detail of order.orderDetails) {
            const productDetail = await getProductById(
              detail.product.productId
            );
            console.log(productDetail);
            image[detail.product.productId] =
              productDetail.productImages[0].imagePath;
          }
        }
        setProductImage(image);
      } catch (error) {
        console.error("Error fetching product image:", error);
      }
    };

    if (ordersList.length > 0) {
      fetchProductImage();
    }
  }, [ordersList]);

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
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Nhập mã đơn hàng"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                  <button
                    type="button"
                    className="search-btn"
                    onClick={handleSearchButtonClick}>
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
                            key={orderDetail.product.productId}>
                            <div className="order-product-img">
                              <img
                                src={`${
                                  instance.defaults.baseURL
                                }/images/products/${
                                  productImage[orderDetail.product.productId]
                                }`}
                                alt={orderDetail.product.name}
                              />
                            </div>
                            <div
                              className="order-product-center"
                              style={{ borderRight: "1px solid #9fa0a0b0" }}>
                              <div
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "17px",
                                  color: "black",
                                }}>
                                {orderDetail.product.name}
                              </div>
                              <div>x{orderDetail.quantity}</div>
                              <div style={{ color: "black" }}>
                                {formatPrice(orderDetail.price)}đ
                              </div>
                            </div>
                            <div
                              className="order-product-right"
                              style={{ width: "35%" }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  borderBottom: "1px solid #9fa0a0b0",
                                  marginTop: "10px",
                                }}>
                                <div>{order.orderDetails.length} sản phẩm</div>
                                <div style={{ color: "black" }}>
                                  Thành tiền:{" "}
                                  <span
                                    style={{
                                      color: "#ff469e",
                                      fontWeight: "bold",
                                    }}>
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
                                  }}>
                                  Tình trạng:&nbsp;
                                  <span
                                    style={{
                                      color: "#ff469e",
                                      fontWeight: "bold",
                                    }}>
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
