import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { format } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PaymentDeletePopup from "../../../components/modelpopup/payment/DeletePaymentPopup";
import PaymentEditPopup from "../../../components/modelpopup/payment/EditPaymentPopup";
import useOwnerManager from "../../../Hook/useOwnerManager";
import request from "../../../sdk/functions";
import PaymentListFilter from "./PaymentListFilter";

const PaymentList = () => {
  const [paymentsId, setpaymentsId] = useState(null);
  const isWebDevice = useMediaQuery("(min-width:700px)");
  const { isOwner, isOwnerManager } = useOwnerManager();

  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      render: (text, record) => (
        <span className="w-100 text-capitalize">{text}</span>
      ),
    },
    {
      title: "Subscription Type",
      dataIndex: "subscriptionType",
      render: (text, record) => (
        <span className="w-100 text-capitalize">{text}</span>
      ),
    },

    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => <span>{text}</span>,
    },

    {
      title: "Discount",
      dataIndex: "discount",
      render: (text, record) => <span>{text ? text : "0"}</span>,
    },
    {
      title: "Payment Date",
      dataIndex: "payment_date",
      render: (text, record) => (
        <span>{format(new Date(text), "dd/MM/yyyy")}</span>
      ),
    },
    {
      title: "Payment Type",
      dataIndex: "payment_type",
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
      render: (text, record) => <span>{text ? text : "0"}</span>,
    },
    isOwnerManager
      ? {
          title: "Action",
          render: (user) => (
            <div
              className="dropdown dropdown-action text-end" /* style={{zIndex:100}} */
            >
              <Link
                to="#"
                className="action-icon dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="material-icons">more_vert</i>
              </Link>

              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#edit_payment"
                  onClick={() => setpaymentsId(user.id)}
                >
                  <i className="fa fa-pencil m-r-5" /> Edit
                </Link>

                {isOwner ? (
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_payment"
                    onClick={() => setpaymentsId(user.id)}
                  >
                    <i className="fa fa-trash m-r-5" /> Delete
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          ),
        }
      : {},
  ];

  /* --------------------------------------------------------------------------- */

  const deviceColumns = [
    {
      render: (record, key, index) => {
        return (
          <div>
            {isOwnerManager ? (
              <div className="d-flex justify-content-between">
                {<div className="fw-bold fs-6"></div>}
                <div
                  className="dropdown dropdown-action text-end" /* style={{zIndex:100}} */
                >
                  <Link
                    to="#"
                    className="action-icon dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="material-icons">more_vert</i>
                  </Link>

                  <div className="dropdown-menu dropdown-menu-right">
                    <Link
                      className="dropdown-item"
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
                      onClick={() => setpaymentsId(record.id)}
                    >
                      <i className="fa fa-pencil m-r-5" /> Edit
                    </Link>

                    {isOwner ? (
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_payment"
                        onClick={() => setpaymentsId(record.id)}
                      >
                        <i className="fa fa-trash m-r-5" /> Delete
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">User Name</span>
                <span> {record?.username}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Subscription Type </span>
                <span> {record?.subscriptionType}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Amount </span>
                <span>{record?.amount}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Discount </span>
                <span>{record?.discount ? record?.discount : "0"}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Payment Date </span>
                <span>
                  <span>
                    {format(new Date(record?.payment_date), "dd/MM/yyyy")}
                  </span>
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Payment Type </span>
                <span>{record?.payment_type}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Status </span>
                <span>{record?.status}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Outstanding </span>
                <span>{record?.outstanding ? record?.outstanding : "0"}</span>
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  /* --------------------------------------------------------------------------- */

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
      total: 0,
    },
  });

  const [query, setQuery] = useState({
    search: "",
    type: "",
  });

  const {
    data: paymentsData,
    isLoading: paymentsIsLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["payment-list"],
    queryFn: async () => {
      const data = await request.findMany("payment", {
        populate: ["user", "subscription"],
        filters: {
          $and: [
            {
              user: {
                $or: [
                  {
                    firstname: {
                      $containsi: query.search.split(" ")[0],
                    },
                    lastname: {
                      $containsi: query.search.split(" ")[1] || "",
                    },
                  },
                  {
                    mobile: {
                      $containsi: query.search,
                    },
                  },
                ],
              },
            },
            {
              subscription: {
                type: {
                  $containsi: query.type,
                },
              },
            },
          ],
        },
      });
      setTableParams({
        ...tableParams,
        pagination: { ...tableParams.pagination, total: data.length },
      });

      // return formetter(data);
      return data.data.map((itm) => {
        return {
          ...itm.attributes,
          id: itm.id,
          username: `${itm.attributes.user.data.attributes.firstname} ${itm.attributes.user.data.attributes.lastname}`,
          subscriptionType: `${itm.attributes?.subscription?.data?.attributes?.type
            ?.split("-")
            .join(" ")}`,
        };
      });
    },
  });

  //console.log(paymentsData);

  const handleTableChange = (pagination, filters, sorter) => {
    //console.log("handleTableChange");
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      // setData([]);
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Payments"
            title="Dashboard"
            subtitle="Payments"
            isOwnerManager={isOwnerManager}
          />
          {/* /Page Header */}
          <PaymentListFilter
            refetch={refetch}
            query={query}
            setQuery={setQuery}
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={paymentsIsLoading || isRefetching}
                  className="table-striped"
                  columns={isWebDevice ? columns : deviceColumns}
                  dataSource={paymentsData}
                  pagination={{
                    total: tableParams.pagination.total,
                    showSizeChanger: true,
                  }}
                  //  rowClassName={"cursor-pointer"}
                  rowKey={(record) => record.id}
                  onChange={handleTableChange}
                  /*   onRow={(record, rowIndex) => {
                    return {
                      onClick: event => {navigate(`/owner/client-profile/${record.id}`)}, // click row
                    };
                  }} */
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}

        <PaymentDeletePopup refetch={refetch} paymentId={paymentsId} />
        <PaymentEditPopup refetch={refetch} paymentId={paymentsId} />
      </div>
    </div>
  );
};

export default PaymentList;
