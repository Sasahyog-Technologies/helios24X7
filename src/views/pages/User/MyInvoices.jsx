import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { format } from "date-fns";
import React, { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import request from "../../../sdk/functions";
import { useSession } from "../../../Hook/useSession";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

const MyInvoices = () => {
  const { getUserDataToCookie } = useSession();

  const userId = getUserDataToCookie()?.user?.id;
  const isWebDevice = useMediaQuery("(min-width:700px)");

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => (
        <span className="w-100 text-capitalize">
          <Link to={`/client/invoice-details/${record.id}`}>{text}</Link>
        </span>
      ),
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
      render: (text, record) => (
        <span className="w-100 text-capitalize">
          <Link to={`/client/invoice-details/${record.id}`}>
            {text ? text : "0"}
          </Link>
        </span>
      ),
    },

    {
      title: "Invoice Date",
      dataIndex: "invoice_date",
      render: (text, record) => (
        <span className="w-100 text-capitalize">
          <Link to={`/client/invoice-details/${record.id}`}>
            {text ? format(new Date(text), "dd/MM/yyyy") : ""}
          </Link>
        </span>
      ),
    },
    {
      title: "Invoice Number",
      dataIndex: "invoice_number",
      render: (text, record) => (
        <span className="w-100 text-capitalize">
          <Link to={`/client/invoice-details/${record.id}`}>{text}</Link>
        </span>
      ),
    },
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
                <span className="fw-bold fs-6">Invoice Number</span>
                <span> {record?.invoice_number}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Invoice Date</span>
                <span>
                  <span>
                    {record?.invoice_date
                      ? format(new Date(record?.invoice_date), "dd/MM/yyyy")
                      : ""}
                  </span>
                </span>
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
                  columns={isWebDevice ? columns : deviceColumns}
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
