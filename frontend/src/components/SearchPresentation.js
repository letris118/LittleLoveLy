import { Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../assets/css/searchProduct.css";
import { searchProducts } from "../services/auth/UsersService";
import ProductPresentation from "./ProductPresentation";
import CircularProgress from "@mui/material/CircularProgress";

export default function SearchPresentation() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search_term");
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 40;

  useEffect(() => {
    const fetchProducts = async (searchTerm) => {
      setLoading(true);
      try {
        let response;
        const params = {
          searchQuery: searchTerm,
          page: currentPage - 1,
          size: itemsPerPage,
          sortBy: sortOrder ? getSortField(sortOrder) : undefined,
          direction: sortOrder ? getSortDirection(sortOrder) : undefined,
        };
        response = await searchProducts(params);
        if (response) {
          setProductList(response.products);
          setTotalPages(response.totalPages);
        } else {
          setProductList([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductList([]);
      }
      setLoading(false);
    };

    fetchProducts(searchTerm);
  }, [searchTerm, sortOrder, currentPage]);

  const getSortField = (order) => {
    switch (order) {
      case "asc":
      case "desc":
        return "sellingPrice";
      case "bestSeller":
        return "noSold";
      case "newest":
        return "addedDate";
      default:
        return undefined;
    }
  };

  const getSortDirection = (order) => {
    switch (order) {
      case "asc":
        return "asc";
      case "desc":
        return "desc";
      case "bestSeller":
      case "newest":
        return "desc";
      default:
        return undefined;
    }
  };

  const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        backgroundColor: "#ff69b4",
        color: "white",
      },
    },
  });

  const handleSort = (order, buttonName) => {
    setSortOrder(order);
    setActiveButton(buttonName);
    setCurrentPage(1);
  };

  return (
    <div>
      <span>
        <p style={{ color: "#4b4a4a" }}>
          {productList.length > 0 ? (
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
            disabled={productList.length === 0 || loading}
          >
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
            disabled={productList.length === 0 || loading}
          >
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
            disabled={productList.length === 0 || loading}
          >
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
            disabled={productList.length === 0 || loading}
          >
            Giá Cao - Thấp
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress style={{ color: "rgba(255,0,132,1)" }} />
        </div>
      ) : (
        <div className="search-product-container">
          {productList.length > 0 ? (
            <ProductPresentation products={productList} />
          ) : (
            <p
              style={{
                textAlign: "center",
                marginTop: "30px",
                fontSize: "20px",
              }}
            >
              Không tìm thấy sản phẩm
            </p>
          )}
        </div>
      )}
      <div className="pagination-container" style={{ textAlign: "center" }}>
        <CustomPagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          color="primary"
          disabled={loading}
        />
      </div>
    </div>
  );
}
