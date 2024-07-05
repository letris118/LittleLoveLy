import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrum";
import Sidebar from "../components/SideBar";
import { articles } from "../services/auth/UsersService";
import ArticleListPresentation from "../components/ArticleListPresentation";
import Footer from "../components/Footer";

export default function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response = await articles();

        if (response) {
          const uniqueArticles = Array.from(
            new Set(response.map((article) => article.articleId))
          ).map((id) => {
            return response.find((article) => article.articleId === id);
          });
          const sortedArticles = uniqueArticles.sort((a, b) => {
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          });

          setArticleList(sortedArticles);
        } else {
          setArticleList([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticleList([]);
      }
    };
    fetchArticles();
  }, []);
  return (
    <div className="article-list-container">
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />

        <div className="content-detail">
          <Breadcrumb value="Tất cả bài báo" />
          <div className="content-display ">
            <div className="content-row-1">
              <div className="row-top" style={{ width: "100%" }}>
                <h4>Tất cả bài báo</h4>
              </div>
              <div className="row-article-list-bottom">
                <ArticleListPresentation articles={articleList} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
