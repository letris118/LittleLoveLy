import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { products } from "../services/auth/UsersService";
import ProductPresentation from "../components/ProductPresentation";
import Sidebar from "../components/SideBar";
import Breadcrumb from "../components/Breadcrum";
import Footer from "../components/Footer";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const itemsPerPage = 50;

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "ROLE_STAFF" || userRole === "ROLE_ADMIN") {
        navigate("/");
      }
    };
    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response;
        const params = {
          page: currentPage - 1,
          size: itemsPerPage,
          sortBy: sortOrder ? getSortField(sortOrder) : undefined,
          direction: sortOrder ? getSortDirection(sortOrder) : undefined,
        };
        response = await products(params);
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

    fetchProducts();
  }, [sortOrder, currentPage]);

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
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />

        <div className="content-detail">
          <Breadcrumb value="Tất cả sản phẩm" />
          <div className="content-display ">
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                >
                  Giá Cao - Thấp
                </button>
              </div>
            </div>
            <div className="content-row-3">
              <div className="row-top">
                <h4>Tất cả sản phẩm</h4>
              </div>

              <div className="row-3-bottom">
                {loading ? (
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <CircularProgress style={{ color: "rgba(255,0,132,1)" }} />
                  </div>
                ) : (
                  <ProductPresentation products={productList} />
                )}
              </div>

              <div
                className="pagination-container"
                style={{ textAlign: "center" }}
              >
                <CustomPagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPage(page)}
                  color="primary"
                  disabled={loading}
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
