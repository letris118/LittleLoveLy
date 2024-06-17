import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import instance from "../services/auth/customize-axios";

export default function BrandListPresentation({ brands }) {
  return (
    <>
      {brands.map((brand) => (
        <div className="brand-card-list" id={brand.brandId}>
          <div className="brand-card-list-img">
            <img
              src={`${instance.defaults.baseURL}/images/brands/${brand.logo}`}
              alt={brand.name}
            />
          </div>
          <div className="brand-card-list-btn">
            <Link
              to={`${routes.brands}/${brand.name}`}
              className="brand-list-btn"
              style={{ textDecoration: "none" }}>
              {brand.name}
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
