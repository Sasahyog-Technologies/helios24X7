/* eslint-disable jsx-a11y/img-redundant-alt */
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Loading from "../../../components/Loading";
import request from "../../../sdk/functions";
import InvoiceDetailsTab from "./InvoiceDetailsTab";

const InvoiceDetials = () => {
  const path = window.location.pathname;
  const invoiceId = path.split("/")[path.split("/").length - 1];

  const { data: invoiceData, isLoading: invoiceLoading } = useQuery({
    queryKey: ["invoice-data"],
    queryFn: async () => {
      if (invoiceId) {
        const data = await request.findOne("invoice", invoiceId, {
          populate: ["user", "payment", "subscription", "subscription.plan"],
        });
        return data.data.attributes; /* .map((item) => {
          return {
            ...item?.attributes,
            id: item?.id,
            subscription: item.attributes?.subscription?.data.map((item) => {
              return {
                ...item?.attributes,
                id: item?.id,
              };
            }),
          };
        }); */
      }
      return null;
    },
  });

  // console.log(invoiceData);

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Invoice"
            title="Dashboard"
            subtitle="Details"
          />
          {invoiceLoading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              {invoiceData ? (
                <>
                  <div className="card mb-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="profile-view">
                            <div className="profile-img-wrap">
                              <div className="profile-img text-uppercase bg-info rounded-circle d-flex justify-content-center align-items-center display-3">
                                {`${
                                  invoiceData?.user?.data?.attributes?.firstname?.split(
                                    ""
                                  )[0]
                                }`}
                              </div>
                            </div>
                            <div className="profile-basic">
                              <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-md-5">
                                  <div className="profile-info-left">
                                    <h3 className="invoice-name m-t-0 mb-0 text-capitalize">
                                      {
                                        invoiceData?.user?.data?.attributes
                                          ?.firstname
                                      }{" "}
                                      {
                                        invoiceData?.user?.data?.attributes
                                          ?.lastname
                                      }
                                    </h3>
                                    <h6 className="text-muted mt-2">
                                      Invoice Number:{" "}
                                      {invoiceData.invoice_number}
                                    </h6>
                                    {/* <div className="staff-id">Plan :</div> */}
                                    <div className="small doj text-muted">
                                      Invoice Date :{" "}
                                      {format(
                                        new Date(invoiceData.invoice_date),
                                        "dd MMM yyyy"
                                      )}
                                    </div>

                                    <div className="staff-msg">
                                      <Link
                                        className="btn btn-custom"
                                        to="/call/chat"
                                      >
                                        Send Invoice
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-7">
                                  <ul className="personal-info">
                                    <li>
                                      <div className="title">Phone:</div>
                                      <div className="text">
                                        <Link
                                          to={`tel:${invoiceData?.user?.data?.attributes?.mobile}`}
                                        >
                                          {
                                            invoiceData?.user?.data?.attributes
                                              ?.mobile
                                          }
                                        </Link>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="title">Birthday:</div>
                                      <div className="text">
                                        {format(
                                          new Date(
                                            invoiceData?.user?.data?.attributes?.birthdate
                                          ),
                                          "dd MMM yyyy"
                                        )}
                                      </div>
                                    </li>
                                    <li>
                                      <div className="title">Gender:</div>
                                      <div className="text text-capitalize">
                                        {
                                          invoiceData?.user?.data?.attributes
                                            ?.gender
                                        }
                                      </div>
                                    </li>
                                    {/*    <li>
                                      <div className="title">Branch:</div>
                                      <div className="text">
                                        {invoiceData.branch.name}
                                      </div>
                                    </li> */}
                                  </ul>
                                </div>
                              </div>
                            </div>
                            {/*   <div className="pro-edit">
                              <Link
                                data-bs-target="#profile_info"
                                data-bs-toggle="modal"
                                className="edit-icon"
                                to="#"
                              >
                                <i className="fa-solid fa-pencil"></i>
                              </Link>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <InvoiceDetailsTab
                    invoice={invoiceData}
                    invoiceLoading={invoiceLoading}
                    subscription={invoiceData?.subscription?.data?.attributes}
                  />
                </>
              ) : (
                <>
                  <div>Cleint Not Found</div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InvoiceDetials;
