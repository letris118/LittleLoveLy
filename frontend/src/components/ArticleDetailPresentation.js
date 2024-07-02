import React, { useEffect, useState } from "react";
import { routes } from "../routes";
import { articles } from "../services/auth/UsersService";
import { useParams } from "react-router-dom";
import "../assets/css/articleDetailPresentation.css";

export default function ArticleDetailPresentation() {
  const [articleInfo, setArticleInfo] = useState(null);
  const { title: articleTitle } = useParams();
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        let response = await articles();
        const decodedArticleTitle = decodeURIComponent(articleTitle).replace(/\n/g, "");
        const article = response.find((article) => article.title === decodedArticleTitle);
        if (article) {
          setArticleInfo(article);
        } else {
          setArticleInfo(null);
        }
      } catch (error) {
        console.error(error);
        setArticleInfo(null);
      }
    };
    fetchArticle();
  }, [articleTitle]);
  return (
    <>
    {(window.location.pathname.startsWith(`${routes.articles}/`)) && (
      <div>
        {articleInfo && (
          <div className="article-detail-container">
            <div className="article-detail-title">
              <h4 style={{ fontFamily: "MuseoModerno", fontWeight: "bold" }}>{articleInfo?.title}</h4>
            </div>
            <div
              className="article-detail-uploadDate"
              style={{ fontSize: "13px", marginBottom: "15px" }}
            >
              {articleInfo.uploadedDate}
            </div>
            <div className="article-detail-content" style={{ fontSize: "16px", color: "black" }}>
              <div className="ql-editor" dangerouslySetInnerHTML={{ __html: articleInfo?.content }} />
            </div>
          </div>
        )}
      </div>
    )}
    {(window.location.pathname.startsWith(`${routes.staffArticleList}/`)) && (
      <div>
        {articleInfo && (
          <div className="article-detail-container">
            <div className="article-detail-title">
              <h4 style={{ fontFamily: "MuseoModerno", fontWeight: "bold" }}>{articleInfo?.title}</h4>
            </div>
            <div
              className="article-detail-uploadDate"
              style={{ fontSize: "13px", marginBottom: "15px" }}
            >
              {articleInfo.uploadedDate}
            </div>
            <div className="article-detail-content" style={{ fontSize: "16px", color: "black" }}>
              <div className="ql-editor" dangerouslySetInnerHTML={{ __html: articleInfo?.content }} />
            </div>
          </div>
        )}
      </div>
    )}
    </>
  );
}
