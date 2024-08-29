import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import React, { useRef } from "react";
import { hlogo } from "../../../Routes/ImagePath";

const InvoiceView = ({
  end,
  start,
  amount,
  discount,
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

  const inputRef = useRef(null);
  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  return (
    <>
      <div style={{ overflow: "scroll" }} className="content container-fluid">
        {/* /Page Header */}
        <div className="row">
          <div className="mb-3">
            <button className="btn btn-primary" onClick={printDocument}>
              download
            </button>
          </div>

          <div
            id="divToPrint"
            ref={inputRef}
            style={{
              width: "800px",
              margin: "auto",
              padding: "30px",
              maxWidth: "800px",
              background: "white",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <section>
                  <div>
                    <img src={hlogo} className="inv-logo" alt="Logo" />
                  </div>
                  <div>
                    <ul>
                      <li
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {branchData?.name}
                      </li>
                      <li>{branchData?.location}</li>
                      <li>{branchData?.mobile}</li>
                      <li> GST - {branchData?.gstnumber}</li>
                    </ul>
                  </div>
                </section>
                <section>
                  <h3 className="text-uppercase">Invoice #HL{invoiceNumber}</h3>
                  <ul className="list-unstyled">
                    <li>
                      Date: <span>{invoice_date}</span>
                    </li>
                    <li>
                      Due date: <span>{invoice_date}</span>
                    </li>
                  </ul>
                </section>
              </div>
              <div
                style={{
                  margin: "50px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <section>
                  <span className="text-muted">Invoice to :</span>
                  <ul className="list-unstyled invoice-payment-details">
                    <li>
                      <h5>
                        <strong>
                          {userFirstName} {userLastName}
                        </strong>
                      </h5>
                    </li>
                    <li className="mt-1">{userMobile}</li>
                  </ul>
                </section>
                <section>
                  <span className="text-muted">Payment Details:</span>
                  <ul className="list-unstyled invoice-payment-details">
                    <li>
                      <b>Payment Mode</b> :{" "}
                      <span className="text-capitalize">{paymentType}</span>
                    </li>
                    <li>
                      <b>Received By</b> : <span>Helios gym </span>
                    </li>
                  </ul>
                </section>
              </div>

              <div>
                <div className="table-responsive">
                  <table className="table">
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
                                <p
                                  style={{
                                    color: "gray",
                                    fontWeight: "normal",
                                    fontSize: "12px",
                                  }}
                                >
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
                        </td>
                        <td
                          className="text-end"
                          style={{
                            background: "white",
                          }}
                        >
                          ₹{((planPrice ?? amount) / 1.18).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                }}
              >
                <section
                  style={{
                    flex: "1",
                    marginTop: "20px",
                    paddingRight: "50px",
                  }}
                >
                  <strong>Terms & Conditions:</strong>
                  <ul
                    style={{
                      fontSize: "10px",
                      color: "gray",
                    }}
                  >
                    <br /> 1. Payment Terms: Payment is due within the timeframe
                    specified by Helios Gym. Helios Gym reserves the right to
                    suspend or terminate services for overdue accounts. <br />{" "}
                    <br />
                    2. Refund Policy: Payments made are non-refundable, except
                    in cases where Helios Gym deems a refund appropriate. 3.
                    Dispute Resolution: Any disputes regarding this invoice must
                    be reported within <br /> <br />3 days of receipt. After
                    this period, the invoice will be considered accurate and
                    due.
                    <br /> <br /> 4. Taxes: All applicable taxes are included in
                    the invoice unless stated otherwise. <br /> <br /> 5.
                    Liability: Helios Gym is not liable for any personal
                    injuries or damages occurring on the premises, except where
                    negligence is proven on our part. <br /> <br /> 6. Data
                    Protection: Customer data will be handled in accordance with
                    our privacy policy and will not be shared with third parties
                    without consent, except as required by law.
                  </ul>
                </section>

                <section
                  style={{
                    flex: "1",
                  }}
                >
                  <div className="table-responsive no-border">
                    <table className="table mb-0">
                      <tbody>
                        <tr>
                          <th>Subtotal:</th>
                          <td className="text-end">
                            ₹{((planPrice ?? amount) / 1.18).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <th>Discount: </th>
                          <td className="text-end">
                            ₹{discount ? discount : "0"}
                          </td>
                        </tr>
                        <tr>
                          <th>SGST@9: </th>
                          <td className="text-end">
                            ₹
                            {percentage(
                              parseFloat((planPrice ?? amount) / 1.18),
                              9
                            ).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <th>CGST@9: </th>
                          <td className="text-end">
                            ₹
                            {percentage(
                              parseFloat((planPrice ?? amount) / 1.18),
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
                                parseFloat((planPrice ?? amount) / 1.18) +
                                percentage(
                                  parseFloat((planPrice ?? amount) / 1.18),
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
                            <h5>
                              ₹
                              {outstanding
                                ? parseFloat(outstanding).toFixed(2)
                                : "0"}
                            </h5>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    style={{
                      marginTop: "150px",
                      marginLeft: "90px",
                      // display: "flex",
                      // alignItems: "end",
                      // justifyContent: "end",
                    }}
                  >
                    <h5>Authorised Signature / Stamp</h5>
                  </div>
                </section>
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
