import React, { useMemo, useState } from "react";
import { routes } from "../routes";
import { Link } from "react-router-dom";
import "../assets/css/productPresentation.css";
import instance from "../services/auth/customize-axios";
import { formatPrice } from "../services/auth/UsersService";
import Rating from "@mui/material/Rating";

export default function ProductPresentation({ products }) {
  return (
    
      <div className="product-container">
        {products.map((product) => (
          <div className="product-card" key={product.productId}>
            <div className="product-card-img">
              <Link
                to={`${routes.products}/${encodeURIComponent(
                  product.name.replace(/\n/g, "")
                )}`}
                style={{ textDecoration: "none" }}>
                {product.productImages.slice(0, 1).map((image) => (
                  <img
                    src={`${instance.defaults.baseURL}/images/products/${image.imagePath}`}
                    alt={product.name}
                    key={image.imageId}
                  />
                ))}
              </Link>
            </div>
            <div className="product-card-link">
              <Link
                to={`${routes.products}/${encodeURIComponent(
                  product.name.replace(/\n/g, "")
                )}`}
                style={{ textDecoration: "none" }}>
                {product.name}
              </Link>
            </div>
            <div style={{ display: "flex" }}>
              <div className="product-card-rating">
                <Rating
                  value={product.averageRating}
                  precision={0.1}
                  size="small"
                  readOnly
                />
              </div>
              <div className="product-card-noSold">({product.noSold})</div>
            </div>
            <div className="product-card-price">
              {formatPrice(product.sellingPrice)}đ
              <Link
                to={`${routes.products}/${encodeURIComponent(
                  product.name.replace(/\n/g, "")
                )}`}>
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
  );
}
