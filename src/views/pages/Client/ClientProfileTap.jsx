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

const ClientProfileTab = ({
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
                                  {p.subscription.map((subs, index) => (
                                    <div key={index} className="mt-4">
                                      <h4>Trainer Subscription ({subs.id})</h4>
                                      <ul className="personal-info mt-3">
                                        <ListItem
                                          title={"Paid"}
                                          text={subs.paid}
                                        />
                                        <ListItem
                                          title={"Outstanding"}
                                          text={subs.outstanding}
                                        />
                                        <ListItem
                                          title={"Payment Type"}
                                          text={subs.payment_type}
                                        />
                                        <ListItem
                                          title={"Start"}
                                          text={format(
                                            new Date(subs.start),
                                            "dd MMM yyyy"
                                          )}
                                        />
                                        <ListItem
                                          title={"End"}
                                          text={
                                            subs.end ? (
                                              <>
                                                {format(
                                                  new Date(subs.end),
                                                  "dd MMM yyyy"
                                                )}
                                              </>
                                            ) : (
                                              ""
                                            )
                                          }
                                        />
                                      </ul>
                                      <Link
                                        to="#"
                                        data-bs-target="#extend_subscription"
                                        className="btn btn-info"
                                        data-bs-toggle="modal"
                                        onClick={() =>
                                          setActivePlanEndDate(subs.end)
                                        }
                                      >
                                        Extend Subscription
                                      </Link>
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <>
                                  <Link
                                    to="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#add_ptp"
                                    className="btn btn-info"
                                  >
                                    Purchase Membership
                                  </Link>
                                </>
                              )}
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <Link
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#add_ptp"
                            className="btn btn-info"
                          >
                            Create PTP
                          </Link>{" "}
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
                        {subscription.map((subs, index) => (
                          <div key={index}>
                            <div className="card-body">
                              <h3 className="card-title">
                                GYM Subscription {index + 1}
                                {/*  <Link
                                  to="#"
                                  className="edit-icon"
                                  data-bs-toggle="modal"
                                  data-bs-target="#emergency_contact_modal"
                                >
                                  <i className="fa fa-pencil" />
                                </Link> */}
                              </h3>

                              {subs ? (
                                <>
                                  <ul className="personal-info">
                                    <ListItem
                                      title={"Plan"}
                                      text={subs.plan.data?.attributes?.title}
                                    />
                                    <ListItem
                                      title={"Paid"}
                                      text={subs?.paid}
                                    />
                                    <ListItem
                                      title={"Outstanding"}
                                      text={subs.outstanding}
                                    />
                                    <ListItem
                                      title={"Start"}
                                      text={format(
                                        new Date(subs.start),
                                        "dd MMM yyyy"
                                      )}
                                    />
                                    <ListItem
                                      title={"End"}
                                      text={
                                        subs.end ? (
                                          <>
                                            {format(
                                              new Date(subs.end),
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
                                      text={subs.payment_type}
                                    />
                                  </ul>
                                  <Link
                                    to="#"
                                    data-bs-toggle="modal"
                                    className="btn btn-info"
                                    data-bs-target="#extend_gym_subscription"
                                    onClick={() =>
                                      setActiveGYMPlanEndDate(subs.end)
                                    }
                                  >
                                    Extend Subscription
                                  </Link>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="card-body">
                          <h3 className="card-title">GYM Subscription</h3>
                          <Link
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#create_subscription"
                            className="btn btn-info"
                          >
                            Create Subscription
                          </Link>{" "}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
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

export default ClientProfileTab;
