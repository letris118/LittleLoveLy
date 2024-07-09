import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import "../assets/css/searchOrder.css";
import {
  formatPrice,
  getOrderById,
  getOrdersByUsername,
  orderReceived,
} from "../services/auth/UsersService";
import {
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import instance from "../services/auth/customize-axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { min, set } from "date-fns";
import { Link } from "react-router-dom";
import { routes } from "../routes";

export default function Order() {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersList, setOrdersList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const itemsPerPage = 5;

  // useEffect(() => {
  //   if (localStorage.getItem("userRole") === "ROLE_ADMIN" || localStorage.) {

  //   }

  const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        backgroundColor: "#ff69b4",
        color: "white",
      },
    },
  });

  const totalPages = useMemo(
    () => Math.ceil(ordersList.length / itemsPerPage),
    [ordersList.length]
  );

  const fetchOrders = async (username) => {
    try {
      const response = await getOrdersByUsername(username);
      const sortedResponse = response.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
      if (sortedResponse) {
        setOrdersList(sortedResponse);
      } else {
        setOrdersList([]);
      }
    } catch (error) {
      toast.error("Không thể lấy thông tin đơn hàng");
      console.error("Error fetching orders:", error);
      setOrdersList([]);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      fetchOrders(username);
    }
  }, [refresh]);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    enableReinitialize: true,
    onSubmit: async () => {
      setIsSubmitting(true);
      try {
        if (!formik.values.search) {
          const username = localStorage.getItem("username");
          if (username) {
            await fetchOrders(username);
          }
        } else {
          const response = await getOrderById(formik.values.search);
          if (response) {
            setOrdersList([response]);
          } else {
            setOrdersList([]);
          }
        }
      } catch (error) {
        toast.error("Mã đơn hàng không hợp lệ");
        console.error("Error searching order:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return ordersList.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, ordersList]);

  const handleOrderClick = async (order) => {
    const { orderId } = order;
    try {
      const response = await getOrderById(orderId);
      setSelectedOrder(response);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const handleClose = () => {
    setSelectedOrder(null);
  };

  const handleCancelOrder = (order) => {
    setOrderToCancel(order);
    setIsCancelDialogOpen(true);
  };

  // const handleConfirmCancel = () => {
  //   //
  //   console.log(`Đơn hàng <b>${orderToCancel.orderId}</b> của bạn đã hủy`);
  //   setIsCancelDialogOpen(false);
  //   setSelectedOrder(null);
  // };

  const handleCloseCancelDialog = () => {
    setIsCancelDialogOpen(false);
  };

  const CustomDialog = styled(Dialog)({
    "& .MuiDialog-paper": {
      width: "70%",
      maxHeight: "650px",
    },
    "& .MuiPaper-root": {
      borderRadius: "20px",
    },
  });

  const CustomDialogTitle = styled(DialogTitle)({
    fontWeight: "bold",
    backgroundColor: "#ff469e",
    color: "white",
    marginBottom: "20px",
  });

  const CustomButton = styled(Button)({
    backgroundColor: "hotpink",
    color: "white",
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(255,0,132,0.8) 0%, rgba(255,99,132,0.8) 100%)",
    },
    marginBottom: "20px",
    marginRight: "5px",
    borderRadius: "10px",
    width: "100px",
  });

  const getStatusNotification = (status) => {
    if (status === "COD_PENDING" || status === "ONLINE_PENDING") {
      return "Đang xử lí";
    } else if (status === "COD_CONFIRMED" || status === "ONLINE_CONFIRMED") {
      return "Đang giao hàng";
    } else if (status === "COD_RECEIVED" || status === "ONLINE_RECEIVED") {
      return "Đã giao hàng";
    }
  };

  const getPayMentMethod = (status) => {
    if (status.includes("COD")) {
      return "Thanh toán khi nhận hàng";
    } else if (status.includes("ONLINE")) {
      return "Thanh toán bằng VnPay";
    }
  };

  const checkConfirm = async (orderId) => {
    try {
      const response = await orderReceived(orderId);
      if (response) {
        toast.success("Đã xác nhận nhận hàng");
        setRefresh(!refresh);
      } else {
        toast.error("Không thể xác nhận nhận hàng !");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

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
                    className="search-btn">
                    Tìm
                  </button>
                </form>
              </div>
              <div className="order-detail">
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <div className="order-container" key={order.orderId}>
                      <div>
                        {order.orderDetails.slice(0, 1).map((orderDetail) => (
                          <div
                            className="order-product"
                            key={orderDetail.product.productId}
                            style={{ cursor: "pointer" }}>
                            <div
                              className="order-product-img"
                              style={{ cursor: "pointer" }}>
                              <img
                                src={`${instance.defaults.baseURL}/images/products/${orderDetail.product.productImages[0].imagePath}`}
                                alt={orderDetail.product.name}
                              />
                            </div>
                            <div
                              className="order-product-center"
                              style={{
                                borderRight: "1px solid #9fa0a0b0",
                                cursor: "pointer",
                              }}>
                              <div
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "17px",
                                  color: "black",
                                }}>
                                <Link
                                  to={`${routes.products}/${orderDetail.product.name}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}>
                                  {orderDetail.product.name}
                                </Link>
                              </div>
                              <div>x{orderDetail.quantity}</div>
                              <div style={{ color: "black" }}>
                                {formatPrice(orderDetail.price)}đ
                              </div>
                            </div>
                            <div
                              className="order-product-right"
                              style={{ width: "45%" }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  borderBottom: "1px solid #9fa0a0b0",
                                  marginTop: "10px",
                                  cursor: "pointer",
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
                                    {getStatusNotification(order.status)}
                                  </span>
                                </div>
                                <div>
                                  {order.status === "COD_CONFIRMED" ||
                                  order.status === "ONLINE_CONFIRMED" ? (
                                    <button
                                      onClick={() =>
                                        checkConfirm(order.orderId)
                                      }
                                      style={{
                                        width: "150px",
                                        height: "40px",
                                        borderRadius: "10px",
                                        border: "none",
                                        backgroundColor: "#ff469e",
                                        color: "white",
                                        fontWeight: "bold",
                                        marginRight: "10px",
                                      }}>
                                      Đã nhận hàng
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                  <button
                                    onClick={() => handleOrderClick(order)}
                                    style={{
                                      width: "100px",
                                      height: "40px",
                                      borderRadius: "10px",
                                      border: "none",
                                      backgroundColor: "#ff469e",
                                      color: "white",
                                      fontWeight: "bold",
                                    }}>
                                    Chi tiết
                                  </button>
                                </div>
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
      <CustomDialog
        open={!!selectedOrder}
        onClose={handleClose}
        fullWidth
        maxWidth="sm">
        <CustomDialogTitle>Chi tiết đơn hàng</CustomDialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div>
              <p>
                <b>Mã đơn hàng:</b> {selectedOrder.orderId}
              </p>
              <p>
                <b>Địa chỉ giao hàng: </b>
                {selectedOrder.cusStreet +
                  ", " +
                  selectedOrder.cusWard +
                  ", " +
                  selectedOrder.cusDistrict +
                  ", " +
                  selectedOrder.cusCity}
              </p>
              <p>
                <b>Tổng số sản phẩm:</b> {selectedOrder.orderDetails.length}
              </p>
              <p>
                <b>Tình trạng:</b> {getStatusNotification(selectedOrder.status)}
              </p>
              <p>
                <b>Mã vận đơn:</b> {selectedOrder.trackingCode}
              </p>
              <p>
                <b>Phương thức thanh toán:</b>{" "}
                {getPayMentMethod(selectedOrder.status)}
              </p>
              <div>
                {selectedOrder.orderDetails.map((orderDetail) => (
                  <div
                    style={{ display: "flex", margin: "20px 0" }}
                    key={orderDetail.product.productId}>
                    <div className="popup-detail-left">
                      <img
                        src={`${instance.defaults.baseURL}/images/products/${orderDetail.product.productImages[0].imagePath}`}
                        alt={orderDetail.product.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                    <div className="popup-detail-right">
                      <Link
                        to={`${routes.products}/${orderDetail.product.name}`}
                        style={{ textDecoration: "none" }}>
                        <div style={{ fontWeight: "bold", color: "black" }}>
                          {orderDetail.product.name}
                        </div>
                      </Link>
                      <div>x {orderDetail.quantity}</div>
                      <div>{formatPrice(orderDetail.price)}đ</div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Tổng tiền hàng:</span>{" "}
                {formatPrice(selectedOrder.basePrice)}đ
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Phí vận chuyển:</span>
                {formatPrice(selectedOrder.shippingFee)}đ
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Giảm giá:</span> -{" "}
                {formatPrice(
                  selectedOrder.basePrice +
                    selectedOrder.shippingFee -
                    selectedOrder.postDiscountPrice
                )}
                đ
              </p>
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid #9fa0a0b0",
                  padding: "10px 0",
                }}>
                <span>
                  <b>Thành tiền:</b>{" "}
                </span>
                {formatPrice(selectedOrder.postDiscountPrice)}đ
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {/* <CustomButton onClick={() => handleCancelOrder(selectedOrder)}>
            Hủy đơn
          </CustomButton> */}
          <CustomButton onClick={handleClose}>Đóng</CustomButton>
        </DialogActions>
      </CustomDialog>
      {/* <CustomDialog
        open={isCancelDialogOpen}
        onClose={handleCloseCancelDialog}
        fullWidth
        maxWidth="xs">
        <CustomDialogTitle>Xác nhận hủy đơn hàng</CustomDialogTitle>
        <DialogContent>
          <span style={{ fontSize: "18px" }}>
            Bạn có chắc chắn muốn hủy đơn hàng này?
          </span>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleCloseCancelDialog} color="primary">
            Không
          </CustomButton>
          <CustomButton onClick={handleConfirmCancel} color="secondary">
            Có
          </CustomButton>
        </DialogActions>
      </CustomDialog> */}
    </div>
  );
}
