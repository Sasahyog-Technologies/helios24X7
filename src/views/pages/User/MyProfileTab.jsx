import { format } from "date-fns";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Loading from "../../../components/Loading";
import { ListItem } from "../Profile/ProfileContent";
import PtpAddPopup from "../../../components/modelpopup/Client/PTPAddPopup";
import ClientEditPopup from "../../../components/modelpopup/Client/ClientEditPopup";
import CreateSubscriptionPopup from "../../../components/modelpopup/Client/CreateSubscription";
import ExtendPTPSubscriptionPopup from "../../../components/modelpopup/Client/ExtendPTPSubscription";
import ExtendGYMSubscriptionPopup from "../../../components/modelpopup/Client/ExtendGYMSubscription";
import { Chart } from "react-chartjs-2";

function convertToReadableTime(timeString) {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes] = timeString.split(":").map(Number);

  // Ensure the time parts are valid
  if (isNaN(hours) || isNaN(minutes)) {
    return null;
  }

  // Determine if it's AM or PM
  const meridiem = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  let readableHours = hours % 12;
  readableHours = readableHours === 0 ? 12 : readableHours;

  // Construct the readable time string
  const readableTime = `${readableHours}:${
    (minutes < 10 ? "0" : "") + minutes
  } ${meridiem}`;

  return readableTime;
}

