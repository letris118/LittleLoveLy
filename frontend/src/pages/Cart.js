import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import "../assets/css/cart.css";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Table, styled } from "@mui/material";
import { Link, useNavigate, useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  formatPrice,
  removeItemCard,
  updateCart,
} from "../services/auth/UsersService";
import instance from "../services/auth/customize-axios";
import { routes } from "../routes";
import { toast } from "react-toastify";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [giftItems, setGiftItems] = useState([]);
  const [hasCart, setHasCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    const gifts = localStorage.getItem("gifts");

    const storedCartItems = JSON.parse(cart) || [];
    setCartItems(storedCartItems);

    const storedGiftItems = JSON.parse(gifts) || [];
    setGiftItems(storedGiftItems);

    setHasCart(!!cart || !!gifts);
  }, []);

  const handleRemoveItem = useCallback((index) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems[index];
      const { productId, quantity } = itemToRemove;
      if (localStorage.getItem("userRole") === "ROLE_CUSTOMER") {
        removeItemCard(productId, "product", quantity).catch((error) => {
          console.error("Error removing item from cart:", error);
        });
      }
      const updatedCartItems = prevItems.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  }, []);

  const handleQuantityChange = useCallback((index, value) => {
    setCartItems((prevItems) => {
      const updatedCartItems = [...prevItems];
      if (value > 0 && value <= 50) {
        updatedCartItems[index].quantity = value;
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
        if (localStorage.getItem("userRole") === "ROLE_CUSTOMER") {
          updateCart(updatedCartItems[index].productId, "product", value).catch(
            (error) => {
              console.error("Error updating cart item:", error);
            }
          );
        }
      }
      return updatedCartItems;
    });
  }, []);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Mời bạn mua 1 sản phẩm để nhận thưởng !", {
        autoClose: 2000,
      });
    } else {
      navigate(routes.checkout);
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
          <div className="content-cart-display">
            <div className="content-cart-col-left">
              <h4>Giỏ hàng</h4>
              <div className="content-cart-col-left-description">
                <span>Đơn giá </span>
                <span>Số lượng </span>
                <span>Thành tiền </span>
              </div>
              <div className="content-cart-col-left-tbl">
                <Table>
                  {cartItems.map((item, index) => (
                    <TableRow
                      key={item.productId}
                      sx={{
                        borderCollapse: "collapse",
                        height: "100px",
                        padding: "20px",
                      }}
                    >
                      <TableCell sx={{ width: "15%" }}>
                        <img
                          src={`${instance.defaults.baseURL}/images/products/${item.productImages[0].imagePath}`}
                          alt={item.name}
                          style={{ width: "100%" }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: "50%" }}>
                        <Link
                          to={`/products/${item.name}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {item.name}
                        </Link>
                      </TableCell>
                      {item.sellingPrice === item.listedPrice ? (
                        <TableCell
                          sx={{
                            width: "18%",
                          }}
                        >
                          <div
                            style={{
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            {formatPrice(item.sellingPrice)}đ
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell
                          sx={{
                            width: "18%",
                          }}
                        >
                          <div
                            style={{
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            {formatPrice(item.sellingPrice)}đ
                          </div>
                          <div
                            style={{
                              textAlign: "center",
                              textDecoration: "line-through",
                              fontSize: "10px",
                            }}
                          >
                            {formatPrice(item.listedPrice)}đ
                          </div>
                        </TableCell>
                      )}

                      <TableCell sx={{ width: "15%" }}>
                        <Box
                          className="product-detail-quantity"
                          display="flex"
                          alignItems="center"
                          m={1}
                          marginLeft={7}
                        >
                          <button
                            onClick={() =>
                              handleQuantityChange(index, item.quantity - 1)
                            }
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          <span
                            style={{
                              margin: "0 10px",
                              width: "30px",
                              textAlign: "center",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(index, item.quantity + 1)
                            }
                            disabled={item.quantity === 50}
                          >
                            {}+
                          </button>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "17%",
                          textAlign: "right",
                          fontWeight: "bold",
                        }}
                      >
                        {formatPrice(item.sellingPrice * item.quantity)}đ
                      </TableCell>
                      <TableCell sx={{ width: "5%" }}>
                        <Link onClick={() => handleRemoveItem(index)}>
                          <i
                            className="fa-regular fa-trash-can"
                            style={{ color: "grey" }}
                          ></i>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* hiện quà */}
                  {giftItems.map((item) => (
                    <TableRow
                      key={item.giftId}
                      sx={{
                        borderCollapse: "collapse",
                        height: "100px",
                        padding: "20px",
                      }}
                    >
                      <TableCell sx={{ width: "15%" }}>
                        <img
                          src={`${instance.defaults.baseURL}/images/gifts/${item.imagePath}`}
                          alt={item.name}
                          style={{ width: "100%" }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: "50%" }}>
                        <span
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {item.name}
                        </span>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "18%",
                        }}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {""}
                        </div>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "15%",
                          textAlign: "center",
                          paddingRight: 4,
                        }}
                      >
                        <span>1</span>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "17%",
                          textAlign: "right",
                          fontWeight: "bold",
                        }}
                      >
                        0đ
                      </TableCell>
                      <TableCell sx={{ width: "5%" }}>{""}</TableCell>
                    </TableRow>
                  ))}
                </Table>
              </div>
            </div>
            <div className="content-cart-col-right">
              <div className="content-cart-col-right-total-price">
                <div style={{ fontSize: "15px" }}>Tính tạm: </div>
                <div style={{ fontSize: "15px" }}>
                  {formatPrice(
                    cartItems.reduce(
                      (total, item) => total + item.listedPrice * item.quantity,
                      0
                    )
                  )}
                  đ
                </div>
              </div>
              <div
                className="content-cart-col-right-reduce-price"
                style={{
                  borderBottom: "1px solid grey",
                  paddingBottom: "10px",
                }}
              >
                <div style={{ fontSize: "15px" }}>Giảm giá sản phẩm: </div>
                <div style={{ fontSize: "15px", color: "#FF469E" }}>
                  -
                  {formatPrice(
                    cartItems.reduce(
                      (total, item) =>
                        total +
                        (item.listedPrice - item.sellingPrice) * item.quantity,
                      0
                    )
                  )}
                  đ
                </div>
              </div>
              <div className="content-cart-col-right-final-price">
                <div style={{ fontSize: "15px" }}>
                  <b>Tổng tiền:</b>{" "}
                </div>
                <div style={{ fontSize: "15px", color: "black" }}>
                  {formatPrice(
                    cartItems.reduce(
                      (total, item) =>
                        total + item.sellingPrice * item.quantity,
                      0
                    )
                  )}
                  đ
                </div>
              </div>
              <div className="content-cart-col-right-button">
                {hasCart ? (
                  <button component={Link} onClick={handleCheckout}>
                    Tiếp tục
                  </button>
                ) : (
                  <button disabled>Tiếp tục</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
