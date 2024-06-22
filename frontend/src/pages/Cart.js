import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import "../assets/css/cart.css";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Table } from "@mui/material";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { formatPrice } from "../services/auth/UsersService";
import instance from "../services/auth/customize-axios";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleQuantityChange = (index, value) => {
    const updatedCartItems = [...cartItems];
    if (value > 0 && value <= 50) {
      updatedCartItems[index].quantity = value;
    }
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("username")}
          customerPoint={localStorage.getItem("point")}
        />
        <div className="content-detail">
          <div className="content-cart-display">
            <div className="content-cart-col-left">
              <h4>Giỏ hàng</h4>
              <div className="content-cart-col-left-description">
                <span style={{ marginRight: "15px" }}>Đơn giá </span>
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
                      }}>
                      <TableCell sx={{ width: "15%" }}>
                        <img
                          src={`${instance.defaults.baseURL}/images/products/${item.productImages[0].imagePath}`}
                          alt={item.name}
                          style={{ width: "100%" }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: "50%" }}>{item.name}</TableCell>
                      <TableCell
                        sx={{
                          width: "18%",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}>
                        {formatPrice(item.sellingPrice)}đ
                      </TableCell>
                      <TableCell sx={{ width: "15%" }}>
                        <Box
                          className="product-detail-quantity"
                          display="flex"
                          alignItems="center"
                          m={1}
                          marginLeft={7}>
                          <button
                            onClick={() =>
                              handleQuantityChange(index, item.quantity - 1)
                            }
                            disabled={item.quantity === 1}>
                            -
                          </button>
                          <span
                            style={{
                              margin: "0 10px",
                              width: "30px",
                              textAlign: "center",
                            }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(index, item.quantity + 1)
                            }
                            disabled={item.quantity === 50}>
                            +
                          </button>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "17%",
                          textAlign: "right",
                          fontWeight: "bold",
                        }}>
                        {formatPrice(item.sellingPrice * item.quantity)}đ
                      </TableCell>
                      <TableCell sx={{ width: "5%" }}>
                        <Link onClick={() => handleRemoveItem(index)}>
                          <i
                            className="fa-regular fa-trash-can"
                            style={{ color: "grey" }}></i>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </Table>
              </div>
            </div>
            <div className="content-cart-col-right">Chọn địa và nút</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
