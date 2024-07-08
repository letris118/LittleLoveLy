import React from "react";
import { routes } from "../routes";
import instance from "../services/auth/customize-axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/articlePresentation.css";
import { Link } from "react-router-dom";

export default function ArticlePresentation({ articles }) {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  const article1 = articles[1];
  const article2 = articles[2];
  return (
    <>
      <div className="article-container">
        <div className="article-left">
          <Slider {...settings}>
            {articles.map((article) => (
              <Link
                to={`${routes.articles}/${encodeURIComponent(
                  article.title.replace(/\n/g, "")
                )}`}
              >
                <div className="article-card" key={article.articleId}>
                  <div className="article-card-img">
                    {article.articleImages.slice(0, 1).map((image) => (
                      <img
                        src={`${instance.defaults.baseURL}/images/articles/${image.imagePath}`}
                        alt={article.title}
                        key={image.imageId}
                      />
                    ))}
                  </div>
                  <div
                    className="article-card-link"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {article.title}
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
        <div className="article-right">
          {article1 && (
            <div className="article-right-card-container">
              <Link
                to={`${routes.articles}/${encodeURIComponent(
                  article1.title.replace(/\n/g, "")
                )}`}
                sx={{ height: "inherit" }}
              >
                <div className="article-right-card" key={article1.articleId}>
                  <div className="article-right-card-img">
                    {article1.articleImages.slice(0, 1).map((image) => (
                      <img
                        src={`${instance.defaults.baseURL}/images/articles/${image.imagePath}`}
                        alt={article1.title}
                        key={image.imageId}
                      />
                    ))}
                  </div>
                  <div
                    className="article-right-card-link"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {article1.title}
                  </div>
                </div>
              </Link>
            </div>
          )}

          {article2 && (
            <div className="article-right-card-container">
              <Link
                to={`${routes.articles}/${encodeURIComponent(
                  article2.title.replace(/\n/g, "")
                )}`}
              >
                <div className="article-right-card" key={article2.articleId}>
                  <div className="article-right-card-img">
                    {article2.articleImages.slice(0, 1).map((image) => (
                      <img
                        src={`${instance.defaults.baseURL}/images/articles/${image.imagePath}`}
                        alt={article2.title}
                        key={image.imageId}
                      />
                    ))}
                  </div>
                  <div
                    className="article-right-card-link"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {article2.title}
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {window.location.pathname === routes.staffHomePage && (
        <div className="manage-article-container">
          <div className="manage-article-left">
            <Slider {...settings}>
              {articles.map((article) => (
                <Link
                  to={`${routes.staffArticleList}/${encodeURIComponent(
                    article.title.replace(/\n/g, "")
                  )}`}
                >
                  <div className="manage-article-card" key={article.articleId}>
                    <div className="manage-article-card-img">
                      {article.articleImages.slice(0, 1).map((image) => (
                        <img
                          src={`${instance.defaults.baseURL}/images/articles/${image.imagePath}`}
                          alt={article.title}
                          key={image.imageId}
                        />
                      ))}
                    </div>
                    <div
                      className="manage-article-card-link"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {article.title}
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
          <div className="manage-article-right">
            {article1 && (
              <div className="manage-article-right-card-container">
                <Link
                  to={`${routes.staffArticleList}/${encodeURIComponent(
                    article1.title.replace(/\n/g, "")
                  )}`}
                  sx={{ height: "inherit" }}
                >
                  <div
                    className="manage-article-right-card"
                    key={article1.articleId}
                  >
                    <div className="manage-article-right-card-img">
                      {article1.articleImages.slice(0, 1).map((image) => (
                        <img
                          src={`${instance.defaults.baseURL}/images/articles/${image.imagePath}`}
                          alt={article1.title}
                          key={image.imageId}
                        />
                      ))}
                    </div>
                    <div
                      className="manage-article-right-card-link"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {article1.title}
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {article2 && (
              <div className="manage-article-right-card-container">
                <Link
                  to={`${routes.staffArticleList}/${encodeURIComponent(
                    article2.title.replace(/\n/g, "")
                  )}`}
                >
                  <div
                    className="manage-article-right-card"
                    key={article2.articleId}
                  >
                    <div className="manage-article-right-card-img">
                      {article2.articleImages.slice(0, 1).map((image) => (
                        <img
                          src={`${instance.defaults.baseURL}/images/articles/${image.imagePath}`}
                          alt={article2.title}
                          key={image.imageId}
                        />
                      ))}
                    </div>
                    <div
                      className="manage-article-right-card-link"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {article2.title}
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
