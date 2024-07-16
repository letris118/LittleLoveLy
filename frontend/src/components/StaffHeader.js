import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import instance from "../services/auth/customize-axios";
import { formatPrice, products } from "../services/auth/UsersService";
import StaffDropdownMenu from "./StaffDropdownMenu";

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
          <Link to={routes.manageOrder} style={{ color: "#ff469e" }}>
            <img src="../assets/images/logo02.png" alt="page logo" />
          </Link>
        </div>
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
