import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../assets/css/searchProduct.css";
import ProductPresentation from "./ProductPresentation";
import { products } from "../services/auth/UsersService";
import { Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import { routes } from "../routes";

export default function SearchPresentation() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search_term");
  const [searchProducts, setSearchProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const itemsPerPage = 40;

  useEffect(() => {
    const fetchProducts = async (searchTerm) => {
      try {
        let response = await products();
        if (response) {
          const filteredProducts = response.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          const uniqueProducts = Array.from(
            new Set(filteredProducts.map((product) => product.productId))
          ).map((id) => {
            return filteredProducts.find((product) => product.productId === id);
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
          setSearchProduct(uniqueProducts);
        } else {
          setSearchProduct([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setSearchProduct([]);
      }
    };

    fetchProducts(searchTerm);
  }, [searchTerm, sortOrder]);

  const CustomPagination = styled(Pagination)(({ theme }) => ({
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        backgroundColor: "#ff69b4",
        color: "white",
      },
    },
  }));

  const totalPages = useMemo(
    () => Math.ceil(searchProducts.length / itemsPerPage),
    [searchProducts.length]
  );

  const currentItems = useMemo(
    () =>
      searchProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [currentPage, searchProducts]
  );

  const handleSort = (order, buttonName) => {
    setSortOrder(order);
    setActiveButton(buttonName);
    setCurrentPage(1);
  };

  return (
    <>
      <div>
        <span>
          <p style={{ color: "#4b4a4a" }}>
            <i class="fa-solid fa-circle-check" style={{ color: "green" }} />{" "}
            &nbsp; Kết quả tìm kiếm với từ khóa <b>'{searchTerm}'</b>
          </p>
        </span>
        <div className="filter-row">
          <div>
            <button
              style={{
                backgroundColor: activeButton === "bestSeller" ? "#ff69b4" : "",
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

        <div className="search-product-container">
          <ProductPresentation products={currentItems} />
        </div>
        <div className="pagination-container" style={{ textAlign: "center" }}>
          <CustomPagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
          />
        </div>
      </div>
      {(window.location.pathname === routes.staffHomePage
        || window.location.pathname === routes.staffProductSearch
        || window.location.pathname === routes.staffBrandList
        || window.location.pathname.startsWith(`${routes.staffBrandList}/`)
        || window.location.pathname === routes.staffArticleList
        || window.location.pathname.startsWith(`${routes.staffArticleList}/`)
        || window.location.pathname === routes.staffProductList
        || window.location.pathname.startsWith(`${routes.staffProductList}/`)) && (
          <div>
            <span>
              <p style={{ color: "#4b4a4a" }}>
                <i class="fa-solid fa-circle-check" style={{ color: "green" }} />{" "}
                &nbsp; Kết quả tìm kiếm với từ khóa <b>'{searchTerm}'</b>
              </p>
            </span>
            <div className="manage-filter-row">
              <div>
                <button
                  style={{
                    backgroundColor: activeButton === "bestSeller" ? "#ff69b4" : "",
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

            <div className="manage-search-product-container">
              <ProductPresentation products={currentItems} />
            </div>
            <div className="pagination-container" style={{ textAlign: "center" }}>
              <CustomPagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                color="primary"
              />
            </div>
          </div>
        )}
    </>
  );
}
