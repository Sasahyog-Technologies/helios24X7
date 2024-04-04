import { format } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import { ListItem } from "../Profile/ProfileContent";

const InvoiceDetailsTab = ({ subscription, invoiceLoading, invoice }) => {
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
                {invoiceLoading ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  <>
                    {subscription ? (
                      <>
                        <div>
                          <div className="card-body">
                            <h3 className="card-title text-capitalize">
                              {subscription?.type
                                ? subscription?.type?.split("-").join(" ")
                                : "Subscription"}
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
                                    subscription?.plan?.data?.attributes?.title
                                  }
                                />
                                <ListItem
                                  title={"Paid"}
                                  text={subscription?.paid}
                                />
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
                            </>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="card-body">
                          <h3 className="card-title">Subscription</h3>
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

            {/* ----------------------------------- */}
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                {invoiceLoading ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  <>
                    {invoice ? (
                      <>
                        <div>
                          <div className="card-body">
                            <h3 className="card-title text-capitalize">
                              Invoice
                            </h3>
                            <>
                              <ul className="personal-info">
                                <ListItem
                                  title={"Invoice No."}
                                  text={invoice.invoice_number}
                                />
                                <ListItem
                                  title={"Amount"}
                                  text={invoice.amount}
                                />
                                <ListItem
                                  title={"Outstanding"}
                                  text={invoice.outstanding}
                                />

                                <ListItem
                                  title={"Date"}
                                  text={
                                    invoice.invoice_date ? (
                                      <>
                                        {format(
                                          new Date(invoice.invoice_date),
                                          "dd MMM yyyy"
                                        )}
                                      </>
                                    ) : (
                                      ""
                                    )
                                  }
                                />
                              </ul>
                            </>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="card-body">
                          <h3 className="card-title">Invoice</h3>
                          <Link
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#create_subscription"
                            className="btn btn-info"
                          >
                            Invoice Not Available
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
      </div>
      {/*   <ClientEditPopup userId={userId} /> */}
    </>
  );
};

export default InvoiceDetailsTab;
