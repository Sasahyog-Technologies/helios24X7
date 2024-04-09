import { format } from "date-fns";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Loading from "../../../components/Loading";
import { ListItem } from "../Profile/ProfileContent";
import PtpAddPopup from "../../../components/modelpopup/Client/PTPAddPopup";
import ClientEditPopup from "../../../components/modelpopup/Client/ClientEditPopup";
import ClientBodyDetails from "../../../components/modelpopup/Client/CliendBodyDetails";
import CreateSubscriptionPopup from "../../../components/modelpopup/Client/CreateSubscription";
import ExtendPTPSubscriptionPopup from "../../../components/modelpopup/Client/ExtendPTPSubscription";
import ExtendGYMSubscriptionPopup from "../../../components/modelpopup/Client/ExtendGYMSubscription";
import {
  Line,
  YAxis,
  XAxis,
  Legend,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
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

const MyProfileTab = ({
  ptp,
  userId,
  ptpLoading,
  bodyDetails,
  subscription,
  bodyTrackings,
  subscriptionLoading,
}) => {
  const bodyData = bodyTrackings[bodyTrackings.length - 1];
  const [activePlanEndDate, setActivePlanEndDate] = useState();
  const [activeGYMPlanEndDate] = useState();
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
                      data-bs-target="#edit_body_details"
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
                                          ) : null
                                        }
                                      />
                                    </ul>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
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
            <div className="col-md-12 d-flex">
              <div className="card profile-box flex-fill">
                {subscriptionLoading ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  <>
                    {subscription?.length ? (
                      <>
                        <div>
                          <div className="card-body">
                            <h3 className="card-title">
                              GYM Subscription ({subscription[0].id})
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
                            </>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="card-body">
                          <h3 className="card-title">GYM Subscription</h3>
                          <p>GYM Subscription not Available</p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

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

                      {chatLines.map((k) => {
                        return (
                          <Line
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

        <ClientBodyDetails userId={userId} />
        <ExtendGYMSubscriptionPopup
          userId={userId}
          activeGYMPlanEndDate={activeGYMPlanEndDate}
        />
      </div>
    </>
  );
};

export default MyProfileTab;

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
