import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import instance from "../services/auth/customize-axios";
import { formatPrice, searchProducts } from "../services/auth/UsersService";
import DropdownMenu from "./DropdownMenu";
import debounce from "lodash/debounce";

export default function Header({ handleLogoutSuccess }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (term) {
        try {
          const response = await searchProducts({
            searchQuery: term,
            size: 5,
          });
          setSearchResults(response.products);
          setTotalPages(response.totalPages);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      } else {
        setSearchResults([]);
      }
    }, 200),
    []
  );

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  // Cleanup debounced function on component unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      return;
    }
    setSearchTerm("");
    setSearchResults([]);
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    navigate(`${routes.searchProduct}?search_term=${encodedSearchTerm}`);
  };
  return (
    <>
      <header>
        {/* logo + store name to return home page */}
        <div className="store-name">
          <Link to={routes.homePage} style={{ color: "#ff469e" }}>
            <img src="/assets/images/logo.png" alt="page logo" />
          </Link>
        </div>

        {/* search bar + button*/}
        <div className="search-bar" style={{ position: "relative" }}>
          <form
            onSubmit={handleSearchSubmit}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ display: "flex", width: "70%" }}>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="search-icon">
                <button type="submit">
                  <img src="/assets/images/search_icon.png" alt="search logo" />
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
                {searchResults.map((result) => (
                  <MenuItem
                    key={result.productId}
                    component={Link}
                    to={`${routes.products}/${result.productId}/${result.name}`}
                  >
                    <ListItemAvatar>
                      {result.productImages.slice(0, 1).map((image) => (
                        <Avatar
                          key={image.imageId}
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
                {totalPages > 1 && (
                  <MenuItem
                    component={Link}
                    to={`${routes.searchProduct}?search_term=${searchTerm}`}
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
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "50%",
            }}
          >
            {localStorage.getItem("token") ? (
              <DropdownMenu
                handleLogoutSuccess={handleLogoutSuccess}
                style={{ marginLeft: "10px" }}
              />
            ) : (
              <>
                <Dropdown>
                  <Link to={routes.login}>
                    <Dropdown.Toggle id="dropdown-basic">
                      <i className="fa-solid fa-user"></i>
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
