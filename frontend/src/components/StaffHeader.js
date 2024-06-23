import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import DropdownMenu from "./DropdownMenu";
import Dropdown from "react-bootstrap/Dropdown";

export default function Header() {
  return (
    <>
      <header className="manage-header">
        {/* logo + store name to return home page */}
        <div className="manage-store-name">
          <Link to={routes.staffHomePage} style={{ color: "white" }}>
            Little Lovely
          </Link>
        </div>

          {window.location.pathname === routes.staffHomePage && (
            <div className="manage-search-bar">
                <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                <div className="manage-search-icon">
                  <Link className="manage-search">
                    <img src="../assets/images/search_icon.png" alt="search logo" />
                  </Link>
                </div>
            </div>
          )}

          {window.location.pathname === routes.manageProduct && (
            <div className="manage-search-bar">
                <input type="text" placeholder="Tên sản phẩm..." />
                <div className="manage-search-icon">
                  <Link className="manage-search">
                    <img src="../assets/images/search_icon.png" alt="search logo" />
                  </Link>
                </div>
            </div>
          )}

          {window.location.pathname === routes.manageOrder && (
            <div className="manage-search-bar">
                <input type="text" placeholder="Số điện thoại đặt hàng..." />
                <div className="manage-search-icon">
                  <Link className="manage-search">
                    <img src="../assets/images/search_icon.png" alt="search logo" />
                  </Link>
                </div>
            </div>
          )}

          {window.location.pathname === routes.manageArticle && (
            <div className="manage-search-bar">
              <input type="text" placeholder="Tên bài báo..." />
                <div className="manage-search-icon">
                  <Link className="manage-search">
                    <img src="../assets/images/search_icon.png" alt="search logo" />
                  </Link>
                </div>  
            </div>
          )}

          {window.location.pathname === routes.manageVoucher && (
            <div className="manage-search-bar">
                <input type="text" placeholder="Tên voucher..." />
                <div className="manage-search-icon">
                  <Link className="manage-search">
                    <img src="../assets/images/search_icon.png" alt="search logo" />
                  </Link>
                </div>
            </div>
          )}

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
                    <Dropdown.Toggle id="manage-dropdown-basic">
                      <i class="fa-solid fa-user"></i>
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
