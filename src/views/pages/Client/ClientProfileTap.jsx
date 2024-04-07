import { format } from "date-fns";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { ListItem } from "../Profile/ProfileContent";
import PtpAddPopup from "../../../components/modelpopup/Client/PTPAddPopup";
import ClientEditPopup from "../../../components/modelpopup/Client/ClientEditPopup";
import CreateSubscriptionPopup from "../../../components/modelpopup/Client/CreateSubscription";
import PayOutstanding from "../../../components/modelpopup/Client/PayOutstandingPopup";
import ExtendPTPSubscriptionPopup from "../../../components/modelpopup/Client/ExtendPTPSubscription";
import ExtendGYMSubscriptionPopup from "../../../components/modelpopup/Client/ExtendGYMSubscription";

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
          id="client_profile"
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

            {!ptpLoading && (
              <PersonalTrainingStatus
                ptp={ptp?.at(0)}
                setActivePlanEndDate={setActivePlanEndDate}
              />
            )}
          </div>

          {!subscriptionLoading && (
            <GymMembershipStatus
              subscription={subscription?.at(0)}
              setActiveGYMPlanEndDate={setActiveGYMPlanEndDate}
            />
          )}
        </div>
        {!subscriptionLoading && (
          <PayOutstanding userId={userId} subscription={subscription.at(0)} />
        )}
        <PtpAddPopup userId={userId} />
        <ClientEditPopup userId={userId} />
        <CreateSubscriptionPopup userId={userId} />
        <ExtendPTPSubscriptionPopup
          userId={userId}
          activePlanEndDate={activePlanEndDate}
          ptpId={ptp && ptp.length ? ptp[0].id : ""}
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

const PersonalTrainingStatus = ({ setActivePlanEndDate, ptp }) => {
  return (
    <div className="col-md-6 d-flex">
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <h3 className="card-title">Personal Trainer</h3>{" "}
          <div>
            <ul className="personal-info">
              <ListItem
                title={"Trainer"}
                text={`${ptp.trainer.data?.attributes.firstname} ${ptp.trainer.data?.attributes.lastname}`}
              />
              <ListItem
                title={"Session"}
                text={`${convertToReadableTime(
                  ptp?.session_from
                )} - ${convertToReadableTime(ptp?.session_to)}`}
              />
            </ul>
            <hr />
            {ptp?.subscription?.length && (
              <>
                <div className="mt-4">
                  <h4>Training Subscription ({ptp.subscription.at(0).id})</h4>
                  <ul className="personal-info mt-3">
                    <ListItem
                      title={"Paid"}
                      text={ptp.subscription.at(0).paid}
                    />
                    <ListItem
                      title={"Outstanding"}
                      text={ptp.subscription.at(0).outstanding ?? 0}
                    />
                    <ListItem
                      title={"Payment Type"}
                      text={ptp.subscription.at(0).payment_type}
                    />
                    <ListItem
                      title={"Duration"}
                      text={`${format(
                        new Date(ptp.subscription.at(0)?.start),
                        "dd MMM yyyy"
                      )} - ${format(
                        new Date(ptp.subscription.at(0)?.end),
                        "dd MMM yyyy"
                      )}`}
                    />
                  </ul>
                </div>
              </>
            )}
            {ptp?.subscription?.length && (
              <Link
                to="#"
                data-bs-target="#extend_subscription"
                className="btn btn-info"
                data-bs-toggle="modal"
                onClick={() => setActivePlanEndDate(ptp.subscription[0].end)}
              >
                Extend Subscription
              </Link>
            )}

            {!ptp?.subscription?.length && (
              <Link
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#add_ptp"
                className="btn btn-info"
              >
                Purchase Membership
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GymMembershipStatus = ({ subscription, setActiveGYMPlanEndDate }) => {
  const isPaymentOutStanding = parseInt(subscription?.outstanding ?? 0) > 0;
  return (
    <div className="row">
      <div className="col-md-6 d-flex">
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

                  {isPaymentOutStanding && (
                    <Link
                      to="#"
                      data-bs-toggle="modal"
                      className="btn btn-info"
                      data-bs-target="#pay_outstanding"
                      onClick={() => setActiveGYMPlanEndDate(subscription?.end)}
                    >
                      Pay Outstanding
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
