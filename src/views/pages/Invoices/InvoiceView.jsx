import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import React, { useRef } from "react";
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
                  <h5>Invoice to:</h5>
                  <ul className="">
                    <li>
                      <h5>
                        <strong>
                          {userFirstName} {userLastName}
                        </strong>
                      </h5>
                    </li>
                    <li>{userMobile}</li>
                  </ul>
                </section>
                <section>
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
                        </td>
                        <td
                          className="text-end"
                          style={{
                            background: "white",
                          }}
                        >
                          ₹{planPrice ?? amount}
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
                  }}
                ></section>

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
                          <td className="text-end">₹{planPrice ?? amount}</td>
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
                                percentage(parseFloat(planPrice ?? amount), 18)
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
