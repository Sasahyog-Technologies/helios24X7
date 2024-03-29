/* eslint-disable jsx-a11y/img-redundant-alt */
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Loading from "../../../components/Loading";
import request from "../../../sdk/functions";
import ClientProfileTab from "./ClientProfileTap";
import AttendenceClient from "./ClientAttendence";

const UserProfile = () => {
  const path = window.location.pathname;
  const userId = path.split("/")[path.split("/").length - 1];

  const userData = {
    id: 1,
    name: "John Dev",
    role: "UI/UX Design Team",
    jobTitle: "Web Designer",
    employeeId: "FT-0001",
    dateOfJoin: "1st Jan 2023",
    phone: "9876543210",
    email: "johndoe@example.com",
    birthday: "24th July",
    address: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
    gender: "Male",
    supervisor: {
      name: "Jeffery Lalor",
      avatar: "assets/img/profiles/avatar-16.jpg",
    },
  };
  const { data: clientData, isLoading: userLoading } = useQuery({
    queryKey: ["client-profile-data"],
    queryFn: async () => {
      if (userId) {
        const data = await request.findOne("users", userId, {
          populate: [
            "branch",
            "body_detail",
            "subscription",
            "subscription.plan",
          ],
        });
        return data;
      }
      return null;
    },
  });
  const { data: clientSubscriptionData, isLoading: subscriptionLoading } =
    useQuery({
      queryKey: ["client-subscription-data"],
      queryFn: async () => {
        if (userId) {
          const data = await request.findMany("subscription", {
            populate: "plan",
            filters: {
              user: userId,
              type: "gym-subscription",
           /*    end: {
                $gte: new Date().toISOString(),
              }, */
            },
          });
          return data.data.map((item) => {
            return {
              ...item.attributes,
              id: item.id,
            };
          });
        }
        return null;
      },
    });
  const { data: clientPTPData, isLoading: isPtpLoading } = useQuery({
    queryKey: ["client-ptp-data"],
    queryFn: async () => {
      if (userId) {
        const data = await request.findMany("ptp", {
          populate: ["subscription", "trainer"],
          filters: {
            trainee: userId,
          },
        });
        return data.data.map((item) => {
          return {
            ...item.attributes,
            id: item.id,
            subscription: item.attributes?.subscription?.data.map((item) => {
              return {
                ...item.attributes,
                id: item.id,
              };
            }),
          };
        });
      }
      return null;
    },
  });

  // console.log(clientPTPData);
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Profile"
            title="Dashboard"
            subtitle="Client"
            modal="#add_indicator"
            name="Add New"
          />
          {userLoading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              {clientData ? (
                <>
                  <div className="card mb-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="profile-view">
                            <div className="profile-img-wrap">
                              <div className="profile-img bg-info rounded-circle d-flex justify-content-center align-items-center display-3">
                                {`${clientData.firstname.split("")[0]}`}
                              </div>
                            </div>
                            <div className="profile-basic">
                              <div className="row">
                                <div className="col-md-5">
                                  <div className="profile-info-left">
                                    <h3 className="user-name m-t-0 mb-0">
                                      {clientData.firstname}{" "}
                                      {clientData.lastname}
                                    </h3>
                                    <h6 className="text-muted">
                                      {clientData.username}
                                    </h6>
                                    <div className="staff-id">Plan :</div>
                                    <div className="small doj text-muted">
                                      Date of Join :{" "}
                                      {format(
                                        new Date(clientData.createdAt),
                                        "dd MMM yyyy"
                                      )}
                                    </div>
                                    <div className="staff-msg">
                                      <Link
                                        className="btn btn-custom"
                                        to="/call/chat"
                                      >
                                        Send Message
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-7">
                                  <ul className="personal-info">
                                    <li>
                                      <div className="title">Phone:</div>
                                      <div className="text">
                                        <Link to={`tel:${userData.phone}`}>
                                          {clientData.mobile}
                                        </Link>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="title">Birthday:</div>
                                      <div className="text">
                                        {format(
                                          new Date(clientData.birthdate),
                                          "dd MMM yyyy"
                                        )}
                                      </div>
                                    </li>
                                    <li>
                                      <div className="title">Gender:</div>
                                      <div className="text text-capitalize">
                                        {clientData.gender}
                                      </div>
                                    </li>
                                    <li>
                                      <div className="title">Branch:</div>
                                      <div className="text">
                                        {clientData.branch.name}
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            {/*   <div className="pro-edit">
                              <Link
                                data-bs-target="#profile_info"
                                data-bs-toggle="modal"
                                className="edit-icon"
                                to="#"
                              >
                                <i className="fa-solid fa-pencil"></i>
                              </Link>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Info Tab */}
                  <ClientProfileTab
                    bodyDetails={clientData?.body_detail}
                    userId={userId}
                    subscriptionLoading={subscriptionLoading}
                    subscription={clientSubscriptionData}
                    ptpLoading={isPtpLoading}
                    ptp={clientPTPData}
                  />
                  <AttendenceClient />
                </>
              ) : (
                <>
                  <div>Cleint Not Found</div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
