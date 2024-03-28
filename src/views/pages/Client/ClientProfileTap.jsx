import React from "react";
import { Link } from "react-router-dom";
import ClientEditPopup from "../../../components/modelpopup/Client/ClientEditPopup";
import { ListItem } from "../Profile/ProfileContent";
import { format } from "date-fns";
import Loading from "../../../components/Loading";

const ClientProfileTab = ({
  bodyDetails,
  userId,
  subscription,
  subscriptionLoading,
  ptp,
  ptpLoading,
}) => {
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
                    Body Details{" "}
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
                    <ListItem title={"Weight"} text={bodyDetails?.weight} />
                    <ListItem title={"Height"} text={bodyDetails?.height} />
                    <ListItem title={"BMR"} text={bodyDetails?.bmr} />
                    <ListItem title={"HIP"} text={bodyDetails?.hip} />
                    <ListItem title={"Neck"} text={bodyDetails?.neck} />
                    <ListItem title={"Weist"} text={bodyDetails?.weist} />
                    <ListItem title={"Calf"} text={bodyDetails?.calf} />
                    <ListItem title={"Chest"} text={bodyDetails?.chest} />
                    <ListItem title={"Biceps"} text={bodyDetails?.biceps} />
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Personal Training Program
                    <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#emergency_contact_modal"
                    >
                      <i className="fa fa-pencil" />
                    </Link>
                  </h3>
                  {ptpLoading ? (
                    <>
                      <Loading />
                    </>
                  ) : (
                    <>
                      {ptp ? (
                        <>
                          {ptp.map((p, index) => (
                            <div key={index}>
                              <ul className="personal-info">
                                <ListItem
                                  title={"Trainer"}
                                  text={`${p.trainer.data.attributes.firstname} ${p.trainer.data.attributes.lastname}`}
                                />
                                <ListItem
                                  title={"Session From"}
                                  text={p.session_from}
                                />
                                <ListItem
                                  title={"Session To"}
                                  text={p.session_to}
                                />
                              </ul>
                              <hr />
                              {p.subscription ? (
                                <>
                                  {p.subscription.map((subs, index) => (
                                    <div key={index}>
                                      <h4>Trainer Subscription {index + 1}</h4>
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
                                      <button className="btn btn-info">
                                        Extend Subscription
                                      </button>
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <>
                                  <button className="btn btn-info">
                                    Create Subscription
                                  </button>
                                </>
                              )}
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <button className="btn btn-info">
                            Create Subscription
                          </button>{" "}
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
                    {subscription &&
                      subscription.map((subs, index) => (
                        <div key={index}>
                          <div className="card-body">
                            <h3 className="card-title">
                              GYM Subscription {index + 1}
                              <Link
                                to="#"
                                className="edit-icon"
                                data-bs-toggle="modal"
                                data-bs-target="#emergency_contact_modal"
                              >
                                <i className="fa fa-pencil" />
                              </Link>
                            </h3>

                            {subs ? (
                              <>
                                <ul className="personal-info">
                                  <ListItem
                                    title={"Plan"}
                                    text={subs.plan.data.attributes.title}
                                  />
                                  <ListItem title={"Paid"} text={subs.paid} />
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
                                <button className="btn btn-info">
                                  Extend Subscription
                                </button>
                              </>
                            ) : (
                              <>
                                <button className="btn btn-info">
                                  Create Subscription
                                </button>{" "}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <ClientEditPopup userId={userId} />
      </div>
    </>
  );
};

export default ClientProfileTab;
