import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { toast } from "react-toastify";
import Switch from "react-switch";
import instance from "../services/auth/customize-axios";
import {
  productsAll,
  searchAllProducts,
  deactivateProduct,
  activateProduct,
} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/manage.css";
import StaffBackToTop from "../components/StaffBackToTop";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "lodash/debounce";

export default function ManageProduct() {
  const [productList, setProductList] = useState([]);
  const [sortBy, setSortBy] = useState("productId");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [finalSearchQuery, setFinalSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 20;

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate("/");
      }
    };
    checkAuthentication();
  }, [navigate]);

  const debouncedSetFinalQuery = useCallback(
    debounce((query) => {
      setFinalSearchQuery(query);
      setCurrentPage(1);
    }, 150),
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      console.time("Fetch Products Time");
      try {
        let params = {
          page: currentPage - 1,
          size: productsPerPage,
          sortBy: sortBy,
          direction: sortOrder,
        };
        let response;
        if (finalSearchQuery !== "") {
          params.searchQuery = finalSearchQuery;
          response = await searchAllProducts(params);
        } else {
          response = await productsAll(params);
        }
        if (response) {
          const validProducts = response.products.filter(
            (product) =>
              product.name &&
              product.stock !== null &&
              product.sellingPrice !== null &&
              product.productImages &&
              product.productImages.length > 0 &&
              product.brand &&
              product.brand.logo
          );
          setProductList(validProducts);
          setTotalPages(response.totalPages);
        } else {
          setProductList([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Không thể tải sản phẩm");
        setProductList([]);
      }
      console.timeEnd("Fetch Products Time");
      setLoading(false);
    };

    fetchProducts();
    // Cleanup function to cancel any pending debounce
    return () => {
      debouncedSetFinalQuery.cancel();
    };
  }, [
    currentPage,
    sortBy,
    sortOrder,
    finalSearchQuery,
    debouncedSetFinalQuery,
  ]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleToggle = async (productId, currentStatus) => {
    try {
      if (currentStatus) {
        await deactivateProduct(productId);
      } else {
        await activateProduct(productId);
      }
      setProductList((prevState) =>
        prevState.map((product) =>
          product.productId === productId
            ? { ...product, active: !product.active }
            : product
        )
      );
    } catch (error) {
      console.error("Error toggling product status:", error);
      toast.error("Không thể cập nhật trạng thái sản phẩm");
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    debouncedSetFinalQuery(event.target.value.toLowerCase());
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  return (
    <div>
      <StaffHeader />

      <div className="manage-content">
        <StaffSideBar />

        <div className="manage-content-detail">
          <div className="search-add-table">
            <div className="table-search-bar">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <div className="add-product-btn">
              <Link to={routes.addProduct} className="add-product-link">
                Thêm sản phẩm mới
              </Link>
            </div>
          </div>

          <table className="manage-table">
            <thead>
              <tr>
                <th className="index-head" style={{ width: "5%" }}>
                  STT
                </th>
                <th
                  className="name-head"
                  style={{ width: "20%" }}
                  onClick={() => !loading && handleSort("name")}
                >
                  Tên sản phẩm
                  {sortBy === "name" && (
                    <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </th>
                <th className="img-head" style={{ width: "15%" }}>
                  Hình ảnh
                </th>
                <th className="brand-head" style={{ width: "10%" }}>
                  Thương hiệu
                </th>
                <th
                  className="stock-head"
                  style={{ width: "8%" }}
                  onClick={() => !loading && handleSort("stock")}
                >
                  Tồn kho
                  {sortBy === "stock" && (
                    <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </th>
                <th
                  className="sellingPrice-head"
                  style={{ width: "10%" }}
                  onClick={() => !loading && handleSort("sellingPrice")}
                >
                  Giá bán
                  {sortBy === "sellingPrice" && (
                    <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </th>
                <th
                  className="active-head"
                  style={{ width: "9%" }}
                  onClick={() => !loading && handleSort("active")}
                >
                  Trạng thái
                  {sortBy === "active" && (
                    <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </th>

                <th className="update-head" style={{ width: "9%" }}>
                  Chỉnh sửa
                </th>
                <th className="lastModified-head" style={{ width: "9%" }}>
                  Lần cuối chỉnh sửa
                </th>
              </tr>
            </thead>

            {loading ? (
              <tbody>
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    <CircularProgress color="inherit" />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {productList.length > 0 ? (
                  productList.map((product, index) => (
                    <tr key={product.productId}>
                      <td className="index-body">
                        {indexOfFirstProduct + index + 1}
                      </td>
                      <td className="name-body">{product.name}</td>
                      <td className="img-body">
                        {product.productImages.slice(0, 1).map((image) => (
                          <img
                            key={image.imageId}
                            src={`${instance.defaults.baseURL}/images/products/${image.imagePath}`}
                            alt={product.name}
                            style={{ width: "30%", height: "30%" }}
                          />
                        ))}
                      </td>

                      <td className="brand-body">
                        <img
                          src={`${instance.defaults.baseURL}/images/brands/${product.brand.logo}`}
                          alt={product.brand.name}
                          style={{ width: "50%", height: "50%" }}
                        />
                      </td>

                      <td className="stock-body">{product.stock}</td>
                      <td className="sellingPrice-body">
                        {product.sellingPrice}
                      </td>
                      <td className="active-body">
                        <Switch
                          onChange={() =>
                            handleToggle(product.productId, product.active)
                          }
                          checked={product.active}
                          offColor="#ff0000"
                          onColor="#27ae60"
                        />
                      </td>

                      <td className="update-body">
                        <Link
                          to={`${routes.updateProduct}/${product.name}?id=${product.productId}`}
                          className="update-link"
                        >
                          Chi tiết
                        </Link>
                      </td>
                      <td className="lastModified-body">
                        {product.lastModifiedDate}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      Không có sản phẩm nào phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>

          {/* Pagination */}
          <div className="manage-pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
                disabled={loading}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <StaffBackToTop />
    </div>
  );
}
