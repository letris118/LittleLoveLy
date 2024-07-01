import React from "react";
import Header from "../components/Header";
import ArticleDetailPresentation from "../components/ArticleDetailPresentation";
import Sidebar from "../components/SideBar";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrum";
import Footer from "../components/Footer";

export default function ArticleDetail() {
  const { title: articleTitle } = useParams();
  return (
    <div>
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />
        <div className="content-detail">
          <Breadcrumb value={articleTitle} customName="Tất cả bài báo" />
          <div className="content-display ">
            <div className="content-article-detail-row-1">
              <ArticleDetailPresentation />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
