import React from "react";
import instance from "../services/auth/customize-axios";
import "../assets/css/giftPresentation.css";
import { ToastContainer, toast } from "react-toastify";

export default function GiftPresentation({
  giftstList,
  userPoint,
  onExchange,
}) {
  // chưa xònng thêm vào giỏ hàng, trừ điểm,

  const handleExchange = async (gift) => {
    const giftCartItems = JSON.parse(localStorage.getItem("gifts")) || [];
    const existingProductIndex = giftCartItems.findIndex(
      (item) => item.giftId === gift.giftId
    );

    if (existingProductIndex !== -1) {
      toast.error("Bạn đã đổi quà này rồi.");
      return;
    }

    if (userPoint < gift.point) {
      toast.error("Không đủ điểm để đổi quà.");
      return;
    }

    // try {
    //   await instance.post("/update-points", { points: userPoint - gift.point });
    //   giftCartItems.push(gift);
    //   localStorage.setItem("gifts", JSON.stringify(giftCartItems));
    //   setUserPoint(userPoint - gift.point);
    //   toast.success("Đổi quà thành công!");
    // } catch (error) {
    //   console.error("Error exchanging gift:", error);
    // }
  };
  return (
    <>
      <div className="gift-container">
        <ToastContainer />
        {giftstList.map((gift) => (
          <div className="gift-card" key={gift.giftId}>
            <div className="gift-card-img">
              <img
                src={`${instance.defaults.baseURL}/images/gifts/${gift.imagePath}`}
                alt={gift.name}
              />
            </div>
            <span>{gift.name}</span>
            <div className="gift-card-btn">
              <div>
                <i class="fa-solid fa-coins" style={{ color: "#fcc00d" }} />
                &nbsp;
                {gift.point}
              </div>
              <div>
                <button onClick={() => onExchange(gift)}>Đổi</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
