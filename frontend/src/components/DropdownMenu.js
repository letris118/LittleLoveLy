import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { CSSTransition } from "react-transition-group";
import "../assets/css/dropdown.css";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../services/auth/UsersService";
import { routes } from "../routes";

export default function DropdownMenu({ handleLogoutSuccess }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <Dropdown
      onToggle={() => setShowMenu((prevShowMenu) => !prevShowMenu)}
      show={showMenu}>
      <Dropdown.Toggle id="dropdown-basic">
        <i className="fa-solid fa-user"></i>
      </Dropdown.Toggle>

      <CSSTransition
        in={showMenu}
        timeout={300}
        classNames="dropdown-menu"
        unmountOnExit>
        <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item>
            <Link
              to={routes.profileCustomer}
              style={{
                textDecoration: "none",
                width: "inherit",
                color: "black",
              }}>
              Tài khoản
            </Link>
          </Dropdown.Item>

          <Link
            onClick={handleLogout(navigate, handleLogoutSuccess)}
            style={{
              textDecoration: "none",
              color: "black",
            }}>
            <Dropdown.Item>Đăng xuất</Dropdown.Item>
          </Link>
        </Dropdown.Menu>
      </CSSTransition>
    </Dropdown>
  );
}
