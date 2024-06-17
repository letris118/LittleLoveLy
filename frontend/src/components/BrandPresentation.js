import React from "react";
import { routes } from "../routes";
import { Link } from "react-router-dom";
import "../assets/css/brandPresentation.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function BrandPresentation({ brands }) {
  const imgUrl =
    "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/anh-dep-thien-nhien-thump-1024x536.jpg.webp";
  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {brands.map((brand) => (
          <div className="brand-card" id={brand.brandId}>
            <div className="brand-card-img">
              <img src={imgUrl} alt={brand.name} />
            </div>
            <div className="brand-card-btn">
              <Link
                to={`${routes.brands}/${brand.name}`}
                className="brand-btn"
                style={{ textDecoration: "none" }}>
                {brand.name}
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
