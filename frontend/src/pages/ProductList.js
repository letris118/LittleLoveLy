import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import {
  categories,
  getProductByCategory,
  products,
} from "../services/auth/UsersService";
import ProductPresentation from "../components/ProductPresentation";
import Sidebar from "../components/SideBar";
import Breadcrumb from "../components/Breadcrum";
import Footer from "../components/Footer";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import {
  Checkbox,
  MenuItem,
  Select,
  FormControl,
  ListItemText,
} from "@mui/material";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [categories, setCategories] = useState([]);
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
              } else if (sortOrder === "newest") {
                return new Date(b.addedDate) - new Date(a.addedDate);
              }
            });
          }

          const filteredProducts = uniqueProducts.filter(
            (product) =>
              selectedFilters.length === 0 ||
              product.categories.some((category) =>
                selectedFilters.includes(category.categoryId)
              )
          );

          setProductList(filteredProducts);
        } else {
          setProductList([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductList([]);
      }
    };
    fetchProducts();
  }, [sortOrder, selectedFilters]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        let response = await categories();
        console.log("Categories:", response);
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategoriesData();
  }, []);

  const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        backgroundColor: "#ff69b4",
        color: "white",
      },
    },
  });

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

  const categoryOptions = useMemo(() => {
    const categories = productList.flatMap((product) => product.categories);
    return Array.from(
      new Set(categories.map((category) => category.categoryId))
    )
      .map((categoryId) =>
        categories.find((category) => category.categoryId === categoryId)
      )
      .filter(Boolean);
  }, [productList]);
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 7 + 8,
        width: "50%",
      },
    },
  };

  const handleCategoryChange = async (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFilters(typeof value === "string" ? value.split(",") : value);

    try {
      const response = await getProductByCategory(
        value.length > 0 ? value : []
      );
      const fetchedProducts = response.data || [];

      const uniqueProducts = Array.from(
        new Set(fetchedProducts.map((product) => product.productId))
      ).map((id) => {
        return fetchedProducts.find((product) => product.productId === id);
      });

      setProductList(uniqueProducts);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      setProductList([]);
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
              <div className="dropdown-category">
                <FormControl>
                  <Select
                    multiple
                    displayEmpty
                    value={selectedFilters}
                    onChange={handleCategoryChange}
                    renderValue={(selected) => {
                      if (selected.length === 0 || selected.length > 0) {
                        return <em>Bộ lọc tìm kiếm</em>;
                      }
                    }}
                    MenuProps={MenuProps}>
                    {categoryOptions.map((category) => (
                      <MenuItem
                        key={category.categoryId}
                        value={category.categoryId}>
                        <Checkbox
                          checked={
                            selectedFilters.indexOf(category.categoryId) > -1
                          }
                        />
                        <ListItemText primary={category.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="content-row-3">
              <div className="row-top">
                <h4>Tất cả sản phẩm</h4>
              </div>

              <div className="row-3-bottom">
                <ProductPresentation products={currentItems} />
              </div>

              <div
                className="pagination-container"
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
