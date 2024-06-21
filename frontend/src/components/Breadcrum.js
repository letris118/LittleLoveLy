import React from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes";

const Breadcrumb = ({ value, customName }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to={routes.homePage}>Trang Chủ</Link>
        </li>
        {pathnames.map((pathname, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={to} className="breadcrumb-item">
              {index === pathnames.length - 1 ? (
                <span>{value}</span>
              ) : (
                <Link to={to}>
                  {index === 0 && customName ? customName : pathname}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
