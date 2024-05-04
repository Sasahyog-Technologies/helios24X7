/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import React from "react";
import { Link } from "react-router-dom";
import { useSession } from "../../Hook/useSession";
import { Avatar_02, hlogo } from "../../Routes/ImagePath";
import request from "../../sdk/functions";

import { useQuery } from "@tanstack/react-query";
const Header = (props) => {
  const { getUserDataToCookie, logoutHandler } = useSession();

  const user = getUserDataToCookie()?.user;

  return (
    <div className="header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <Link to="/" className="logo">
          <img src={hlogo} alt="img" className="w-50 logo-image" />
        </Link>
      </div>

      <Link
        style={{
          height: "60px",
        }}
        to={"/"}
        className="w-full d-flex d-lg-none align-items-center cursor-pointer"
      >
        <img style={{ height: "50px", width: "120px" }} src={hlogo} alt="img" />
      </Link>
      {/* Header Menu */}
      <ul className="nav user-menu">
        {/* /Message Notifications */}
        <li className="nav-item dropdown has-arrow main-drop d-flex pt-2 mr-4">
          <Link to="/login" className="btn">
            <span className="text-capitalize">Member Login</span>
          </Link>
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
          <Link className="dropdown-item" to={`/${user?.type}/my-profile`}>
            My Profile
          </Link>
          {/*     <Link className="dropdown-item" to="/settings/companysetting">
            Settings
          </Link> */}
          <button
            className="dropdown-item btn"
            style={{ textTransform: "capitalize" }}
            onClick={logoutHandler}
          >
            Logout
          </button>
          <Link className="dropdown-item" to={`tel:8218603083`} target="_blank">
            Contact Gym
          </Link>
        </div>
      </div>
      {/* /Mobile Menu */}
    </div>
  );
};

export default Header;
