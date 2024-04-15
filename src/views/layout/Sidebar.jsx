/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";
// import { withRouter } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useSession } from "../../Hook/useSession";
import {
  sidebarDefaultData,
  sidebarOwnerData,
  sidebarTrainerData,
  sidebarUserData,
} from "./sidebarDataHelios";
import { Image } from "antd";

import { stlogo } from "../../Routes/ImagePath";

const Sidebar = () => {
  const location = useLocation();
  // const pathname = location.pathname.split("/")[1];
  const { getUserDataToCookie } = useSession();
  const user = getUserDataToCookie()?.user;
  const pathname = location.pathname;

  //const [sidebarData, setSidebarData] = useState(SidebarData);
  const [sidebarData, setSidebarData] = useState([]);
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMouseOverSidebar, setMouseOverSidebar] = useState(false);
  const [submenuDrop, setSubmenudrop] = useState(false);

  useEffect(() => {
    if (
      isMouseOverSidebar &&
      document.body.classList.contains("mini-sidebar")
    ) {
      document.body.classList.add("expand-menu");
      return;
    }
    document.body.classList.remove("expand-menu");
  }, [isMouseOverSidebar]);

  /*  insert sidebar owner data if owner is logged in */
  useEffect(() => {
    if (
      user?.type === "owner" ||
      user?.type === "manager" ||
      user?.type === "viewer"
    ) {
      setSidebarData([...sidebarData, sidebarOwnerData]);
    } else if (user?.type === "client") {
      setSidebarData([...sidebarData, sidebarUserData]);
    } else if (user?.type === "trainer") {
      setSidebarData([...sidebarData, sidebarTrainerData]);
    } else {
      setSidebarData([sidebarDefaultData]);
    }
  }, []);

  const handleMouseEnter = () => {
    setMouseOverSidebar(true);
  };

  const handleMouseLeave = () => {
    setMouseOverSidebar(false);
  };
  const { t } = useTranslation();

  const expandSubMenus = (menu) => {
    sessionStorage.setItem("menuValue", menu.menuValue);
    const updatedAdminSidebar = sidebarData.map((section) => {
      const updatedSection = { ...section };
      updatedSection.menu = section.menu.map((menuItem) =>
        menu.menuValue != menuItem.menuValue
          ? {
              ...menuItem,
              showSubRoute: false,
            }
          : {
              ...menuItem,
              showSubRoute: !menu.showSubRoute,
            }
      );
      return updatedSection;
    });
    setSidebarData(updatedAdminSidebar);
  };

  const arrowDrop = () => {
    setSubmenudrop(!submenuDrop);
  };

  const toggleMobileNavbar = () => {
    document.body.classList.toggle("slide-nav");
  };

  return (
    <div
      className={`sidebar ${isSidebarExpanded ? "" : "hidden"}`}
      id="sidebar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="sidebar-inner d-flex flex-column slimscroll "
        style={{ overflow: false }}
      >
        <div id="sidebar-menu" className="sidebar-menu">
          <Scrollbars
            autoHide={false}
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={0}
            autoHeightMax="100vh"
            thumbMinSize={30}
            universal={false}
            hideTracksWhenNotNeeded={true}
          >
            <ul className="sidebar-vertical" id="veritical-sidebar">
              {sidebarData.map((mainTittle, index) => {
                return (
                  <>
                    <li className="menu-title" key={index + 1}>
                      <span>{t(mainTittle.tittle)}</span>
                      {mainTittle?.tittle === "CRM" ? (
                        <small class="newly-added-features">New</small>
                      ) : (
                        ""
                      )}
                    </li>
                    {mainTittle.menu.map((menu, menuIndex) => {
                      return (
                        <>
                          {menu.hasSubRoute === false ? (
                            <li
                              key={menuIndex + 1}
                              className={pathname == menu.route ? "active" : ""}
                            >
                              {/* THIS IS WHAT IS  */}
                              <Link
                                onClick={toggleMobileNavbar}
                                to={menu.route}
                              >
                                <i className={menu?.icon} />
                                <span>{t(menu.menuValue)}</span>
                              </Link>
                            </li>
                          ) : (
                            <li className="submenu">
                              <Link
                                to="#"
                                onClick={() => expandSubMenus(menu)}
                                className={menu.showSubRoute ? "subdrop" : ""}
                              >
                                <i className={menu?.icon} />
                                <span
                                  className={
                                    menu?.menuValue == "Employees"
                                      ? "noti-dot"
                                      : ""
                                  }
                                >
                                  {t(menu.menuValue)}
                                </span>
                                <span className="menu-arrow"></span>
                              </Link>
                              <ul
                                style={{
                                  display: menu.showSubRoute ? "block" : "none",
                                }}
                              >
                                {menu.subMenus.map((subMenus, subMenu) => {
                                  return (
                                    <>
                                      {/* {console.log(subMenus?.showMenuRoute)} */}
                                      {subMenus?.showMenuRoute === true ? (
                                        <li key={subMenu + 1}>
                                          <Link
                                            to={subMenus.route}
                                            className={
                                              submenuDrop ? "subdrop" : ""
                                            }
                                            onClick={arrowDrop}
                                          >
                                            {t(subMenus.menuValue)}
                                            <span className="menu-arrow"></span>
                                          </Link>

                                          <ul
                                            style={{
                                              display: submenuDrop
                                                ? "block"
                                                : "none",
                                            }}
                                          >
                                            {subMenus?.subMenusValues?.map(
                                              (value, index) => {
                                                return (
                                                  <li key={index}>
                                                    <span>
                                                      <Link to={value.route}>
                                                        <span>
                                                          {t(value.menuValue)}{" "}
                                                        </span>
                                                      </Link>
                                                    </span>
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </li>
                                      ) : (
                                        <li key={subMenu + 1}>
                                          <Link
                                            to={subMenus.route}
                                            className={
                                              pathname == subMenus?.route
                                                ? "active"
                                                : ""
                                            }
                                          >
                                            {t(subMenus.menuValue)}
                                          </Link>

                                          <ul>
                                            {subMenus?.subMenusValues?.map(
                                              (value, index) => {
                                                return (
                                                  <li key={index}>
                                                    <Link
                                                      to={value.route}
                                                      className={
                                                        pathname == value?.route
                                                          ? "active"
                                                          : ""
                                                      }
                                                    >
                                                      {t(value.menuValue)}
                                                    </Link>
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </li>
                                      )}
                                    </>
                                  );
                                })}
                              </ul>
                            </li>
                          )}
                        </>
                      );
                    })}
                  </>
                );
              })}
            </ul>
          </Scrollbars>
        </div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 300,
            marginTop: "auto",
          }}
          className="p-2 text-white flex-wrap"
        >
          <div className="d-flex align-items-center">
            <Image width={50} src={stlogo} />{" "}
            <p>
              Developed with ❣️ by <br /> Sasahayog Technologies{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
