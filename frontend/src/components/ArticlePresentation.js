import React from "react";
import { routes } from "../routes";
import { Link } from "react-router-dom";

export default function ArticlePresentation({ articles }) {
  return (
    <div className="article-container">
      {articles.map((article) => (
        <div className="article-card col-2" key={article.articleId}>
          <div className="article-card-img"></div>
          <div className="article-card-link">
            <Link
              to={`${routes.articles}/${article.name}`}
              style={{ textDecoration: "none" }}>
              {article.name}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