const MyProfileTab = ({
  ptp,
  userId,
  bodyDetails,
  ptpLoading,
  subscription,
  subscriptionLoading,
}) => {
 
  const [activePlanEndDate, setActivePlanEndDate] = useState();
  const [activeGYMPlanEndDate, setActiveGYMPlanEndDate] = useState();
  return (
    <>
      <div className="tab-content">
        <div
          id="emp_profile"
          className="pro-overview tab-pane fade show active"
        >
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Body Details
                    <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_client"
                    >
                      <i className="fa fa-pencil" />
                    </Link>
                  </h3>

                  <ul className="personal-info">
                    <ListItem
                      title={"Weight"}
                      text={bodyDetails?.weight ?? "unspecified"}
                    />
                    <ListItem
                      title={"Height"}
                      text={bodyDetails?.height ?? "unspecified"}
                    />
                    <ListItem
                      title={"BMR"}
                      text={bodyDetails?.bmr ?? "unspecified"}
                    />
                    <ListItem
                      title={"HIP"}
                      text={bodyDetails?.hip ?? "unspecified"}
                    />
                    <ListItem
                      title={"Neck"}
                      text={bodyDetails?.neck ?? "unspecified"}
                    />
                    <ListItem
                      title={"Weist"}
                      text={bodyDetails?.weist ?? "unspecified"}
                    />
                    <ListItem
                      title={"Calf"}
                      text={bodyDetails?.calf ?? "unspecified"}
                    />
                    <ListItem
                      title={"Chest"}
                      text={bodyDetails?.chest ?? "unspecified"}
                    />
                    <ListItem
                      title={"Biceps"}
                      text={bodyDetails?.biceps ?? "unspecified"}
                    />
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Personal Training Program</h3>
                  {ptpLoading ? (
                    <>
                      <Loading />
                    </>
                  ) : (
                    <>
                      {ptp.length ? (
                        <>
                          {ptp.map((p, index) => (
                            <div key={index}>
                              <ul className="personal-info">
                                <ListItem
                                  title={"Trainer"}
                                  text={`${p.trainer.data?.attributes.firstname} ${p.trainer.data?.attributes.lastname}`}
                                />
                                <ListItem
                                  title={"Session From"}
                                  // text={p.session_from}
                                  text={convertToReadableTime(p?.session_from)}
                                />
                                <ListItem
                                  title={"Session To"}
                                  text={convertToReadableTime(p?.session_to)}
                                />
                              </ul>
                              <hr />
                              {p.subscription.length ? (
                                <>
                                  <div className="mt-4">
                                    <h4>
                                      Trainer Subscription (
                                      {p.subscription[0].id})
                                    </h4>
                                    <ul className="personal-info mt-3">
                                      <ListItem
                                        title={"Paid"}
                                        text={p.subscription[0].paid}
                                      />
                                      <ListItem
                                        title={"Outstanding"}
                                        text={p.subscription[0].outstanding}
                                      />
                                      <ListItem
                                        title={"Payment Type"}
                                        text={p.subscription[0].payment_type}
                                      />
                                      <ListItem
                                        title={"Start"}
                                        text={format(
                                          new Date(p.subscription[0].start),
                                          "dd MMM yyyy"
                                        )}
                                      />
                                      <ListItem
                                        title={"End"}
                                        text={
                                          p.subscription[0].end ? (
                                            <>
                                              {format(
                                                new Date(p.subscription[0].end),
                                                "dd MMM yyyy"
                                              )}
                                            </>
                                          ) : (
                                            ""
                                          )
                                        }
                                      />
                                    </ul>
                                    {/*      <Link
                                      to="#"
                                      data-bs-target="#extend_subscription"
                                      className="btn btn-info"
                                      data-bs-toggle="modal"
                                      onClick={() =>
                                        setActivePlanEndDate(
                                          p.subscription[0].end
                                        )
                                      }
                                    >
                                      Extend Subscription
                                    </Link> */}
                                  </div>
                                </>
                              ) : (
                                <>
                                  {/*   <Link
                                    to="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#add_ptp"
                                    className="btn btn-info"
                                  >
                                    Purchase Membership
                                  </Link> */}
                                </>
                              )}
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {/*    <Link
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#add_ptp"
                            className="btn btn-info"
                          >
                            Create PTP
                          </Link>{" "} */}

                          <div>Personal Trainer Not Available</div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                {subscriptionLoading ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  <>
                    {subscription.length ? (
                      <>
                        <div>
                          <div className="card-body">
                            <h3 className="card-title">
                              GYM Subscription ({subscription[0].id})
                              {/*  <Link
                                  to="#"
                                  className="edit-icon"
                                  data-bs-toggle="modal"
                                  data-bs-target="#emergency_contact_modal"
                                >
                                  <i className="fa fa-pencil" />
                                </Link> */}
                            </h3>
                            <>
                              <ul className="personal-info">
                                <ListItem
                                  title={"Plan"}
                                  text={
                                    subscription[0].plan.data?.attributes?.title
                                  }
                                />
                                <ListItem
                                  title={"Paid"}
                                  text={subscription[0]?.paid}
                                />
                                <ListItem
                                  title={"Outstanding"}
                                  text={subscription[0].outstanding}
                                />
                                <ListItem
                                  title={"Start"}
                                  text={format(
                                    new Date(subscription[0].start),
                                    "dd MMM yyyy"
                                  )}
                                />
                                <ListItem
                                  title={"End"}
                                  text={
                                    subscription[0].end ? (
                                      <>
                                        {format(
                                          new Date(subscription[0].end),
                                          "dd MMM yyyy"
                                        )}
                                      </>
                                    ) : (
                                      ""
                                    )
                                  }
                                />
                                <ListItem
                                  title={"Payment Type"}
                                  text={subscription[0].payment_type}
                                />
                              </ul>
                              {/*   <Link
                                to="#"
                                data-bs-toggle="modal"
                                className="btn btn-info"
                                data-bs-target="#extend_gym_subscription"
                                onClick={() =>
                                  setActiveGYMPlanEndDate(subscription[0].end)
                                }
                              >
                                Extend Subscription
                              </Link> */}
                            </>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="card-body">
                          <h3 className="card-title">GYM Subscription</h3>
                          {/*      <Link
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#create_subscription"
                            className="btn btn-info"
                          >
                            Create Subscription
                          </Link> */}
                          <p>GYM Subscription not Available</p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* Attendance card */}
            <div className="col-lg-6 col-md-12">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="statistic-header">
                    <h4>Attendance &amp; Leaves</h4>
                    <div className="dropdown statistic-dropdown">
                      <Link
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        to="#"
                      >
                        2024
                      </Link>
                      <div className="dropdown-menu dropdown-menu-end">
                        <Link to="#" className="dropdown-item">
                          2025
                        </Link>
                        <Link to="#" className="dropdown-item">
                          2026
                        </Link>
                        <Link to="#" className="dropdown-item">
                          2027
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="attendance-list">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="attendance-details">
                          <h4 className="text-primary">9</h4>
                          <p>Total Leaves</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="attendance-details">
                          <h4 className="text-pink">5.5</h4>
                          <p>Leaves Taken</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="attendance-details">
                          <h4 className="text-success">04</h4>
                          <p>Leaves Absent</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="attendance-details">
                          <h4 className="text-purple">0</h4>
                          <p>Pending Approval</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="attendance-details">
                          <h4 className="text-info">214</h4>
                          <p>Working Days</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="attendance-details">
                          <h4 className="text-danger">2</h4>
                          <p>Loss of Pay</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Attendance Card */}
            </div>
          </div>
        </div>
        <ClientEditPopup userId={userId} />
        <PtpAddPopup userId={userId} />
        <CreateSubscriptionPopup userId={userId} />
        <ExtendPTPSubscriptionPopup
          userId={userId}
          ptpId={ptp && ptp.length ? ptp[0].id : ""}
          activePlanEndDate={activePlanEndDate}
          setActivePlanEndDate={setActivePlanEndDate}
        />
        <ExtendGYMSubscriptionPopup
          userId={userId}
          activeGYMPlanEndDate={activeGYMPlanEndDate}
        />
      </div>
    </>
  );
};

export default MyProfileTab;
