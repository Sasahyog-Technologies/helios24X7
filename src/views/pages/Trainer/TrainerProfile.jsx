/* eslint-disable jsx-a11y/img-redundant-alt */
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Loading from "../../../components/Loading";
import request from "../../../sdk/functions";
import TrianerEditPopup from "../../../components/modelpopup/Trainer/TrainerEditPopup";

const TrainerProfile = () => {
  const path = window.location.pathname;
  const userId = path.split("/")[path.split("/").length - 1];

  const { data: trainerData, isLoading: userLoading } = useQuery({
    queryKey: ["trainer-profile-data"],
    queryFn: async () => {
      if (userId) {
        const data = await request.findOne("users", userId, {
          populate: ["branch"],
        });
        return data;
      }
      return null;
    },
  });

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
              {trainerData ? (
                <>
                  <div className="card mb-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="profile-view">
                            <div className="profile-img-wrap">
                              <div className="profile-img text-uppercase bg-info rounded-circle d-flex justify-content-center align-items-center display-3">
                                {`${trainerData.firstname.split("")[0]}`}
                              </div>
                            </div>
                            <div className="profile-basic">
                              <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-md-5">
                                  <div className="profile-info-left">
                                    <h3 className="user-name m-t-0 mb-0 text-capitalize">
                                      {trainerData.firstname}{" "}
                                      {trainerData.lastname}
                                    </h3>
                                    <h6 className="text-muted">
                                      {trainerData.username}
                                    </h6>
                                    {/* <div className="staff-id">Plan :</div> */}
                                    <div className="small doj text-muted">
                                      Date of Join :{" "}
                                      {format(
                                        new Date(trainerData.createdAt),
                                        "dd MMM yyyy"
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-7">
                                  <ul className="personal-info">
                                    <li>
                                      <div className="title">Phone:</div>
                                      <div className="text">
                                        <Link to={`tel:${trainerData.mobile}`}>
                                          {trainerData.mobile}
                                        </Link>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="title">Birthday:</div>
                                      <div className="text">
                                        {format(
                                          new Date(trainerData.birthdate),
                                          "dd MMM yyyy"
                                        )}
                                      </div>
                                    </li>
                                    <li>
                                      <div className="title">Gender:</div>
                                      <div className="text text-capitalize">
                                        {trainerData.gender}
                                      </div>
                                    </li>
                                    <li>
                                      <div className="title">Branch:</div>
                                      <div className="text">
                                        {trainerData.branch.name}
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            {
                              <div className="pro-edit">
                                <Link
                                  data-bs-target="#edit_trainer"
                                  data-bs-toggle="modal"
                                  className="edit-icon"
                                  to="#"
                                >
                                  <i className="fa-solid fa-pencil"></i>
                                </Link>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Info Tab */}
                  {/*       <TrainerProfileTab
                    bodyDetails={trainerData?.body_detail}
                    userId={userId}
                    subscriptionLoading={subscriptionLoading}
                    subscription={clientSubscriptionData}
                    ptpLoading={isPtpLoading}
                    ptp={clientPTPData}
                  />
                  <AttendenceClient /> */}
                </>
              ) : (
                <>
                  <div>Trainer Not Found</div>
                </>
              )}
            </>
          )}
        </div>
        <TrianerEditPopup userId={userId} />
      </div>
    </>
  );
};

export default TrainerProfile;
