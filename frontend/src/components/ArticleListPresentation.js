import React from "react";
import { routes } from "../routes";
import instance from "../services/auth/customize-axios";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

export default function ArticleListPresentation(articles) {
  return (
      
        <>
          {articles.articles.map((article) => (
            <div className="article-card-list col-4" id={article.articleId}>
              <Link
                to={`${routes.articles}/${encodeURIComponent(
                  article.title.replace(/\n/g, "")
                )}`}
                style={{ textDecoration: "none" }}>
                <div className="article-card-list-img">
                  {article.articleImages.slice(0, 1).map((image) => (
                    <img
                      src={`${instance.defaults.baseURL}/images/articles/${image.imagePath}`}
                      alt={article.title}
                      key={image.imageId}
                    />
                  ))}
                </div>

                <div className="article-card-list-title">{article.title}</div>
                <div
                  className="article-card-list-content"
                  style={{ fontWeight: "400" }}>
                  {parse(article.content)}
                </div>
              </Link>
              <div className="article-card-list-uploadDate">
                <i>{article.uploadedDate}</i>
              </div>
            </div>

          ))}
        </>

  );
}
