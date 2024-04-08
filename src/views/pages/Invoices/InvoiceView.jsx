import React from "react";
import { hlogo } from "../../../Routes/ImagePath";

const InvoiceView = ({
  end,
  start,
  amount,
  branchData,
  invoice_date,
  outstanding,
  userFirstName,
  userLastName,
  planName,
  planPrice,
  userMobile,
  paymentType,
  invoiceNumber,
  subscriptionType,
  trainer,
}) => {
  const trainerSubscription = subscriptionType === "trainer-subscription";

  return (
    <>
      <div className="content container-fluid">
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6 m-b-20">
                    <img src={hlogo} className="inv-logo" alt="Logo" />
                    <ul className="list-unstyled">
                      <li>{branchData?.name}</li>
                      <li>{branchData?.location}</li>
                      <li>{branchData?.mobile}</li>
                      <li> GST - {branchData?.gstnumber}</li>
                    </ul>
                  </div>
                  <div className="col-sm-6 m-b-20">
                    <div className="invoice-details">
                      <h3 className="text-uppercase">
                        Invoice #HL{invoiceNumber}
                      </h3>
                      <ul className="list-unstyled">
                        <li>
                          Date: <span>{invoice_date}</span>
                        </li>
                        <li>
                          Due date: <span>{invoice_date}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-lg-7 col-xl-8 m-b-20">
                    <h5>Invoice to:</h5>
                    <ul className="list-unstyled">
                      <li>
                        <h5>
                          <strong>
                            {userFirstName} {userLastName}
                          </strong>
                        </h5>
                      </li>
                      <li>{userMobile}</li>
                    </ul>
                  </div>

                  <div className="col-sm-6 col-lg-5 col-xl-4 m-b-20">
                    <span className="text-muted">Payment Details:</span>
                    <ul className="list-unstyled invoice-payment-details">
                      <li>
                        Payment Mode:{" "}
                        <span className="uppercase">{paymentType}</span>
                      </li>
                      <li>
                        Received By: <span>Helios gym </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Plan Name</th>
                        <th className="text-end">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          {!trainerSubscription && (
                            <div className="font-weight-bold">
                              <b>{planName}</b>
                              {!trainerSubscription && (
                                <p>
                                  {new Date(start).toDateString()} {" - "}
                                  {new Date(end).toDateString()}
                                </p>
                              )}
                            </div>
                          )}

                          {trainerSubscription && (
                            <div className="font-weight-bold">
                              {trainer} PTP @ {amount}
                            </div>
                          )}

                          {/* <div>
                            {invoice_date} - {invoice_date}
                          </div> */}
                        </td>
                        <td className="text-end">₹{planPrice ?? amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <div className="row invoice-payment">
                    <div className="col-sm-7"></div>
                    <div className="col-sm-5">
                      <div className="m-b-20">
                        <div className="table-responsive no-border">
                          <table className="table mb-0">
                            <tbody>
                              <tr>
                                <th>Subtotal:</th>
                                <td className="text-end">
                                  ₹{planPrice ?? amount}
                                </td>
                              </tr>
                              <tr>
                                <th>Discount: </th>
                                <td className="text-end">0</td>
                              </tr>
                              <tr>
                                <th>SGST@9: </th>
                                <td className="text-end">
                                  ₹
                                  {percentage(
                                    parseFloat(planPrice ?? amount),
                                    9
                                  ).toFixed(2)}
                                </td>
                              </tr>
                              <tr>
                                <th>CGST@9: </th>
                                <td className="text-end">
                                  ₹
                                  {percentage(
                                    parseFloat(planPrice ?? amount),
                                    9
                                  ).toFixed(2)}
                                </td>
                              </tr>
                              <tr>
                                <th>Grand Total:</th>
                                <td className="text-end text-primary">
                                  <h5>
                                    ₹
                                    {(
                                      parseFloat(planPrice ?? amount) +
                                      percentage(
                                        parseFloat(planPrice ?? amount),
                                        18
                                      )
                                    ).toFixed(2)}
                                  </h5>
                                </td>
                              </tr>
                              <tr>
                                <th>Payment:</th>
                                <td className="text-end text-primary">
                                  <h5>₹{parseFloat(amount).toFixed(2)}</h5>
                                </td>
                              </tr>
                              <tr>
                                <th>Balance:</th>
                                <td className="text-end text-primary">
                                  <h5>₹{parseFloat(outstanding).toFixed(2)}</h5>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceView;

const percentage = (value, percent) => {
  if (typeof value !== "number" || typeof percent !== "number") {
    throw new Error("Both arguments must be numbers");
  }

  if (percent < 0 || percent > 100) {
    throw new Error("Percentage must be between 0 and 100");
  }

  return (value * percent) / 100;
};
