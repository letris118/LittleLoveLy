import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import StaffDropdownMenu from "./StaffDropdownMenu";
import Dropdown from "react-bootstrap/Dropdown";

export default function AdminHeader() {
  return (
    <>
      <header className="manage-header">
        {/* logo + store name to return home page */}
        <div className="manage-store-name">
          <Link to={routes.statistics} style={{ color: "white" }}>
            Little Lovely
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
