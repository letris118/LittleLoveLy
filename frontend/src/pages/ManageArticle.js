import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { toast } from "react-toastify";
import "../assets/css/manage.css";
import StaffBackToTop from "../components/StaffBackToTop";
import StaffHeader from "../components/StaffHeader";
import StaffSideBar from "../components/StaffSideBar";
import { routes } from "../routes";
import instance from "../services/auth/customize-axios";
import { activateArticle, articlesAll, deactivateArticle } from "../services/auth/UsersService";
export default function ManageArticle() {
  const [articleList, setArticleList] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [sortByActive, setSortByActive] = useState(null);
  const [sortOrderActive, setSortOrderActive] = useState("asc");
  const [sortOrderDate, setSortOrderDate] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 20;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate("/");
      }
    };
    checkAuthentication();

    const fetchArticles = async () => {
      try {
        let response = await articlesAll();
        if (response) {
          setArticleList(response);
          setFilteredArticles(response);
        } else {
          setArticleList([]);
          setFilteredArticles([]);
        }
      } catch (error) {
        console.error(error);
        toast.error("Không thể tải được tin tức!");
        setArticleList([]);
        setFilteredArticles([]);
      }
    };
    fetchArticles();
  }, [navigate]);

  const handleToggle = async (articleId, currentStatus) => {
    try {
      if (currentStatus) {
        await deactivateArticle(articleId);
      } else {
        await activateArticle(articleId);
      }

      setFilteredArticles((prevState) =>
        prevState.map((article) =>
          article.articleId === articleId ? { ...article, active: !article.active } : article
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Không thể cập nhật trạng thái bài viết!");
    }
  };

  const sortArticlesByActive = () => {
    let sortedArticles = [...filteredArticles];
    sortedArticles.sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));
    if (sortOrderActive === "desc") {
      sortedArticles.reverse();
    }
    setFilteredArticles(sortedArticles);
  };

  const handleActiveSort = () => {
    if (sortByActive === "active") {
      setSortOrderActive(sortOrderActive === "asc" ? "desc" : "asc");
    } else {
      setSortByActive("active");
      setSortOrderActive("asc");
    }
    sortArticlesByActive();
  };

  const sortArticlesByDate = () => {
    let sortedArticles = [...filteredArticles];
    sortedArticles.sort((a, b) => new Date(a.uploadedDate) - new Date(b.uploadedDate));
    if (sortOrderDate === "desc") {
      sortedArticles.reverse();
    }
    setFilteredArticles(sortedArticles);
  };

  const handleDateSort = () => {
    setSortOrderDate(sortOrderDate === "asc" ? "desc" : "asc");
    sortArticlesByDate();
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = articleList.filter(
      (article) => article.title && article.title.toLowerCase().includes(query)
    );
    setFilteredArticles(filtered);
    setCurrentPage(1); 
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>

      <StaffHeader />

      <div className="manage-content">
        <StaffSideBar />

        <div className="manage-content-detail">
          <div className="search-add-table">
            <div className="table-search-bar">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <div className="add-product-btn">
              <Link to={routes.addArticle} className="add-product-link">
                Thêm bài viết mới
              </Link>
            </div>
          </div>

          <table className="manage-table">
            <thead>
              <tr>
                <th className="index-head" style={{ width: "5%" }}>
                  STT
                </th>
                <th className="name-head" style={{ width: "22%" }}>
                  Tiêu đề
                </th>
                <th className="img-head" style={{ width: "12%" }}>
                  Hình ảnh
                </th>
                <th className="date-head" style={{ width: "11%" }} onClick={handleDateSort}>
                  Ngày đăng
                  <span>{sortOrderDate === "asc" ? " ▲" : " ▼"}</span>
                </th>
                <th className="content-head" style={{ width: "22%" }}>
                  Nội dung
                </th>
                <th className="active-head" style={{ width: "11%" }} onClick={handleActiveSort}>
                  Trạng thái
                  {sortByActive === "active" && (
                    <span>{sortOrderActive === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </th>
                <th className="update-head" style={{ width: "9%" }}>
                  Chỉnh sửa
                </th>
              </tr>
            </thead>

            <tbody>
              {currentArticles.length > 0 ? (
                currentArticles.map((article, index) => (
                  <tr key={article.articleId}>
                    <td className="index-body">{indexOfFirstArticle + index + 1}</td>
                    <td className="name-body">{article.title}</td>
                    <td className="img-body">
                      {article.articleImages &&
                        article.articleImages
                          .slice(0, 1)
                          .map((image) => (
                            <img
                              key={image.imageId}
                              src={`${instance.defaults.baseURL}/images/articles/${image.imagePath}`}
                              alt={article.title}
                              style={{ width: "50%", height: "50%" }}
                            />
                          ))}
                    </td>
                    <td className="date-body">{article.uploadedDate}</td>
                    <td className="content-body">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            article.content.length > 170
                              ? `${article.content.slice(0, 170)}...`
                              : article.content,
                        }}
                      />
                    </td>
                    <td className="active-body">
                      <Switch
                        onChange={() => handleToggle(article.articleId, article.active)}
                        checked={article.active}
                        offColor="#ff0000"
                        onColor="#27ae60"
                      />
                    </td>
                    <td className="update-body">
                      <Link
                        to={`${routes.updateArticle}/${article.articleId}`}
                        className="update-link"
                      >
                        Chi tiết
                      </Link>
                    </td>
                  </tr>

                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    Không có bài viết nào phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="manage-pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handleClick(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <StaffBackToTop />
    </div>
  );
}
