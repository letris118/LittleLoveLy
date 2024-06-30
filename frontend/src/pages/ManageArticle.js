import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import Switch from 'react-switch';
import instance from "../services/auth/customize-axios";
import {
  articlesAll,
  deactivateArticle,
  activateArticle,
} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/manage.css";

export default function ManageArticle() {
  const [articleList, setArticleList] = useState([]);
  const [sortByActive, setSortByActive] = useState(null);
  const [sortOrderActive, setSortOrderActive] = useState('asc');

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
        let response = await articlesAll();
        if (response) {
          setArticleList(response.slice(0, 3));
        } else {
          setArticleList([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        toast.error("Không thể tải được tin tức");
        setArticleList([]);
      }
    };
    fetchArticles();
  }, []);

  const handleToggle = async (articleId, currentStatus) => {
    try {
      if (currentStatus) {
        await deactivateArticle(articleId);
      } else {
        await activateArticle(articleId);
      }

      setArticleList(prevState =>
        prevState.map(article =>
          article.articleId === articleId ? { ...article, active: !article.active } : article
        )
      );
    } catch (error) {
      console.error("Error toggling article status:", error);
      toast.error("Không thể cập nhật trạng thái bài viết");
    }
  };

  const sortArticlesByActive = () => {
    let sortedArticles = [...articleList];
    sortedArticles.sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));
    if (sortOrderActive === 'desc') {
      sortedArticles.reverse();
    }
    setArticleList(sortedArticles);
  };

  const handleActiveSort = () => {
    if (sortByActive === 'active') {
      setSortOrderActive(sortOrderActive === 'asc' ? 'desc' : 'asc');
    } else {
      setSortByActive('active');
      setSortOrderActive('asc');
    }
    sortArticlesByActive();
  };

  return (
    <div>
      <StaffHeader/>

      <div className="manage-content">
        <StaffSideBar/>

        <div className="manage-content-detail">

          <div className="search-add-table">
            <div className="table-search-bar">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
              />
              <button className="table-search-icon">
                <img src="../assets/images/search_icon.png" alt="search logo" />
              </button>
            </div>

            <div className="add-product-btn">
              <Link to={routes.addProduct} className="add-product-link">
                Thêm bài viết mới
              </Link>
            </div>
          </div>

          <table className="manage-table">
            <thead>
              <tr>
                <th className="index-head" style={{ width: '5%' }}>STT</th>
                <th className="name-head" style={{ width: '25%' }}>Tiêu đề</th>
                <th className="img-head" style={{ width: '12%' }}>Hình ảnh</th>
                <th className="date-head" style={{ width: '9%' }}>Ngày đăng</th>
                <th className="content-head" style={{ width: '22%' }}>Nội dung</th>
                <th className="active-head" style={{ width: '11%' }} onClick={handleActiveSort}>
                  Trạng thái
                  {sortByActive === 'active' && (
                    <span>{sortOrderActive === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
                <th className="update-head" style={{ width: '9%' }}>Chỉnh sửa</th>
              </tr>
            </thead>

            <tbody>
              {articleList.map((article, index) => (
                <tr key={article.articleId}>
                  <td className="index-body">{index + 1}</td>
                  <td className="name-body">{article.title}</td>
                  <td className="img-body">
                    {article.articleImages.slice(0, 1).map((image) => (
                      <img
                        key={image.imageId}
                        src={`${instance.defaults.baseURL}/images/articles/${image.imagePath}`}
                        alt={article.title}
                        style={{ width: '50%', height: '50%' }}
                      />
                    ))}
                  </td>
                  <td className="date-body">{article.uploadedDate}</td>
                  <td className="content-body">{article.content.length > 170 ? `${article.content.slice(0, 170)}...` : article.content}</td>
                  <td className="active-body">
                    <Switch
                      onChange={() => handleToggle(article.articleId, article.active)}
                      checked={article.active}
                      offColor="#ff0000"
                      onColor="#27ae60"
                    />
                  </td>
                  <td className="update-body">
                    <Link to="#" style={{ color: "#7f8c8d" }}>
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}
