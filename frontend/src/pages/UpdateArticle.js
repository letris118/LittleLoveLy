import React, { useState, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { getArticleById, updateArticle } from "../services/auth/UsersService";
import {  toast } from "react-toastify";
import StaffHeader from "../components/StaffHeader";
import StaffSideBar from "../components/StaffSideBar";
import { useNavigate, useParams } from "react-router-dom";
import StaffBackToTop from "../components/StaffBackToTop";
Quill.register("modules/imageResize", ImageResize);
window.Quill = Quill;

export default function UpdateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const quillRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate("/");
      }
    };

    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const fetchArticle = async (id) => {
      try {
        let response = await getArticleById(id);
        if (response) {
          setTitle(response.title);
          setContent(response.content);
        } else {
          toast.error("Không thể tải thông tin bài viết");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        toast.error("Không thể tải thông tin bài viết");
      }
    };
    if (id) {
      fetchArticle(id);
    }
  }, [refreshTrigger, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedContent = quillRef.current.getEditor().getText().trim();
    if (!title.trim() || !cleanedContent) {
      toast.error("Tiêu đề và nội dung không được để trống");
      return;
    }
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("articleId", id);
      formData.append("title", title);
      formData.append("content", content);

      const response = await updateArticle(id, formData);
      if (response) {
        toast.success("Cập nhập bài viết thành công!");
        navigate('/manage-article');

      } else {
        toast.error("Không thể lưu bài viết");
      }
    } catch (error) {
      console.error("Error creating article:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ size: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      modules: ["Resize", "DisplaySize"],
    },
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "link",
    "image",
    "list",
    "indent",
    "size",
    "header",
    "color",
    "background",
    "font",
    "align",
    "width",
    "style",
    "code-block",
  ];

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleReload = (e) => {
    e.preventDefault()
    window.location.reload();
  }

  return (
    <div>

      <StaffHeader />
      <div className="manage-content">
        <StaffSideBar />
        <div className="add-update-content-detail">
          
          <form onSubmit={handleSubmit}>
            <div className="manage-form-input">
              <div className="manage-form-group">
                <label>Tiêu đề:</label>
                <div className="manage-form-control">
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
              </div>
              <div className="manage-form-group">
                <label>Nội dung:</label>
                <div className="manage-form-control">
                  <ReactQuill
                    style={{ backgroundColor: 'white' }}
                    ref={quillRef}
                    value={content}
                    modules={modules}
                    formats={formats}
                    onChange={setContent}
                  />
                </div>
              </div>
            </div>
            <div className="manage-form-btn">
              <button className="save-manage-btn save-manage-link" type="submit" disabled={isSubmitting}>
                Lưu bài viết
              </button>

              <div className="cancel-manage-btn">
                <button onClick={handleReload} className="cancel-manage-link">
                  Đặt lại
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <StaffBackToTop />
    </div>
  );
}
