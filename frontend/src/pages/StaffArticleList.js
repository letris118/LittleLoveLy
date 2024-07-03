import React, { useEffect, useState } from "react";
import StaffHeader from "../components/StaffHeader";
import Breadcrumb from "../components/Breadcrum";
import StaffSideBar from "../components/StaffSideBar";
import { articles } from "../services/auth/UsersService";
import ArticleListPresentation from "../components/ArticleListPresentation";
import Footer from "../components/Footer";
import { useNavigate,useParams } from "react-router-dom";
import StaffBackToTop from "../components/StaffBackToTop"
export default function StaffArticleList() {
  const [articleList, setArticleList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = () => {
        const userRole = localStorage.getItem("userRole");
        if (!userRole || userRole !== "ROLE_STAFF") {
            navigate('/');
        }
      };
    checkAuthentication();

    const fetchArticles = async () => {
      try {
        let response = await articles();

        if (response) {
          const uniqueArticles = Array.from(
            new Set(response.map((article) => article.articleId))
          ).map((id) => {
            return response.find((article) => article.articleId === id);
          });
          setArticleList(uniqueArticles);
        } else {
          setArticleList([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticleList([]);
      }
    };
    fetchArticles();
  });
  return (
    <div className="manage-article-list-container">
      <StaffHeader />
      <div className="manage-content">
        <StaffSideBar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />

        <div className="manage-content-detail">
          <div className="manage-content-display ">
            <div className="manage-content-row-1">
              <div className="manage-row-1-top" style={{ width: "100%" }}>
                <h4>Tất cả bài báo</h4>
              </div>
              <div className="manage-row-article-list-bottom">
                <ArticleListPresentation articles={articleList} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <StaffBackToTop />
    </div>
  );
}
