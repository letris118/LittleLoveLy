import React from "react";
import { routes } from "../routes";
import { Link } from "react-router-dom";

export default function ProductPresentation({ products }) {
  return (
    <div>
      {products.map((product) => (
        <div className="product-card" key={product.productId}>
          <div className="product-card-img">
            <img src={product.productImages.imagePath} alt={product.name} />
          </div>
          <div className="product-card-link">
            <Link
              to={`${routes.products}/${product.productId}`}
              style={{ textDecoration: "none" }}>
              {product.name}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
