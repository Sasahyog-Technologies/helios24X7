import React from "react";
import { Link } from "react-router-dom";
import ClientEditPopup from "../../../components/modelpopup/Client/ClientEditPopup";
import { ListItem } from "../Profile/ProfileContent";
import { format } from "date-fns";

const ClientProfileTab = ({ bodyDetails, userId, subscription }) => {
  const primaryContactData = [
    { id: 1, title: "Name", text: "John Doe" },
    { id: 2, title: "Relationship", text: "Father" },
    { id: 3, title: "Phone", text: "9876543210, 9876543210" },
  ];

  const secondaryContactData = [
    { id: 1, title: "Name", text: "Karen Wills" },
    { id: 2, title: "Relationship", text: "Brother" },
    { id: 3, title: "Phone", text: "9876543210, 9876543210" },
  ];

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
                  <ul className="personal-info">
                    {primaryContactData.map((item, index) => (
                      <ListItem
                        id={item.id}
                        key={index}
                        title={item.title}
                        text={item.text}
                      />
                    ))}
                  </ul>
                  <hr />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    GYM Subscription
                    <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#emergency_contact_modal"
                    >
                      <i className="fa fa-pencil" />
                    </Link>
                  </h3>

                  {subscription ? (
                    <>
                      <ul className="personal-info">
                        <ListItem
                          title={"Plan"}
                          text={subscription.plan.title}
                        />
                        <ListItem title={"Paid"} text={subscription.paid} />
                        <ListItem
                          title={"Outstanding"}
                          text={subscription.outstanding}
                        />
                        <ListItem
                          title={"Start"}
                          text={format(
                            new Date(subscription.start),
                            "dd MMM yyyy"
                          )}
                        />
                        <ListItem
                          title={"End"}
                          text={
                            subscription.end ? (
                              <>
                                {format(
                                  new Date(subscription.end),
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
                          text={subscription.payment_type}
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
            </div>
          </div>
        </div>
        <ClientEditPopup userId={userId} />
      </div>
    </>
  );
};

export default ClientProfileTab;
