import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { format } from "date-fns";
import React, { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import request from "../../../sdk/functions";
import { useSession } from "../../../Hook/useSession";
import { useMediaQuery } from "usehooks-ts";

const MyPayments = () => {
  const { getUserDataToCookie } = useSession();
  const userId = getUserDataToCookie()?.user?.id;
  const isWebDevice = useMediaQuery("(min-width:700px)");

  const columns = [
    {
      title: "Date",
      dataIndex: "payment_date",
      render: (text, record) => (
        <span>{text ? format(new Date(text), "dd/MM/yyyy") : ""}</span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => (
        <span className="w-100">
          {/*  <Link to={`/owner/Payments-profile/${record.id}`}>{text}</Link> */}
          {text}
        </span>
      ),
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
      render: (text, record) => (
        <span className="w-100">{text ? text : "0"}</span>
      ),
    },
    {
      title: "Payment Type",
      dataIndex: "payment_type",
      render: (text, record) => (
        <span className="w-100">{text}</span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => <span>{text}</span>,
    },
    /*   {
        title: "Action",
        render: (user) => (
          <div
            className="dropdown dropdown-action text-end"  
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
                data-bs-target="#edit_Payments"
                onClick={() => setUserId(user.id)}
              >
                <i className="fa fa-pencil m-r-5" /> Edit
              </Link>
              <Link
                className="dropdown-item"
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#delete_Payments"
                onClick={() => setUserId(user.id)}
              >
                <i className="fa fa-trash m-r-5" /> Delete
              </Link>
            </div>
          </div>
        ),
      }, */
  ];

  /* --------------------------------------------------------------------------- */

  const deviceColumns = [
    {
      render: (record, key, index) => {
        return (
          <div>
            <div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Amount</span>
                <span> {record?.amount}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Outstanding</span>
                <span> {record?.outstanding ? record?.outstanding : "0"}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Payment Date</span>
                <span>
                  <span>
                    {record?.payment_date
                      ? format(new Date(record?.payment_date), "dd/MM/yyyy")
                      : ""}
                  </span>
                </span>
              </div>

              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Status </span>
                <span>{record?.status}</span>
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
    branch: "",
  });

  const {
    data: paymentsData,
    refetch,
    isLoading: paymentsIsLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["payments-list"],
    queryFn: async () => {
      const data = await request.findMany("payment", {
        filters: {
          user: {
            id: userId,
          },
        },
      });
      setTableParams({
        ...tableParams,
        pagination: { ...tableParams.pagination, total: data.length },
      });
      // return formetter(data);
      return data.data.map((item) => {
        return {
          ...item.attributes,
          id: item.id,
        };
      });
    },
  });

  //  console.log(paymentsData);

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
            maintitle="My Payments"
            title="Dashboard"
            subtitle="Payments"
          />
          {/* /Page Header */}
          {/*      <MyPaymentsFilter
            query={query}
            setQuery={setQuery}
            refetch={refetch}
          /> */}
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
                      onClick: event => {navigate(`/owner/Payments-profile/${record.id}`)}, // click row
                    };
                  }} */
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPayments;
