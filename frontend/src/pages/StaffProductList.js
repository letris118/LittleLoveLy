import React, { useEffect, useState, useMemo } from "react";
import StaffHeader from "../components/StaffHeader";
import { products } from "../services/auth/UsersService";
import ProductPresentation from "../components/ProductPresentation";
import StaffSideBar from "../components/StaffSideBar";
import Footer from "../components/Footer";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";

export default function StaffProductList() {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await products();

        if (response) {
          const uniqueProducts = Array.from(
            new Set(response.map((product) => product.productId))
          ).map((id) => {
            return response.find((product) => product.productId === id);
          });
          if (sortOrder) {
            uniqueProducts.sort((a, b) => {
              if (sortOrder === "asc") {
                return a.sellingPrice - b.sellingPrice;
              } else if (sortOrder === "desc") {
                return b.sellingPrice - a.sellingPrice;
              } else if (sortOrder === "bestSeller") {
                return b.noSold - a.noSold;
              }
            });
          }
          setProductList(uniqueProducts);
        } else {
          setProductList([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductList([]);
      }
    };
    fetchProducts();
  }, [sortOrder]);

  const CustomPagination = styled(Pagination)(({ theme }) => ({
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        backgroundColor: "#ff69b4",
        color: "white",
      },
    },
  }));

  const totalPages = useMemo(
    () => Math.ceil(productList.length / itemsPerPage),
    [productList.length]
  );

  const currentItems = useMemo(
    () =>
      productList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [currentPage, productList]
  );

  const handleSort = (order, buttonName) => {
    setSortOrder(order);
    setActiveButton(buttonName);
    setCurrentPage(1);
  };

  return (
    <div>
      <StaffHeader />
      <div className="manage-content">
        <StaffSideBar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />

        <div className="manage-content-detail">
          <div className="manage-content-display ">
            <div className="filter-row">
              <div>
                <button
                  style={{
                    backgroundColor:
                      activeButton === "bestSeller" ? "#ff69b4" : "",
                    color: activeButton === "bestSeller" ? "white" : "",
                  }}
                  onClick={() => handleSort("bestSeller", "bestSeller")}
                  disabled={currentItems.length === 0}>
                  Bán chạy
                </button>
              </div>
              <div>
                <button
                  // style={{
                  //   backgroundColor: activeButton === "asc" ? "#ff69b4" : "",
                  //   color: activeButton === "asc" ? "white" : "",
                  // }}
                  // onClick={() => handleSort("asc", "asc")}
                  disabled={currentItems.length === 0}>
                  Hàng mới
                </button>
              </div>
              <div>
                <button
                  style={{
                    backgroundColor: activeButton === "asc" ? "#ff69b4" : "",
                    color: activeButton === "asc" ? "white" : "",
                  }}
                  onClick={() => handleSort("asc", "asc")}
                  disabled={currentItems.length === 0}>
                  Giá Thấp - Cao
                </button>
              </div>
              <div>
                <button
                  style={{
                    backgroundColor: activeButton === "desc" ? "#ff69b4" : "",
                    color: activeButton === "desc" ? "white" : "",
                  }}
                  onClick={() => handleSort("desc", "desc")}
                  disabled={currentItems.length === 0}>
                  Giá Cao - Thấp
                </button>
              </div>
            </div>
            <div className="manage-content-row-3">
              <div className="manage-row-1-top">
                <h4>Tất cả sản phẩm</h4>
              </div>

              <div className="manage-row-3-bottom">
                <ProductPresentation products={currentItems} />
              </div>

              <div
                className="manage-pagination-container"
                style={{ textAlign: "center" }}>
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
      </div>
      <Footer />
    </div>
  );
}
