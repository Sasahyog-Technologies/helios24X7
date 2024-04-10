import { format } from "date-fns";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { ListItem } from "../Profile/ProfileContent";
import PtpAddPopup from "../../../components/modelpopup/Client/PTPAddPopup";
import PtpEditPopup from "../../../components/modelpopup/Client/PTPEditPopup";
import ClientEditPopup from "../../../components/modelpopup/Client/ClientEditPopup";
import PayOutstanding from "../../../components/modelpopup/Client/PayOutstandingPopup";
import ClientBodyDetails from "../../../components/modelpopup/Client/CliendBodyDetails";
import CreateSubscriptionPopup from "../../../components/modelpopup/Client/CreateSubscription";
import ExtendPTPSubscriptionPopup from "../../../components/modelpopup/Client/ExtendPTPSubscription";
import ExtendGYMSubscriptionPopup from "../../../components/modelpopup/Client/ExtendGYMSubscription";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chatLines = [
  {
    name: "height",
    stroke: "#ff9b44",
    fill: "#00c5fb",
  },
  {
    name: "weight",
    stroke: "#fc6075",
    fill: "#0253cc",
  },
  {
    name: "chest",
    stroke: "#67e6dc", // Unique color
    fill: "#e68e67", // Unique color
  },
  {
    name: "hip",
    stroke: "#e1e667", // Unique color
    fill: "#6774e6", // Unique color
  },
  {
    name: "biceps",
    stroke: "#9e67e6", // Unique color
    fill: "#67e667", // Unique color
  },
  {
    name: "weist",
    stroke: "#67e667", // Reused color from 'biceps'
    fill: "#e6679e", // Unique color
  },
  {
    name: "calf",
    stroke: "#e66767", // Unique color
    fill: "#67e6dc", // Reused color from 'chest'
  },
  {
    name: "neck",
    stroke: "#e67e67", // Unique color
    fill: "#e66767", // Unique color
  },
];

const chartFilter = (bodyTrackings) => {
  return bodyTrackings.map((track) => ({
    hips: track?.hip ?? 0,
    neck: track?.neck ?? 0,
    calfs: track?.calf ?? 0,
    chest: track?.chest ?? 0,
    weist: track?.weist ?? 0,
    weight: track?.weight ?? 0,
    height: track?.height ?? 0,
    biceps: track?.biceps ?? 0,
    y: new Date(track?.createdAt)?.toDateString(),
  }));
};

