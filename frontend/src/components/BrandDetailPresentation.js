import React, { useEffect, useState } from "react";
import { brands } from "../services/auth/UsersService";
import { useParams } from "react-router-dom";
import instance from "../services/auth/customize-axios";

export default function BrandDetailPresentation() {
  const [brandInfo, setBrandInfo] = useState({});
  const { name: brandName } = useParams();

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        let response = await brands();
        const brand = response.find((brand) => brand.name === brandName);

        if (brand) {
          setBrandInfo(brand);
        } else {
          setBrandInfo({});
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrandInfo({});
      }
    };

    fetchBrand();
  }, [brandName]);
  return (
    <div>
      <div className="brand-row-1">
        <div className="brand-row-1-left">
          <div className="row-1-left">
            <div className="row-1-left-content">
              <div
                className="row-1-left-background"
                style={{
                  backgroundImage: `url(${instance.defaults.baseURL}/images/brands/${brandInfo.logo})`,
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "rgba(0, 0, 0, 0.306)",
                  width: "100%",
                  height: "100%",
                  padding: "20px 20px",
                  borderRadius: "20px",
                }}>
                <div
                  className="row-1-left-img"
                  style={{
                    backgroundImage: `url(${instance.defaults.baseURL}/images/brands/${brandInfo.logo})`,
                  }}></div>
                <div className="row-1-left-text" style={{ zIndex: "1" }}>
                  <span
                    style={{
                      fontSize: "30px",
                      color: "white",
                      fontFamily: "MuseoModerno",
                      fontWeight: "bold",
                    }}>
                    {brandInfo.name}
                  </span>
                  <div
                    style={{
                      color: "white",
                      backgroundColor: "#F2DFE6",
                      gap: "20px",
                      padding: "2px 10px",
                      borderRadius: "20px",
                      fontSize: "15px",
                      margin: "0 30px",
                      display: "flex",
                      alignItems: "center",
                      border: "3px solid #FF379B",
                    }}>
                    <i
                      class="fa-solid fa-circle-check"
                      style={{
                        color: "#FF379B",
                        fontSize: "20px",
                      }}></i>{" "}
                    <span style={{ color: "#FF379B", fontWeight: "bold" }}>
                      Chính hãng
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="brand-row-1-right">
          <div className="row-1-right">Text</div>
        </div>
      </div>
      <div className="brand-row-2">
        <div className="row-2-left">Text</div>
        <div className="row-2-right">Text</div>
      </div>
    </div>
  );
}
