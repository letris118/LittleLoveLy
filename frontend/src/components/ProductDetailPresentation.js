import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  updateCart,
  formatPrice,
  products,
} from "../services/auth/UsersService";
import { routes } from "../routes";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import instance from "../services/auth/customize-axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductDetailPresentation() {
  const [productInfo, setProductInfo] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { name: productName } = useParams();
  const navigate = useNavigate();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  const fetchProduct = useCallback(async () => {
    try {
      let response = await products();
      const decodedProductName = decodeURIComponent(productName).replace(
        /\n/g,
        ""
      );
      const product = response.find(
        (product) => product.name.replace(/\n/g, "") === decodedProductName
      );
      if (product) {
        setProductInfo(product);
        setSelectedImage(product.productImages[0].imageId);
      } else {
        setProductInfo(null);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProductInfo(null);
    }
  }, [productName]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleIncrease = useCallback(() => {
    setQuantity((prevQuantity) =>
      prevQuantity < (productInfo?.stock ?? 0) ? prevQuantity + 1 : prevQuantity
    );
  }, [productInfo]);

  const handleDecrease = useCallback(() => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  }, []);

  const handleQuantityChange = useCallback(
    (event) => {
      const value = event.target.value;
      if (
        value === "" ||
        (/^[0-9\b]+$/.test(value) && Number(value) <= (productInfo?.stock ?? 0))
      ) {
        setQuantity(Number(value));
      }
    },
    [productInfo]
  );

  const handleAddToCart = useCallback(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProductIndex = cartItems.findIndex(
      (item) => item.productId === productInfo.productId
    );

    if (existingProductIndex > -1) {
      cartItems[existingProductIndex].quantity += quantity;
    } else {
      cartItems.push({ ...productInfo, quantity });
    }
    existingProductIndex = cartItems.findIndex(
      (item) => item.productId === productInfo.productId
    );

    if (localStorage.getItem("userRole") === "ROLE_CUSTOMER") {
      updateCart(
        productInfo.productId,
        "product",
        cartItems[existingProductIndex].quantity
      ).catch((error) => {
        toast.error(error.response.data.message, {
          autoClose: 2000,
        });
      });
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    toast.success("Đã thêm sản phẩm.", {
      autoClose: 2000,
    });
  }, [quantity, productInfo]);

  const handleBuyNow = useCallback(() => {
    if (quantity > 50) {
      toast.error("Bạn đã mua số lượng vượt quá chương trình !", {
        autoClose: 2000,
      });
    } else {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      let existingProductIndex = cartItems.findIndex(
        (item) => item.productId === productInfo.productId
      );

      if (existingProductIndex > -1) {
        cartItems[existingProductIndex].quantity += quantity;
      } else {
        cartItems.push({ ...productInfo, quantity });
      }
      existingProductIndex = cartItems.findIndex(
        (item) => item.productId === productInfo.productId
      );

      if (localStorage.getItem("userRole") === "ROLE_CUSTOMER") {
        updateCart(
          productInfo.productId,
          "product",
          cartItems[existingProductIndex].quantity
        ).catch((error) => {
          toast.error(error.response.data.message, {
            autoClose: 2000,
          });
        });
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
      navigate(routes.cart);
    }
  }, [quantity, productInfo, navigate]);

  const getStockStatus = useCallback((stock) => {
    if (stock === 0) {
      return "Hết hàng";
    } else if (stock < 10) {
      return "Sắp hết hàng";
    } else {
      return "Còn hàng";
    }
  }, []);

  const settingsImgTop = useMemo(
    () => ({
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      waitForAnimate: false,
      asNavFor: nav2,
    }),
    [nav2]
  );

  const settingsImgBottom = useMemo(
    () => ({
      focusOnSelect: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: Math.max(productInfo?.productImages?.length || 0, 4),
      slidesToScroll: 1,
      speed: 500,
      asNavFor: nav1,
      beforeChange: (current, next) =>
        setSelectedImage(productInfo.productImages[next].imageId),
    }),
    [productInfo, nav1]
  );

  // hàm tải reviews
  // const renderReviews = useCallback(() => {
  //   const reviewsToShow = selectedRating
  //     ? filterReviewsByRating(selectedRating)
  //     : showAllReviews
  //     ? productInfo.reviews
  //     : productInfo.reviews.slice(0, 5);

  //   return reviewsToShow.map((review, index) => (
  //     <div className="product-detail-reviews-comments-user" key={index}>
  //       <span
  //         style={{
  //           width: "10%",
  //           height: "100%",
  //           display: "flex",
  //           justifyContent: "center",
  //         }}>
  //         <i className="fa-solid fa-user" style={{ fontSize: "30px" }}></i>
  //       </span>
  //       <div>
  //         <div
  //           style={{
  //             fontWeight: "bold",
  //             fontSize: "15px",
  //           }}>
  //           {review.username}
  //         </div>
  //         <div>
  //           <Rating value={review.rating} size="medium" readOnly />
  //         </div>
  //       </div>
  //     </div>
  //   ));
  // }, [selectedRating, showAllReviews, filterReviewsByRating, productInfo]);

  const filterReviewsByRating = useCallback(
    (rating) => {
      return productInfo.reviews.filter((review) => review.rating === rating);
    },
    [productInfo]
  );

  return (
    <>
      
        <div className="product-detail-container">
          <div className="product-detail-top">
            <div className="product-detail-left">
              {productInfo?.productImages?.length > 1 ? (
                <>
                  <Slider
                    {...settingsImgTop}
                    ref={(slider1) => setNav1(slider1)}
                  >
                    {productInfo.productImages.map((proImg) => (
                      <div
                        className="product-detail-top-img"
                        key={proImg.imageId}
                      >
                        <img
                          src={`${instance.defaults.baseURL}/images/products/${proImg.imagePath}`}
                          alt=""
                          style={{ width: "100%", borderRadius: "10px" }}
                        />
                      </div>
                    ))}
                  </Slider>
                  <Slider
                    {...settingsImgBottom}
                    ref={(slider2) => setNav2(slider2)}
                    style={{ margin: "10px" }}
                  >
                    {productInfo.productImages.map((proImg) => (
                      <div
                        className="product-detail-bottom-img"
                        key={proImg.imageId}
                      >
                        <img
                          onClick={() => setSelectedImage(proImg.imageId)}
                          src={`${instance.defaults.baseURL}/images/products/${proImg.imagePath}`}
                          alt=""
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            border:
                              proImg.imageId === selectedImage
                                ? "2px solid rgb(255, 70, 158)"
                                : "none",
                          }}
                        />
                      </div>
                    ))}
                  </Slider>
                </>
              ) : (
                productInfo?.productImages?.length === 1 && (
                  <>
                    <div
                      className="product-detail-top-img"
                      key={productInfo.productImages[0].imageId}
                    >
                      <img
                        src={`${instance.defaults.baseURL}/images/products/${productInfo.productImages[0].imagePath}`}
                        alt=""
                        style={{ width: "100%", borderRadius: "10px" }}
                      />
                    </div>
                    <div
                      className="product-detail-bottom-img"
                      style={{ margin: "10px", textAlign: "center" }}
                    >
                      <img
                        src={`${instance.defaults.baseURL}/images/products/${productInfo.productImages[0].imagePath}`}
                        alt=""
                        style={{
                          width: "100px",
                          borderRadius: "10px",
                          border: "2px solid rgb(255, 70, 158)",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </>
                )
              )}
            </div>
            <div className="product-detail-right">
              <div className="product-detail-info">
                <div className="product-detail-brand">
                  Thương hiệu:&nbsp;
                  {productInfo?.brand ? (
                    <Link
                      to={`${routes.brands}/${productInfo.brand.name}`}
                      style={{ textDecoration: "none" }}
                    >
                      {productInfo.brand.name}
                    </Link>
                  ) : (
                    "Không xác định"
                  )}
                </div>
                <div className="product-detail-name">{productInfo?.name}</div>
                <div className="product-detail-row-2">
                  <div className="product-detail-rate">
                    <div
                      style={{
                        marginTop: "2px",
                        margin: "0 5px",
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      {productInfo?.averageRating}
                    </div>
                    <Rating
                      value={productInfo?.averageRating ?? 0}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                  </div>
                  <div className="product-detail-amount-rate">
                    Lượt đánh giá
                  </div>
                  <div className="product-detail-amount-selling">
                    <span
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      {productInfo?.noSold}
                    </span>
                    &nbsp;đã bán
                  </div>
                  <div className="product-detail-condition">
                    Tình trạng: {getStockStatus(productInfo?.stock ?? 0)}
                  </div>
                </div>
                <div className="product-detail-price">
                  {productInfo?.listedPrice === productInfo?.sellingPrice ? (
                    <div style={{ color: "#FF469E", fontSize: "30px" }}>
                      {formatPrice(productInfo?.listedPrice) + "đ"}
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          textDecoration: "line-through",
                          fontSize: "13px",
                          display: "flex",
                          alignItems: "center",
                          marginRight: "10px",
                          fontWeight: "lighter",
                        }}
                      >
                        {formatPrice(productInfo?.listedPrice) + "đ"}
                      </div>
                      <div style={{ color: "#FF469E", fontSize: "30px" }}>
                        {formatPrice(productInfo?.sellingPrice) + "đ"}
                      </div>
                    </>
                  )}
                </div>
                <div className="product-detail-quantity">
                  Số lượng &nbsp; &nbsp; &nbsp;
                  <Box display="flex" alignItems="center" m={1} marginLeft={7}>
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
                      style={{ paddingTop: "2px", paddingLeft: "1px" }}
                    >
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

          <div className="product-detail-bottom">
            <div className="product-detail-description">
              <h5>Chi Tiết Sản Phẩm</h5>
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: productInfo?.description }}
              />
            </div>

            <div className="product-detail-reviews">
              <h5>Đánh giá</h5>
              <div className="product-detail-reviews-stars">
                <div className="product-detail-reviews-stars-left">
                  <span
                    style={{
                      fontWeight: "bold",
                      fontFamily: "MuseoModerno",
                      fontSize: "20px",
                    }}
                  >
                    <span style={{ color: "#FF469E", fontSize: "30px" }}>
                      {productInfo?.averageRating.toFixed(1)}
                    </span>
                    /5.0
                  </span>
                  <Rating
                    value={productInfo?.averageRating ?? 0}
                    precision={0.1}
                    size="large"
                    readOnly
                  />
                  <p>Có ... lượt đánh giá</p>
                </div>
                <div className="product-detail-reviews-stars-right">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star}>
                      <button onClick={() => setSelectedRating(star)}>
                        {star} <i className="fa-solid fa-star"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-detail-reviews-comments">
                {/* dùng để hiện reviews */}

                {/* {renderReviews()}
            {productInfo?.reviews?.length > 5 && !showAllReviews && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}>
                <button
                  onClick={() => setShowAllReviews(true)}
                  style={{
                    backgroundColor: "#FF469E",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}>
                  Xem thêm đánh giá
                </button>
              </div>
            )} */}
                <div className="product-detail-reviews-comments-user">
                  <span
                    style={{
                      width: "10%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="fa-solid fa-user"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </span>
                  <div>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      Trung Hiếu
                    </div>
                    <div>
                      <Rating value={5} size="medium" readOnly />
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="product-detail-reviews-comments-user">
                  <span
                    style={{
                      width: "10%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="fa-solid fa-user"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </span>
                  <div>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      Trung Hiếu
                    </div>
                    <div>
                      <Rating value={4} size="medium" readOnly />
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="product-detail-reviews-comments-user">
                  <span
                    style={{
                      width: "10%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="fa-solid fa-user"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </span>
                  <div>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      Trung Hiếu
                    </div>
                    <div>
                      <Rating value={3} size="medium" readOnly />
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="product-detail-reviews-comments-user">
                  <span
                    style={{
                      width: "10%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="fa-solid fa-user"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </span>
                  <div>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      Trung Hiếu
                    </div>
                    <div>
                      <Rating value={2} size="medium" readOnly />
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="product-detail-reviews-comments-user">
                  <span
                    style={{
                      width: "10%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="fa-solid fa-user"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </span>
                  <div>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      Trung Hiếu
                    </div>
                    <div>
                      <Rating value={1} size="medium" readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      

      {window.location.pathname.startsWith(`${routes.staffProductList}/`) && (
        <div className="product-detail-container">
          <div className="product-detail-top">
            <div className="product-detail-left">
              {productInfo?.productImages?.length > 1 ? (
                <>
                  <Slider
                    {...settingsImgTop}
                    ref={(slider1) => setNav1(slider1)}
                  >
                    {productInfo.productImages.map((proImg) => (
                      <div
                        className="product-detail-top-img"
                        key={proImg.imageId}
                      >
                        <img
                          src={`${instance.defaults.baseURL}/images/products/${proImg.imagePath}`}
                          alt=""
                          style={{ width: "100%", borderRadius: "10px" }}
                        />
                      </div>
                    ))}
                  </Slider>
                  <Slider
                    {...settingsImgBottom}
                    ref={(slider2) => setNav2(slider2)}
                    style={{ margin: "10px" }}
                  >
                    {productInfo.productImages.map((proImg) => (
                      <div
                        className="product-detail-bottom-img"
                        key={proImg.imageId}
                      >
                        <img
                          onClick={() => setSelectedImage(proImg.imageId)}
                          src={`${instance.defaults.baseURL}/images/products/${proImg.imagePath}`}
                          alt=""
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            border:
                              proImg.imageId === selectedImage
                                ? "2px solid rgb(255, 70, 158)"
                                : "none",
                          }}
                        />
                      </div>
                    ))}
                  </Slider>
                </>
              ) : (
                productInfo?.productImages?.length === 1 && (
                  <>
                    <div
                      className="product-detail-top-img"
                      key={productInfo.productImages[0].imageId}
                    >
                      <img
                        src={`${instance.defaults.baseURL}/images/products/${productInfo.productImages[0].imagePath}`}
                        alt=""
                        style={{ width: "100%", borderRadius: "10px" }}
                      />
                    </div>
                    <div
                      className="product-detail-bottom-img"
                      style={{ margin: "10px", textAlign: "center" }}
                    >
                      <img
                        src={`${instance.defaults.baseURL}/images/products/${productInfo.productImages[0].imagePath}`}
                        alt=""
                        style={{
                          width: "100px",
                          borderRadius: "10px",
                          border: "2px solid rgb(255, 70, 158)",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </>
                )
              )}
            </div>
            <div className="product-detail-right">
              <div className="product-detail-info">
                <div className="product-detail-brand">
                  Thương hiệu:&nbsp;
                  {productInfo?.brand ? (
                    <Link
                      to={`${routes.staffBrandList}/${productInfo.brand.name}`}
                      style={{ textDecoration: "none" }}
                    >
                      {productInfo.brand.name}
                    </Link>
                  ) : (
                    "Không xác định"
                  )}
                </div>
                <div className="product-detail-name">{productInfo?.name}</div>
                <div className="product-detail-row-2">
                  <div className="product-detail-rate">
                    <div
                      style={{
                        marginTop: "2px",
                        margin: "0 5px",
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      {productInfo?.averageRating}
                    </div>
                    <Rating
                      value={productInfo?.averageRating ?? 0}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                  </div>
                  <div className="product-detail-amount-rate">
                    Lượt đánh giá
                  </div>
                  <div className="product-detail-amount-selling">
                    <span
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      {productInfo?.noSold}
                    </span>
                    &nbsp;đã bán
                  </div>
                  <div className="product-detail-condition">
                    Tình trạng: {getStockStatus(productInfo?.stock ?? 0)}
                  </div>
                </div>
                <div className="product-detail-price">
                  {productInfo?.listedPrice === productInfo?.sellingPrice ? (
                    <div style={{ color: "#FF469E", fontSize: "30px" }}>
                      {formatPrice(productInfo?.listedPrice) + "đ"}
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          textDecoration: "line-through",
                          fontSize: "13px",
                          display: "flex",
                          alignItems: "center",
                          marginRight: "10px",
                          fontWeight: "lighter",
                        }}
                      >
                        {formatPrice(productInfo?.listedPrice) + "đ"}
                      </div>
                      <div style={{ color: "#FF469E", fontSize: "30px" }}>
                        {formatPrice(productInfo?.sellingPrice) + "đ"}
                      </div>
                    </>
                  )}
                </div>
                <div className="product-detail-quantity">
                  Số lượng &nbsp; &nbsp; &nbsp;
                  <Box display="flex" alignItems="center" m={1} marginLeft={7}>
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
                      style={{ paddingTop: "2px", paddingLeft: "1px" }}
                    >
                      +
                    </button>
                  </Box>
                </div>
                <div className="product-detail-button">
                  <div className="product-detail-add-to-cart">
                    <button>Thêm vào giỏ hàng</button>
                  </div>
                  <div className="product-detail-buy-now">
                    <button>Mua ngay</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-detail-bottom">
            <div className="product-detail-description">
              <h5>Chi Tiết Sản Phẩm</h5>
              {productInfo?.description}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
