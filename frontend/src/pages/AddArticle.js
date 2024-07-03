import React, { useState, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { addArticle } from "../services/auth/UsersService";
import { ToastContainer, toast } from "react-toastify";
import StaffHeader from "../components/StaffHeader";
import StaffSideBar from "../components/StaffSideBar";
import { useNavigate } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize);
window.Quill = Quill;

export default function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const quillRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate("/");
      }
    };

    checkAuthentication();
  }, [navigate]);

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
      formData.append("title", title);
      formData.append("content", content);

      const response = await addArticle(formData);
      if (response) {
        toast.success("Thêm bài viết thành công");
        setContent("");
        setTitle("");
      } else {
        toast.error("Không thể thêm bài viết");
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

  return (
    <div>
      <ToastContainer />
      <StaffHeader />
      <div className="manage-content">
        <StaffSideBar />
        <div className="manage-content-detail">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Tiêu đề:</label>
              <input type="text" value={title} onChange={handleTitleChange} />
            </div>
            <div>
              <label>Nội dung:</label>
              <ReactQuill
                ref={quillRef}
                value={content}
                modules={modules}
                formats={formats}
                onChange={setContent}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Thêm bài viết
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
