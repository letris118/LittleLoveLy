import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import Switch from "react-switch";
import instance from "../services/auth/customize-axios";
import {
  productsAll,
  deactivateProduct,
  activateProduct,
} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/manage.css";
import { Button } from "react-bootstrap";

export default function ManageProduct() {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSortBy, setActiveSortBy] = useState(null);
  const [activeSortOrder, setActiveSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate("/");
      }
    };
    checkAuthentication();

    const fetchProducts = async () => {
      try {
        let response = await productsAll();
        if (response) {
          let sortedProducts = response.slice(0, 110);
          setProductList(sortedProducts);
          setFilteredProducts(sortedProducts); // Initialize filtered list with all products
        } else {
          setProductList([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Không thể tải sản phẩm");
        setProductList([]);
        setFilteredProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const sortProducts = (field) => {
    let sortedProducts = [...filteredProducts];
    if (field === "active") {
      sortedProducts.sort((a, b) =>
        a.active === b.active ? 0 : a.active ? -1 : 1
      );
    } else {
      sortedProducts.sort((a, b) => {
        if (field === "name") {
          return a.name.localeCompare(b.name);
        } else if (field === "stock") {
          return a.stock - b.stock;
        } else if (field === "sellingPrice") {
          return a.sellingPrice - b.sellingPrice;
        }
        return 0;
      });
    }
    if (field === "active" && activeSortOrder === "desc") {
      sortedProducts.reverse();
    } else if (sortOrder === "desc") {
      sortedProducts.reverse();
    }
    setFilteredProducts(sortedProducts);
  };

  const handleActiveSort = () => {
    if (activeSortBy === "active") {
      setActiveSortOrder(activeSortOrder === "asc" ? "desc" : "asc");
    } else {
      setActiveSortBy("active");
      setActiveSortOrder("asc");
    }
    sortProducts("active");
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    sortProducts(field);
  };

  const handleToggle = async (productId, currentStatus) => {
    try {
      if (currentStatus) {
        await deactivateProduct(productId);
      } else {
        await activateProduct(productId);
      }
      setFilteredProducts((prevState) =>
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
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = productList.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

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
              <button className="table-search-icon">
                <img src="../assets/images/search_icon.png" alt="search logo" />
              </button>
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
                  onClick={() => handleSort("name")}>
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
                  onClick={() => handleSort("stock")}>
                  Tồn kho
                  {sortBy === "stock" && (
                    <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </th>
                <th
                  className="sellingPrice-head"
                  style={{ width: "10%" }}
                  onClick={() => handleSort("sellingPrice")}>
                  Giá bán
                  {sortBy === "sellingPrice" && (
                    <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </th>
                <th
                  className="active-head"
                  style={{ width: "9%" }}
                  onClick={handleActiveSort}>
                  Trạng thái
                  {activeSortBy === "active" && (
                    <span>{activeSortOrder === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </th>
                <th className="update-head" style={{ width: "9%" }}>
                  Chỉnh sửa
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.productId}>
                  <td className="index-body">{index + 1}</td>
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
                  <td className="sellingPrice-body">{product.sellingPrice}</td>
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
                      className="update-link">
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
