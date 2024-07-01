import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { formatPrice, products } from "../services/auth/UsersService";
import DropdownMenu from "./DropdownMenu";
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

export default function Header() {
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
    navigate(`${routes.searchProduct}?search_term=${searchTerm}`);
  };
  return (
    <>
      <header>
        {/* logo + store name to return home page */}
        <div className="store-name">
          <Link to={routes.homePage} style={{ color: "#ff469e" }}>
            Little Lovely
          </Link>
        </div>

        {/* search bar + button*/}
        <div className="search-bar" style={{ position: "relative" }}>
          <form onSubmit={handleSearchSubmit}>
            <div style={{ display: "flex", width: "70%" }}>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="search-icon">
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
              }}>
              <MenuList>
                {searchResults.slice(0, 5).map((result) => (
                  <MenuItem
                    key={result.productId}
                    component={Link}
                    to={`${routes.products}/${result.name}`}>
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
                    to={`${routes.searchProduct}?search_term=${searchTerm}`}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "50%",
            }}>
            {localStorage.getItem("token") ? (
              <DropdownMenu style={{ marginLeft: "10px" }} />
            ) : (
              <>
                <Dropdown>
                  <Link to={routes.login}>
                    <Dropdown.Toggle id="dropdown-basic">
                      <i class="fa-solid fa-user"></i>
                    </Dropdown.Toggle>
                  </Link>
                </Dropdown>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
