/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import notifications from "../../assets/json/notifications";
import message from "../../assets/json/message";
import { useSession } from "../../Hook/useSession";
import request from "../../sdk/functions";
import {
  Applogo,
  Avatar_02,
  hlogo,
  lnEnglish,
  lnFrench,
  lnGerman,
  lnSpanish,
} from "../../Routes/ImagePath";

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom/dist";
import { useQueries, useQuery } from "@tanstack/react-query";
const Header = (props) => {
  const data = notifications.notifications;
  const datas = message.message;
  const [notification, setNotifications] = useState(false);
  const [flag, setflag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [flagImage, setFlagImage] = useState(lnEnglish);
  const { getUserDataToCookie, logoutHandler } = useSession();

  const user = getUserDataToCookie()?.user;

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };
  const onMenuClik = () => {
    document.body.classList.toggle("slide-nav");
  };

  const themes = localStorage.getItem("theme");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setNotifications(false);
    setProfile(false);
    setflag(false);
  };

  const handleNotification = () => {
    setNotifications(!notification);
    setflag(false);
    setIsOpen(false);
    setProfile(false);
  };
  const handleProfile = () => {
    setProfile(!profile);
    setNotifications(false);
    setflag(false);
    setIsOpen(false);
  };

  const location = useLocation();
  let pathname = location.pathname;
  // const { value } = useSelector((state) => state.user);
  const Credencial = localStorage.getItem("credencial");
  const Value = JSON.parse(Credencial);
  const UserName = Value?.email?.split("@")[0];
  const ProfileName = UserName?.charAt(0).toUpperCase() + UserName?.slice(1);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    // Debugging statement
    i18n.changeLanguage(lng);
    setFlagImage(
      lng === "en"
        ? lnEnglish
        : lng === "fr"
        ? lnFrench
        : lng === "es"
        ? lnSpanish
        : lnGerman
    );
  };

  return (
    <div className="header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <Link to="/admin-dashboard" className="logo">
          <img src={hlogo} alt="img" className="w-50 logo-image" />
        </Link>
        <Link to="/admin-dashboard" className="logo2">
          <img src={Applogo} width={40} height={40} alt="img" />
        </Link>
      </div>
      {/* /Logo */}
      {/* <Link
        id="toggle_btn"
        to="#"
        style={{
          display: pathname.includes("tasks")
            ? "none"
            : pathname.includes("compose")
            ? "none"
            : "",
        }}
        onClick={handlesidebar}
      >
        <span className="bar-icon">
          <span />
          <span />
          <span />
        </span>
      </Link> */}
      <Link
        id="mobile_btn"
        className="mobile_btn"
        to="#"
        onClick={() => onMenuClik()}
      >
        <i className="fa fa-bars" />
      </Link>
      {/* Small Device Logo */}
      <div
        style={{
          height: "60px",
        }}
        className="w-full d-flex d-lg-none justify-content-center align-items-center"
      >
        <img style={{ height: "50px", width: "120px" }} src={hlogo} alt="img" />
      </div>
      {/* Header Menu */}
      <ul className="nav user-menu">
        {/* /Message Notifications */}
        <li className="nav-item dropdown has-arrow main-drop d-flex d-flex justify-content-center align-items-center h-100 pt-2 mr-4">
          <Link
            to="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
            onClick={handleProfile}
          >
            {" "}
            <UserProfile userId={user.id} />
            {/* <span className="user-img me-1">
              <img src={Avatar_02} alt="img" />
              <span className="status online" />
            </span> */}
            <span className="text-capitalize">{user?.type}</span>
          </Link>
          <div
            className={`dropdown-menu dropdown-menu-end ${
              profile ? "show" : ""
            }`}
          >
            <Link className="dropdown-item" to={`/${user.type}/my-profile`}>
              My Profile
            </Link>
            <button className="dropdown-item btn" onClick={logoutHandler}>
              Logout
            </button>
            <Link className="dropdown-item" to="#">
              Contact Gym
            </Link>
          </div>
        </li>
      </ul>
      {/* /Header Menu */}
      {/* Mobile Menu */}
      <div className="dropdown mobile-user-menu">
        <Link
          to="#"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v" />
        </Link>
        <div className="dropdown-menu dropdown-menu-end dropdown-menu-right">
          <Link className="dropdown-item" to="/client/my-profile">
            My Profile
          </Link>
          {/*     <Link className="dropdown-item" to="/settings/companysetting">
            Settings
          </Link> */}
          <button className="dropdown-item btn" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
      {/* /Mobile Menu */}
    </div>
  );
};

export default Header;

const UserProfile = ({ userId }) => {
  const { data } = useQuery({
    staleTime: 5000000,
    refetchOnMount: false,
    queryKey: ["userimage", userId],
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    queryFn: async () => {
      const user = request.findOne("users", userId, {
        populate: "profile",
        field: ["profile"],
      });
      return user;
    },
  });

  return (
    <span className="user-img me-1">
      <img src={data?.profile?.url ?? Avatar_02} alt="img" />
    </span>
  );
};
