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
              } else if (sortOrder === "newest") {
                return b.addedDate - a.addedDate;
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

  const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        backgroundColor: "#ff69b4",
        color: "white",
      },
    },
  });

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
    <div>
      <span>
        <p style={{ color: "#4b4a4a" }}>
          {currentItems.length > 0 ? (
            <i
              className="fa-solid fa-circle-check"
              style={{ color: "green" }}
            />
          ) : (
            <i className="fa-solid fa-circle-xmark" style={{ color: "red" }} />
          )}
          &nbsp; Kết quả tìm kiếm với từ khóa <b>'{searchTerm}'</b>
        </p>
      </span>
      <div className="filter-row">
        <div>
          <button
            style={{
              background:
                activeButton === "bestSeller"
                  ? "linear-gradient(90deg, rgba(255,0,132,1) 0%, rgba(255,99,132,1) 100%)"
                  : "",
              color: activeButton === "bestSeller" ? "white" : "",
            }}
            onClick={() => handleSort("bestSeller", "bestSeller")}
            disabled={currentItems.length === 0}>
            Bán chạy
          </button>
        </div>
        <div>
          <button
            style={{
              background:
                activeButton === "newest"
                  ? "linear-gradient(90deg, rgba(255,0,132,1) 0%, rgba(255,99,132,1) 100%)"
                  : "",
              color: activeButton === "newest" ? "white" : "",
            }}
            onClick={() => handleSort("newest", "newest")}
            disabled={currentItems.length === 0}>
            Hàng mới
          </button>
        </div>
        <div>
          <button
            style={{
              background:
                activeButton === "asc"
                  ? "linear-gradient(90deg, rgba(255,0,132,1) 0%, rgba(255,99,132,1) 100%)"
                  : "",
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
              background:
                activeButton === "desc"
                  ? "linear-gradient(90deg, rgba(255,0,132,1) 0%, rgba(255,99,132,1) 100%)"
                  : "",
              color: activeButton === "desc" ? "white" : "",
            }}
            onClick={() => handleSort("desc", "desc")}
            disabled={currentItems.length === 0}>
            Giá Cao - Thấp
          </button>
        </div>
      </div>

      <div className="search-product-container">
        {currentItems.length > 0 ? (
          <ProductPresentation products={currentItems} />
        ) : (
          <p
            style={{
              textAlign: "center",
              marginTop: "30px",
              fontSize: "20px",
            }}>
            Không tìm thấy sản phẩm
          </p>
        )}
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
  );
}
