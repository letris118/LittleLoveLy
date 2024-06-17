import React from "react";
import { routes } from "../routes";
import { Link } from "react-router-dom";
import "../assets/css/productPresentation.css";
import instance from "../services/auth/customize-axios";

export default function ProductPresentation({ products }) {
  return (
    <div className="product-container">
      {products.map((product) => (
        <div className="product-card " key={product.productId}>
          <div className="product-card-img">
            {product.productImages.slice(0, 1).map((image) => (
              <img
                src={`${instance.defaults.baseURL}/images/products/${image.imagePath}`}
                alt={product.name}
              />
            ))}
          </div>
          <div className="product-card-link">
            <Link
              to={`${routes.products}/${product.name}`}
              style={{ textDecoration: "none" }}>
              {product.name}
            </Link>
          </div>
          <div className="product-card-noSold">Đã bán {product.noSold}</div>
          <div className="product-card-price">{product.sellingPrice}đ</div>
        </div>
      ))}
    </div>
  );
}
