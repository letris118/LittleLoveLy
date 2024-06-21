import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { formatPrice, products } from "../services/auth/UsersService";
import { routes } from "../routes";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetailPresentation() {
  const [productInfo, setProductInfo] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { name: productName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response = await products();
        const product = response.find(
          (product) => product.name === productName
        );
        if (product) {
          setProductInfo(product);
        } else {
          setProductInfo(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProductInfo(null);
      }
    };
    fetchProduct();
  }, [productName]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity < (productInfo?.stock ?? 0)) {
        return prevQuantity + 1;
      }
      return prevQuantity;
    });
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (
      value === "" ||
      (/^[0-9\b]+$/.test(value) && Number(value) <= (productInfo?.stock ?? 0))
    ) {
      setQuantity(Number(value));
    }
  };

  const handleAddToCart = () => {
    if (quantity > 50) {
      toast.error("Bạn đã mua số lượng vượt quá chương trình !");
    } else {
      toast.success("Đã thêm sản phẩm.");
    }
  };

  const handleBuyNow = () => {
    if (quantity > 50) {
      toast.error("Bạn đã mua số lượng vượt quá chương trình !");
    } else {
      navigate("/order", { state: { productInfo, quantity } });
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return "Hết hàng";
    } else if (stock < 10) {
      return "Sắp hết hàng";
    } else {
      return "Còn hàng";
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-top">
        <div className="product-detail-left">
          <div className="product-detail-img">Ảnh</div>
        </div>
        <div className="product-detail-right">
          <div className="product-detail-info">
            <div className="product-detail-brand">
              Thương hiệu:&nbsp;
              {productInfo?.brand ? (
                <Link
                  to={`${routes.brands}/${productInfo.brand.name}`}
                  style={{ textDecoration: "none" }}>
                  {productInfo.brand.name}
                </Link>
              ) : (
                "Không xác định"
              )}
            </div>
            <div className="product-detail-name">{productInfo?.name}</div>
            <div className="product-detail-row-2">
              <div className="product-detail-rate">
                <Rating
                  value={productInfo?.averageRating ?? 0}
                  precision={0.1}
                  size="small"
                  readOnly
                />
                <div style={{ marginTop: "2px", marginLeft: "5px" }}>
                  {productInfo?.averageRating}
                </div>
              </div>
              <div className="product-detail-amount-rate">Lượt đánh giá</div>
              <div className="product-detail-amount-selling">
                Đã bán: {productInfo?.noSold}
              </div>
              <div className="product-detail-condition">
                Tình trạng: {getStockStatus(productInfo?.stock ?? 0)}
              </div>
            </div>
            <div className="product-detail-price">
              {formatPrice(productInfo?.sellingPrice)}đ
            </div>
            <div className="product-detail-quantity">
              Số lượng
              <Box display="flex" alignItems="center" m={1}>
                <button onClick={handleDecrease}>-</button>
                <TextField
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{
                    min: 1,
                    max: productInfo?.stock ?? 0,
                    style: { textAlign: "center" },
                  }}
                  style={{
                    width: "70px",
                    margin: "0 10px",
                    height: "inherit",
                  }}
                />
                <button
                  onClick={handleIncrease}
                  style={{ paddingTop: "2px", paddingLeft: "1px" }}>
                  +
                </button>
              </Box>
            </div>
            <div className="product-detail-button">
              <div className="product-detail-add-to-cart">
                <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
              </div>
              <div className="product-detail-buy-now">
                <button onClick={handleBuyNow}>Mua ngay</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
      <div className="product-detail-bottom">
        <div className="product-detail-description">
          {productInfo?.description}
        </div>
      </div>
    </div>
  );
}
