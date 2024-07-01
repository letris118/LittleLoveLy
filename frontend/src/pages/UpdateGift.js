import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { updateGift, getGiftById } from "../services/auth/UsersService"; // Adjust the imports as per your service methods
import StaffHeader from "../components/StaffHeader";
import StaffSideBar from "../components/StaffSideBar";
import { routes } from "../routes";
import "../assets/css/manage.css";

export default function UpdateGift() {
    
}
