import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { format } from "date-fns";
import React, { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import request from "../../../sdk/functions";
import { useSession } from "../../../Hook/useSession";

const MyInvoices = () => {
  const { getUserDataToCookie } = useSession();

  const userId = getUserDataToCookie()?.user?.id;

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => (
        <span className="w-100">
          {/*  <Link to={`/owner/invoices-profile/${record.id}`}>{text}</Link> */}
          {text}
        </span>
      ),
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
      render: (text, record) => <span className="w-100">{text}</span>,
    },

    {
      title: "Invoice Date",
      dataIndex: "invoice_date",
      render: (text, record) => (
        <span>{text ? format(new Date(text), "dd/MM/yyyy") : ""}</span>
      ),
    },
    {
      title: "Invoice Number",
      dataIndex: "invoice_number",
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
                data-bs-target="#edit_invoices"
                onClick={() => setUserId(user.id)}
              >
                <i className="fa fa-pencil m-r-5" /> Edit
              </Link>
              <Link
                className="dropdown-item"
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#delete_invoices"
                onClick={() => setUserId(user.id)}
              >
                <i className="fa fa-trash m-r-5" /> Delete
              </Link>
            </div>
          </div>
        ),
      }, */
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
    data: invoicesData,
    refetch,
    isLoading: invoicesIsLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["invoices-list"],
    queryFn: async () => {
      const data = await request.findMany("invoice", {
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

//  console.log(invoicesData);

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
            maintitle="Invoices"
            title="Dashboard"
            subtitle="Invoices"
          />
          {/* /Page Header */}
          {/*      <MyInvoicesFilter
            query={query}
            setQuery={setQuery}
            refetch={refetch}
          /> */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={invoicesIsLoading || isRefetching}
                  className="table-striped"
                  columns={columns}
                  dataSource={invoicesData}
                  pagination={{
                    total: tableParams.pagination.total,
                    showSizeChanger: true,
                  }}
                  //  rowClassName={"cursor-pointer"}
                  rowKey={(record) => record.id}
                  onChange={handleTableChange}
                  /*   onRow={(record, rowIndex) => {
                    return {
                      onClick: event => {navigate(`/owner/invoices-profile/${record.id}`)}, // click row
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

export default MyInvoices;
