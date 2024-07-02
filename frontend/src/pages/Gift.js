import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import GiftPresentation from "../components/GiftPresentation";
import Breadcrumb from "../components/Breadcrum";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  styled,
} from "@mui/material";
import { gifts, updateCart, users } from "../services/auth/UsersService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

export default function Gift() {
  const [giftstList, setGiftsList] = useState([]);
  const [userPoint, setUserPoint] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGift, setSelectedGift] = useState(null);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "ROLE_CUSTOMER") {
      navigate(routes.homePage);
    }
  }, [navigate]);

  const CustomDialog = styled(Dialog)({
    "& .MuiPaper-root": {
      borderRadius: "20px",
    },
  });

  const CustomDialogTitle = styled(DialogTitle)({
    backgroundColor: "#ff69b4",
    color: "white",
    fontSize: "20px",
    padding: "10px 20px",
    fontWeight: "bold",
    marginBottom: "10px",
  });

  const CustomDialogContent = styled(DialogContent)({
    fontSize: "16px",
  });

  const CustomButton = styled(Button)({
    backgroundColor: "pink",
    color: "white",
    "&:hover": {
      backgroundColor: "#ff69b4",
    },
  });

  const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        backgroundColor: "#ff69b4",
        color: "white",
      },
    },
  });

  const totalPages = useMemo(
    () => Math.ceil(giftstList.length / itemsPerPage),
    [giftstList.length]
  );

  const currentItems = useMemo(
    () =>
      giftstList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [currentPage, giftstList]
  );

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        let response = await gifts();
        if (response) {
          setGiftsList(response);
        }
      } catch (error) {
        console.error("Error fetching gifts:", error);
      }
    };

    const fetchUserPoints = async () => {
      try {
        let response = await users();
        const userInfo = response.find(
          (user) => user.username === localStorage.getItem("username")
        );
        if (userInfo) {
          setUserPoint(userInfo.point);
        }
      } catch (error) {
        console.error("Error fetching user points:", error);
      }
    };

    fetchUserPoints();
    fetchGifts();
  }, []);

  const handleExchange = async (gift) => {
    // nếu điểm lớn hơn quà thì đổi

    // if (userPoint >= gift.point) {
    //   setSelectedGift(gift);
    //   setConfirmPopup(true);
    // } else {
    //   toast.error("Không đủ điểm để đổi quà.");
    // }
    setSelectedGift(gift);
    setConfirmPopup(true);
  };

  const handleConfirmExchange = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    const giftCartItems = JSON.parse(localStorage.getItem("gifts")) || [];
    const existingProductIndex = giftCartItems.findIndex(
      (item) => item.giftId === selectedGift.giftId
    );

    if (existingProductIndex !== -1) {
      setConfirmPopup(false);
      setIsProcessing(false);
      toast.error("Mỗi phần quà chỉ đổi được 1 lần !", {
        autoClose: 1500,
      });
      return;
    }

    try {
      giftCartItems.push(selectedGift);
      localStorage.setItem("gifts", JSON.stringify(giftCartItems));
      // setUserPoint(userPoint - selectedGift.point);
      // localStorage.setItem("point", userPoint - selectedGift.point);
      toast.success("Đổi quà thành công!", {
        autoClose: 1500,
      });
      setConfirmPopup(false);
    } catch (error) {
      console.error("Error exchanging gift:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseDialog = () => {
    setConfirmPopup(false);
    setSelectedGift(null);
  };

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
          <Breadcrumb value="Tất cả phần quà" />
          <div
            className="content-display "
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
            }}>
            <div className="row-top">
              <h4>Tất cả phần quà</h4>
            </div>
            <div
              className="content-gift-row"
              style={{
                minHeight: "100vh",
              }}>
              <GiftPresentation
                giftstList={currentItems}
                onExchange={handleExchange}
              />
            </div>
            <div
              className="pagination-container"
              style={{
                textAlign: "center",
                padding: "20px 0",
              }}>
              <CustomPagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CustomDialog open={confirmPopup} onClose={handleCloseDialog}>
        <CustomDialogTitle>Xác nhận đổi quà</CustomDialogTitle>
        <CustomDialogContent>
          Bạn có chắc chắn muốn đổi <b>"{selectedGift?.name}"</b> không?
        </CustomDialogContent>
        <DialogActions>
          <CustomButton
            onClick={handleConfirmExchange}
            color="primary"
            disabled={isProcessing}>
            Đồng ý
          </CustomButton>
          <CustomButton onClick={handleCloseDialog}>Hủy</CustomButton>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}
