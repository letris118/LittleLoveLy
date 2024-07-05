import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { formatPrice, products } from "../services/auth/UsersService";
import StaffDropdownMenu from "./StaffDropdownMenu";
import Dropdown from "react-bootstrap/Dropdown";
import {
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import instance from "../services/auth/customize-axios";

export default function StaffHeader() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = async (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      try {
        const response = await products();
        const filteredResults = response.filter((product) =>
          product.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      return;
    }
    setSearchTerm("");
    setSearchResults([]);
    navigate(`${routes.staffSearchProduct}?search_term=${searchTerm}`);
  };
  return (
    <>
      <header className="manage-header">
        {/* logo + store name to return home page */}
        <div className="manage-store-name">
          <Link to={routes.homePage} style={{ color: "#ff469e" }}>
            <img src="../assets/images/logo02.png" alt="page logo" />
          </Link>
        </div>
        
    

        {(window.location.pathname === routes.staffHomePage ||
          window.location.pathname === routes.staffSearchProduct ||
          window.location.pathname === routes.staffBrandList ||
          window.location.pathname.startsWith(`${routes.staffBrandList}/`) ||
          window.location.pathname === routes.staffArticleList ||
          window.location.pathname.startsWith(`${routes.staffArticleList}/`) ||
          window.location.pathname === routes.staffProductList ||
          window.location.pathname.startsWith(
            `${routes.staffProductList}/`
          )) && (
            <div className="manage-search-bar" style={{ position: "relative" }}>
              <form onSubmit={handleSearchSubmit}>
                <div style={{ display: "flex", width: "100%" }}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <div className="manage-search-icon">
                    <button type="submit">
                      <img
                        src="../assets/images/search_icon.png"
                        alt="search logo"
                      />
                    </button>
                  </div>
                </div>
              </form>
              {searchTerm && searchResults.length > 0 && (
                <Paper
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    width: 600,
                  }}
                >
                  <MenuList>
                    {searchResults.slice(0, 5).map((result) => (
                      <MenuItem
                        key={result.productId}
                        component={Link}
                        to={`${routes.staffProductList}/${result.name}`}
                      >
                        <ListItemAvatar>
                          {result.productImages.slice(0, 1).map((image) => (
                            <Avatar
                              src={`${instance.defaults.baseURL}/images/products/${image.imagePath}`}
                            />
                          ))}
                        </ListItemAvatar>
                        <ListItemText
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          primary={result.name}
                          secondary={formatPrice(result.sellingPrice) + "đ"}
                        />
                      </MenuItem>
                    ))}
                    {searchResults.length > 5 && (
                      <MenuItem
                        component={Link}
                        to={`${routes.staffSearchProduct}?search_term=${searchTerm}`}
                      >
                        <ListItemText
                          primary={
                            <>
                              Xem tất cả &nbsp;
                              <i className="fa-solid fa-arrow-right"></i>
                            </>
                          }
                          style={{ textAlign: "right", fontWeight: "bold" }}
                        />
                      </MenuItem>
                    )}
                  </MenuList>
                </Paper>
              )}
            </div>
          )}
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
          }}
        >
          {localStorage.getItem("token") ? (
            <StaffDropdownMenu style={{ marginLeft: "10px" }} />
          ) : (
            <>
              <Dropdown className="staff-dropdown">
                <Link to={routes.login}>
                  <Dropdown.Toggle id="staff-dropdown-basic">
                    <i className="fa-solid fa-user"></i>
                  </Dropdown.Toggle>
                </Link>
              </Dropdown>
            </>
          )}
        </div>
      </header>
    </>
  );
}
