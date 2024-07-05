import React, { useEffect, useMemo, useState } from "react";
import { brands, getProductByBrandId } from "../services/auth/UsersService";
import { useParams } from "react-router-dom";
import instance from "../services/auth/customize-axios";
import { Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import ProductPresentation from "./ProductPresentation";

export default function BrandDetailPresentation() {
  const [brandInfo, setBrandInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const itemsPerPage = 30;
  const { name: brandName } = useParams();

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        let response = await brands();
        const brand = response.find((brand) => brand.name === brandName);

        if (brand) {
          setBrandInfo(brand);
        } else {
          setBrandInfo({});
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrandInfo({});
      }
    };

    fetchBrand();
  }, [brandName]);

  useEffect(() => {
    const fetchProductByBrandID = async () => {
      if (!brandInfo.brandId) return;

      try {
        const response = await getProductByBrandId(brandInfo.brandId);
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
              } else if (sortOrder === "newest") {
                return new Date(b.addedDate) - new Date(a.addedDate);
              }
            });
          }
          setProducts(uniqueProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProductByBrandID();
  }, [brandInfo, sortOrder]);

  const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        backgroundColor: "#ff69b4",
        color: "white",
      },
    },
  });

  const totalPages = useMemo(
    () => Math.ceil(products.length / itemsPerPage),
    [products.length]
  );

  const currentItems = useMemo(
    () =>
      products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [currentPage, products]
  );

  const handleSort = (order, buttonName) => {
    setSortOrder(order);
    setActiveButton(buttonName);
    setCurrentPage(1);
  };
  return (
    <div>
      <div
        className="brand-row-1"
        style={{ minWidth: "1000px", display: "flex", alignItems: "center" }}>
        <div className="brand-row-1-left">
          <div className="row-1-left">
            <div className="row-1-left-content">
              <div
                className="row-1-left-background"
                style={{
                  backgroundImage: `url(${instance.defaults.baseURL}/images/brands/${brandInfo.logo})`,
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "rgba(0, 0, 0, 0.306)",
                  width: "100%",
                  height: "100%",
                  padding: "20px 20px",
                  borderRadius: "20px",
                }}>
                <div
                  className="row-1-left-img"
                  style={{
                    backgroundImage: `url(${instance.defaults.baseURL}/images/brands/${brandInfo.logo})`,
                  }}></div>
                <div className="row-1-left-text" style={{ zIndex: "1" }}>
                  <span
                    style={{
                      fontSize: "30px",
                      color: "white",
                      fontFamily: "MuseoModerno",
                      fontWeight: "bold",
                    }}>
                    {brandInfo.name}
                  </span>
                  <div
                    style={{
                      color: "white",
                      backgroundColor: "#F2DFE6",
                      gap: "20px",
                      padding: "2px 10px",
                      borderRadius: "20px",
                      fontSize: "15px",
                      margin: "0 30px",
                      display: "flex",
                      alignItems: "center",
                      border: "3px solid #FF379B",
                    }}>
                    <i
                      class="fa-solid fa-circle-check"
                      style={{
                        color: "#FF379B",
                        fontSize: "20px",
                      }}></i>{" "}
                    <span style={{ color: "#FF379B", fontWeight: "bold" }}>
                      Chính hãng
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="brand-row-1-right">
          <div className="row-1-right">
            <span>
              <i class="fa-solid fa-check" style={{ color: "green" }}></i> 100%
              chất lượng
            </span>
            <span>
              <i class="fa-solid fa-check" style={{ color: "green" }}></i> Phân
              phối chính hãng
            </span>
          </div>
        </div>
      </div>
      <div
        className="brand-row-2"
        style={{ minWidth: "1000px", marginTop: "20px" }}>
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
      </div>
      <div
        className="brand-row-3"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "white",
          minWidth: "1000px",
          borderRadius: "20px",
          marginTop: "20px",
          minHeight: "500px",
        }}>
        <div>
          <ProductPresentation products={currentItems} />
        </div>
        <div className="pagination-container" style={{ padding: "20px" }}>
          <CustomPagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}
