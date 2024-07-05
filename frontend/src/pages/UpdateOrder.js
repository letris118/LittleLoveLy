import React, { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { routes } from "../routes"
import StaffHeader from "../components/StaffHeader"
import { ToastContainer, toast } from "react-toastify"
import {
    updateGift,
    getGiftById,
} from "../services/auth/UsersService"
import StaffSideBar from "../components/StaffSideBar"
import "../assets/css/manage.css"
import StaffBackToTop from "../components/StaffBackToTop"


export default function UpdateOrder(){

}