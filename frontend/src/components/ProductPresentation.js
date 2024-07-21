import Rating from "@mui/material/Rating";
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/productPresentation.css";
import { routes } from "../routes";
import instance from "../services/auth/customize-axios";
import { formatPrice } from "../services/auth/UsersService";

export default function ProductPresentation({ products }) {
  return (
    <div className="product-container">
      {products.map((product) => (
        <div className="product-card" key={product.productId}>
          <div className="product-card-img">
            <Link
              to={`${routes.products}/${product.productId}/${encodeURIComponent(
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
              to={`${routes.products}/${product.productId}/${encodeURIComponent(
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
            {product.sellingPrice === product.listedPrice ? (
              <div>{formatPrice(product.sellingPrice)}đ</div>
            ) : (
              <div style={{ display: "flex" }}>
                {formatPrice(product.sellingPrice)}đ
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    textDecoration: "line-through",
                    paddingBottom: "3px",
                    fontSize: "10px",
                    marginLeft: "5px",
                    fontWeight: "lighter",
                    opacity: "0.8",
                  }}>
                  {formatPrice(product.listedPrice)}đ
                </div>
              </div>
            )}
            <Link
              to={`${routes.products}/${product.productId}/${encodeURIComponent(
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
