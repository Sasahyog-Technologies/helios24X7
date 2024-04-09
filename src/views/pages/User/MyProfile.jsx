/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import MyProfileTab from "./MyProfileTab";
import request from "../../../sdk/functions";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { useSession } from "../../../Hook/useSession";
import ClientAvatar from "../Client/ClientAvatar";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SystemAlert from "../../layout/Alert";
const MyProfile = () => {
  const { getUserDataToCookie } = useSession();
  const session = getUserDataToCookie();
  const user = session?.user;
  const userId = user?.id;
  //console.log(user);

  const { data: clientData, isLoading: userLoading } = useQuery({
    queryKey: ["client-profile-data"],
    queryFn: async () => {
      if (userId) {
        const data = await request.findOne("users", userId, {
          populate: ["branch", "body_detail", "profile"],
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
              end: {
                $gte: new Date().toISOString(),
              },
            },
            sort: "id:desc",
          });
          return data.data.map((item) => {
            return {
              ...item?.attributes,
              id: item?.id,
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
          populate: {
            subscription: {
              sort: ["id:desc"],
              filters: {
                end: {
                  $gte: new Date().toISOString(),
                },
              },
            },
            trainer: {
              sort: ["id:desc"],
            },
          },
          filters: {
            trainee: userId,
          },
        });
        return data.data.map((item) => {
          return {
            ...item?.attributes,
            id: item?.id,
            subscription: item.attributes?.subscription?.data.map((item) => {
              return {
                ...item?.attributes,
                id: item?.id,
              };
            }),
          };
        });
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

          <SystemAlert />

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
                            <ClientAvatar
                              userId={clientData.id}
                              profile={clientData.profile}
                            />
                            <div className="profile-basic">
                              <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-md-5">
                                  <div className="profile-info-left">
                                    <h3 className="user-name m-t-0 mb-0 text-capitalize">
                                      {clientData.firstname}{" "}
                                      {clientData.lastname}
                                    </h3>
                                    <h6 className="text-muted">
                                      {clientData.username}
                                    </h6>
                                    {/* <div className="staff-id">Plan :</div> */}
                                    <div className="small doj text-muted">
                                      Date of Join :{" "}
                                      {format(
                                        new Date(clientData.createdAt),
                                        "dd MMM yyyy"
                                      )}
                                    </div>
                                    {/* <div className="staff-msg">
                                      <Link
                                        className="btn btn-custom"
                                        to="/call/chat"
                                      >
                                        Send Message
                                      </Link>
                                    </div> */}
                                  </div>
                                </div>
                                <div className="col-md-7">
                                  <ul className="personal-info">
                                    <li>
                                      <div className="title">Phone:</div>
                                      <div className="text">
                                        <Link to={`tel:${clientData.mobile}`}>
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
                                        {clientData?.branch?.name}
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {user?.type === "client" ? (
                    <>
                      <MyProfileTab
                        userId={userId}
                        ptp={clientPTPData}
                        ptpLoading={isPtpLoading}
                        bodyDetails={clientData?.body_detail}
                        subscription={clientSubscriptionData}
                        subscriptionLoading={subscriptionLoading}
                      />
                    </>
                  ) : (
                    ""
                  )}
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

export default MyProfile;