const ClientProfileTab = ({
  ptp,
  userId,
  ptpLoading,
  subscription,
  bodyTrackings,
  subscriptionLoading,
}) => {
  const bodyData = bodyTrackings[bodyTrackings.length - 1];
  const [activePlanEndDate, setActivePlanEndDate] = useState();
  const [activeGYMPlanEndDate, setActiveGYMPlanEndDate] = useState();
  return (
    <>
      <div className="tab-content">
        <div
          id="client_profile"
          className="pro-overview tab-pane fade show active"
        >
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title mb-2">
                    Body Details
                    <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_body_details"
                    >
                      <i className="fa fa-pencil" />
                    </Link>
                  </h3>

                  <p className="mb-3 text-xs text-gray">
                    {bodyData?.createdAt
                      ? new Date(bodyData?.createdAt)?.toDateString()
                      : null}
                  </p>

                  <hr />

                  {!bodyData && (
                    <p className="text-center">No Data Available</p>
                  )}

                  {bodyData && (
                    <ul className="personal-info">
                      <ListItem
                        title={"Weight"}
                        text={bodyData?.weight ?? "unspecified"}
                      />
                      <ListItem
                        title={"Height"}
                        text={bodyData?.height ?? "unspecified"}
                      />
                      <ListItem
                        title={"BMR"}
                        text={bodyData?.bmr ?? "unspecified"}
                      />
                      <ListItem
                        title={"HIP"}
                        text={bodyData?.hip ?? "unspecified"}
                      />
                      <ListItem
                        title={"Neck"}
                        text={bodyData?.neck ?? "unspecified"}
                      />
                      <ListItem
                        title={"Weist"}
                        text={bodyData?.weist ?? "unspecified"}
                      />
                      <ListItem
                        title={"Calf"}
                        text={bodyData?.calf ?? "unspecified"}
                      />
                      <ListItem
                        title={"Chest"}
                        text={bodyData?.chest ?? "unspecified"}
                      />
                      <ListItem
                        title={"Biceps"}
                        text={bodyData?.biceps ?? "unspecified"}
                      />
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {!ptpLoading && (
              <PersonalTrainingStatus
                ptp={ptp?.at(0)}
                setActivePlanEndDate={setActivePlanEndDate}
                userId={userId}
                activePlanEndDate={activePlanEndDate}
              />
            )}
          </div>

          {!subscriptionLoading && (
            <GymMembershipStatus
              subscription={subscription?.at(0)}
              setActiveGYMPlanEndDate={setActiveGYMPlanEndDate}
            />
          )}

          <div className="col-md-12 text-center">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Progress Bar Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={chartFilter(bodyTrackings)}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid />
                    <XAxis dataKey="y" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    {chatLines.map((k, idx) => {
                      return (
                        <Line
                          key={idx}
                          fill={k.fill}
                          dot={{ r: 3 }}
                          type="monotone"
                          strokeWidth={3}
                          dataKey={k.name}
                          stroke={k.stroke}
                          activeDot={{ r: 7 }}
                        />
                      );
                    })}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        {!subscriptionLoading && (
          <PayOutstanding userId={userId} subscription={subscription.at(0)} />
        )}
        <PtpAddPopup userId={userId} />
        <ClientEditPopup userId={userId} />
        <ClientBodyDetails userId={userId} />
        <CreateSubscriptionPopup userId={userId} />
        <ExtendGYMSubscriptionPopup
          userId={userId}
          activeGYMPlanEndDate={activeGYMPlanEndDate}
        />
      </div>
    </>
  );
};

export default ClientProfileTab;

const PersonalTrainingStatus = ({
  setActivePlanEndDate,
  ptp,
  userId,
  activePlanEndDate,
}) => {
  const isPaymentOutStanding =
    parseInt(ptp?.subscription?.at(0)?.outstanding ?? 0) > 0;
  return (
    <div className="col-md-6 d-flex">
      <div className="card profile-box flex-fill">
        {ptp ? (
          <>
            <div className="card-body">
              <h3 className="card-title">
                Personal Trainer
                <Link
                  to="#"
                  className="edit-icon"
                  data-bs-toggle="modal"
                  data-bs-target="#edit_ptp"
                >
                  <i className="fa fa-pencil" />
                </Link>
              </h3>
              <div>
                <ul className="personal-info">
                  <ListItem
                    title={"Trainer"}
                    text={`${ptp?.trainer?.data?.attributes?.firstname} ${ptp?.trainer?.data?.attributes.lastname}`}
                  />
                  <ListItem
                    title={"Session"}
                    text={`${convertToReadableTime(
                      ptp?.session_from
                    )} - ${convertToReadableTime(ptp?.session_to)}`}
                  />
                </ul>
                <hr />
                {ptp?.subscription?.length ? (
                  <>
                    <div className="mt-4">
                      <h4>
                        Training Subscription ({ptp?.subscription?.at(0)?.id})
                      </h4>
                      <ul className="personal-info mt-3">
                        <ListItem
                          title={"Paid"}
                          text={ptp?.subscription.at(0).paid}
                        />
                        <ListItem
                          title={"Outstanding"}
                          text={ptp?.subscription.at(0).outstanding ?? 0}
                        />
                        <ListItem
                          title={"Payment Type"}
                          text={ptp?.subscription.at(0).payment_type}
                        />
                        <ListItem
                          title={"Duration"}
                          text={`${format(
                            new Date(ptp?.subscription.at(0)?.start),
                            "dd MMM yyyy"
                          )} - ${format(
                            new Date(ptp?.subscription.at(0)?.end),
                            "dd MMM yyyy"
                          )}`}
                        />
                      </ul>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {ptp?.subscription?.length ? (
                  <>
                    {!isPaymentOutStanding ? (
                      <>
                        <Link
                          to="#"
                          data-bs-targe
                          data-bs-toggle="modal"
                          data-bs-target="#extend_subscription"
                          className="btn btn-info"
                          onClick={() =>
                            setActivePlanEndDate(ptp.subscription[0].end)
                          }
                        >
                          Extend Subscription
                        </Link>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}

                {!ptp?.subscription?.length ? (
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#add_ptp"
                    className="btn btn-info"
                  >
                    Purchase Membership
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="card-body">
              <h3 className="card-title mb-3">Personal Trainer</h3>
              <hr />
              <p className="text-center">No Data Available</p>
              <Link
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#add_ptp"
                className="btn btn-info"
              >
                Create Personal Trainer
              </Link>
            </div>
          </>
        )}
      </div>
      <PtpEditPopup ptpId={ptp?.id} />
      <ExtendPTPSubscriptionPopup
        userId={userId}
        activePlanEndDate={activePlanEndDate}
        setActivePlanEndDate={setActivePlanEndDate}
        ptpId={ptp?.id}
      />
    </div>
  );
};

const GymMembershipStatus = ({ subscription, setActiveGYMPlanEndDate }) => {
  const isPaymentOutStanding = parseInt(subscription?.outstanding ?? 0) > 0;
  return (
    <div className="row">
      <div className="col-md-12 d-flex">
        <div className="card profile-box flex-fill">
          {/* When subscription activated */}
          {subscription && (
            <div>
              <div className="card-body">
                <h3 className="card-title">
                  GYM Subscription ({subscription?.id}){" "}
                </h3>
                <>
                  <ul className="personal-info">
                    <ListItem
                      title={"Plan"}
                      text={subscription?.plan?.data?.attributes?.title}
                    />
                    <ListItem
                      title={"Duration"}
                      text={`${format(
                        new Date(subscription?.start),
                        "dd MMM yyyy"
                      )} - ${format(
                        new Date(subscription?.end),
                        "dd MMM yyyy"
                      )}`}
                    />
                    <ListItem title={"Paid"} text={subscription?.paid} />
                    <ListItem
                      title={"Outstanding"}
                      text={subscription?.outstanding ?? 0}
                    />
                    <ListItem
                      title={"Payment Type"}
                      text={subscription?.payment_type}
                    />
                  </ul>
                  {!isPaymentOutStanding && (
                    <Link
                      to="#"
                      data-bs-toggle="modal"
                      className="btn btn-info"
                      data-bs-target="#extend_gym_subscription"
                      onClick={() => setActiveGYMPlanEndDate(subscription?.end)}
                    >
                      Extend Subscription
                    </Link>
                  )}
                </>
              </div>
            </div>
          )}

          {!subscription && (
            <div className="card-body">
              <h3 className="card-title">GYM Subscription</h3>
              <Link
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#create_subscription"
                className="btn btn-info"
              >
                Create Subscription
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function convertToReadableTime(timeString) {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes] = timeString?.split(":").map(Number);

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
