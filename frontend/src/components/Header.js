import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import { handleLogout } from "../services/auth/UsersService";
import DropdownMenu from "./DropdownMenu";
import Dropdown from "react-bootstrap/Dropdown";

export default function Header() {
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
        <div className="search-bar">
          <div style={{ display: "flex", width: "70%" }}>
            <input type="text" placeholder="Tìm kiếm sản phẩm..." />
            <div className="search-icon">
              <Link className="search">
                <img src="../assets/images/search_icon.png" alt="search logo" />
              </Link>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "30%",
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
