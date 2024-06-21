import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";

export default function StaffHeader() {
  return (
    <div>
      <header className="staff-header">
        
        <div className="staff-store-name">
          <Link to={routes.homePage} style={{ color: 'white' }}>
            Little Lovely
          </Link>
        </div>

        
        
        {/* Search bar for manageProduct */}
        {window.location.pathname === routes.manageProduct && (
        <div className="staff-search-bar">
            <input type="text" placeholder="Tên sản phẩm..." />
            <div className="staff-search-icon">
              <Link className="staff-search">
                <img src="../assets/images/search_icon.png" alt="search logo" />
              </Link>
            </div>
          </div>
        )}

        {/* Search bar for manageOrder */}
        {window.location.pathname === routes.manageOrder && (
          <div className="staff-search-bar">
            <input type="text" placeholder="Mã vận đơn hoặc Tên người nhận..." />
            <div className="staff-search-icon">
              <Link className="staff-search">
                <img src="../assets/images/search_icon.png" alt="search logo" />
              </Link>
            </div>
          </div>
        )}

        {/* Search bar for manageArticle */}
        {window.location.pathname === routes.manageArticle && (
          <div className="staff-search-bar">
            <input type="text" placeholder="Tên bài viết..." />
            <div className="staff-search-icon">
              <Link className="staff-search">
                <img src="../assets/images/search_icon.png" alt="search logo" />
              </Link>
            </div>
          </div>
        )}

        {/* Search bar for manageVoucher */}
        {window.location.pathname === routes.manageVoucher && (
        <div className="staff-search-bar">
            <input type="text" placeholder="Tên voucher..." />
            <div className="staff-search-icon">
              <Link className="staff-search">
                <img src="../assets/images/search_icon.png" alt="search logo" />
              </Link>
            </div>
          </div>
        )}
                      
      </header>
    </div>
  );
}