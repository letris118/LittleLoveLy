import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";

export default function Header() {
  return (
    <div>
      <header>
        {/* logo + store name to return home page */}
        <div className="store-name">
          <Link to={routes.HomePage} style={{ color: "#ff469e" }}>
            Little Lovely
          </Link>
        </div>

        {/* search bar + button*/}
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm sản phẩm..." />
          <div className="search-icon">
            <Link className="search">
              <img src="../assets/images/search_icon.png" alt="search logo" />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
