import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { format } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PaymentListFilter from "../../../components/ClientListFilters";
import ClientDeletePopup from "../../../components/modelpopup/Client/ClientDeletePopup";
import PaymentDeletePopup from "../../../components/modelpopup/payment/DeletePaymentPopup";
import request from "../../../sdk/functions";
import PaymentEditPopup from "../../../components/modelpopup/payment/EditPaymentPopup";

const PaymentList = () => {
  const [paymentsId, setpaymentsId] = useState(null);
  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      render: (text, record) => (
        <span className="w-100 text-capitalize">
          {text}
          {/*  <Link to={`/owner/client-profile/${record.id}`}>{text}</Link> */}
        </span>
      ),
    },
    {
      title: "Label",
      dataIndex: "label",
      render: (text, record) => (
        <span className="table-avatar">
          {text}
          {/*     <Link to={`/owner/client-profile/${record.id}`}>
            {text}
          </Link> */}
        </span>
      ),
    },

    {
      title: "Subscription Type",
      dataIndex: "subscriptionType",
      render: (text, record) => (
        <span className="w-100 text-capitalize">
          {text}
          {/*    <Link to={`/owner/client-profile/${record.id}`}>{text}</Link> */}
        </span>
      ),
    },

    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => (
        <span>
          {/*    <Link to={`/owner/client-profile/${record.id}`}>
            {" "}
            {format(new Date(text), "dd/MM/yyyy")}
          </Link> */}
          {text}
        </span>
      ),
    },
    {
      title: "Payment Date",
      dataIndex: "payment_date",
      render: (text, record) => (
        <span>
          {format(new Date(text), "dd/MM/yyyy")}
          {/*   <Link to={`/owner/client-profile/${record.id}`}>
            {" "}
            {format(new Date(text), "dd/MM/yyyy")}
          </Link> */}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <span>
          {/*    <Link to={`/owner/client-profile/${record.id}`}>{text?.name}</Link> */}
          {text}
        </span>
      ),
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
      render: (text, record) => (
        <span>
          {/*    <Link to={`/owner/client-profile/${record.id}`}>{text?.name}</Link> */}
          {text}
        </span>
      ),
    },
    {
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
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_payment"
              onClick={() => setpaymentsId(user.id)}
            >
              <i className="fa fa-trash m-r-5" /> Delete
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
      total: 0,
    },
  });

  const [query, setQuery] = useState({
    search: "",
    branch: "",
  });

  const {
    data: paymentsData,
    isLoading: paymentsIsLoading,
    refetch,
  } = useQuery({
    queryKey: ["payment-list"],
    queryFn: async () => {
      const data = await request.findMany("payment", {
        populate: ["user", "subscription"],
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
          />
          {/* /Page Header */}
          <PaymentListFilter query={query} setQuery={setQuery} />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={paymentsIsLoading}
                  className="table-striped"
                  columns={columns}
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

        <PaymentDeletePopup paymentId={paymentsId}  />
        <PaymentEditPopup paymentId={paymentsId} />
      </div>
    </div>
  );
};

export default PaymentList;