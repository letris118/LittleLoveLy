import {useEffect,React} from "react";
import StaffHeader from "../components/StaffHeader";
import ArticleDetailPresentation from "../components/ArticleDetailPresentation";
import StaffSideBar from "../components/StaffSideBar";
import { useNavigate,useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrum";
import Footer from "../components/Footer";
import StaffBackToTop from "../components/StaffBackToTop"
export default function StaffArticleDetail() {
  const { title: articleTitle } = useParams();
  const navigate = useNavigate();

  useEffect(() => {


    const checkAuthentication = () => {
        const userRole = localStorage.getItem("userRole");
        if (!userRole || userRole !== "ROLE_STAFF") {
            navigate('/');
        }
      };
      checkAuthentication();
}, []);

  return (
    <div>
      <StaffHeader />
      <div className="manage-content">
        <StaffSideBar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />
        <div className="manage-content-detail">
          <div className="manage-content-display ">
            <div className="manage-content-article-detail-row-1">
              <ArticleDetailPresentation />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <StaffBackToTop />
    </div>
  );
}
