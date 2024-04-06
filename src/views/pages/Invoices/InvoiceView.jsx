import React from "react";
import { hlogo } from "../../../Routes/ImagePath";

const InvoiceView = ({
  invoice_date,
  amount,
  outstanding,
  userFirstName,
  userLastName,
  planName,
  planPrice,
  userMobile,
  paymentType,
}) => {
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
                      <li>HELIOS GYM</li>
                      <li>
                        2nd Floor, Singh Tower, Stadium Road Delapeer, Bareilly
                      </li>
                      <li>7983411035, 9058619990</li>
                      <li> GST: 09ACXPK1920G1ZD</li>
                    </ul>
                  </div>
                  <div className="col-sm-6 m-b-20">
                    <div className="invoice-details">
                      <h3 className="text-uppercase">Invoice #INV-0001</h3>
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
                          <div className="font-weight-bold">
                            {planName} @ {planPrice}
                          </div>
                          <div>
                            {invoice_date} - {invoice_date}
                          </div>
                        </td>
                        <td className="text-end">₹{planPrice}</td>
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
                                <td className="text-end">₹{planPrice}</td>
                              </tr>
                              <tr>
                                <th>Discount: </th>
                                <td className="text-end">0</td>
                              </tr>
                              <tr>
                                <th>SGST@9: </th>
                                <td className="text-end">0</td>
                              </tr>
                              <tr>
                                <th>CGST@9: </th>
                                <td className="text-end">0</td>
                              </tr>
                              <tr>
                                <th>Grand Total:</th>
                                <td className="text-end text-primary">
                                  <h5>₹{planPrice}</h5>
                                </td>
                              </tr>
                              <tr>
                                <th>Payment:</th>
                                <td className="text-end text-primary">
                                  <h5>₹{amount}</h5>
                                </td>
                              </tr>
                              <tr>
                                <th>Balance:</th>
                                <td className="text-end text-primary">
                                  <h5>₹{outstanding}</h5>
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
