import React from "react";
import "../assets/css/giftPresentation.css";
import instance from "../services/auth/customize-axios";

export default function GiftPresentation({ giftstList, onExchange }) {
  return (
    <>
      <div className="gift-container">
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
                <i className="fa-solid fa-coins" style={{ color: "#fcc00d" }} />
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
