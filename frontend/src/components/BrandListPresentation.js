import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import instance from "../services/auth/customize-axios";

export default function BrandListPresentation({ brands}) {
  return (
    <>
    {(window.location.pathname === routes.brands) &&(
    <>
      {brands.map((brand) => (
        <div className="brand-card-list" id={brand.brandId}>
          <div className="brand-card-list-img">
            <Link to={`${routes.brands}/${brand.name}`}>
              <img
                src={`${instance.defaults.baseURL}/images/brands/${brand.logo}`}
                alt={brand.name}
              />
            </Link>
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
  )}
  {(window.location.pathname === routes.staffBrandList) &&(
    <>
      {brands.map((brand) => (
        <div className="manage-brand-card-list" id={brand.brandId}>
          <div className="manage-brand-card-list-img">
            <Link to={`${routes.staffBrandList}/${brand.name}`}>
              <img
                src={`${instance.defaults.baseURL}/images/brands/${brand.logo}`}
                alt={brand.name}
              />
            </Link>
          </div>
          <div className="manage-brand-card-list-btn">
            <Link
              to={`${routes.staffBrandList}/${brand.name}`}
              className="manage-brand-list-btn"
              style={{ textDecoration: "none" }}>
              {brand.name}
            </Link>
          </div>
        </div>
      ))}
    </>
  )}
  </>
  );
}
