import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { format } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import InvoiceDeletePopup from "../../../components/modelpopup/Invoice/DeleteInvoicePopup";
import InvoiceEditPopup from "../../../components/modelpopup/Invoice/EditInvoicePopup";
import request from "../../../sdk/functions";
import InvoiceListFilter from "./InvoiceListFilter";

const InvoiceList = () => {
  const [invoiceId, setinvoiceId] = useState(null);

  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      render: (text, record) => (
        <span className="w-100 text-capitalize">
          <Link to={`/owner/invoice-details/${record.id}`}>{text}</Link>
        </span>
      ),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      render: (text, record) => (
        <span className="w-100 text-capitalize">
          <Link to={`/owner/invoice-details/${record.id}`}>{text}</Link>
        </span>
      ),
    },
    {
      title: "Subscription Type",
      dataIndex: "subscriptionType",
      render: (text, record) => (
        <span className="w-100 text-capitalize">
          <Link to={`/owner/invoice-details/${record.id}`}>{text}</Link>
        </span>
      ),
    },

    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => (
        <span>
          <Link to={`/owner/invoice-details/${record.id}`}>{text}</Link>
        </span>
      ),
    },
    {
      title: "Invoice Date",
      dataIndex: "invoice_date",
      render: (text, record) => (
        <span>
          <Link to={`/owner/invoice-details/${record.id}`}>
            {format(new Date(text), "dd/MM/yyyy")}
          </Link>
        </span>
      ),
    },

    {
      title: "Outstanding",
      dataIndex: "outstanding",
      render: (text, record) => (
        <span>
          <Link to={`/owner/invoice-details/${record.id}`}>
            {text ? text : "0"}
          </Link>
        </span>
      ),
    },
    {
      title: "Action",
      render: (user) => (
        <div className="dropdown dropdown-action text-end">
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
              data-bs-target="#edit_invoice"
              onClick={() => setinvoiceId(user.id)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_invoice"
              onClick={() => setinvoiceId(user.id)}
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
  });

  const {
    data: InvoicesData,
    isLoading: InvoicesIsLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["Invoice-list"],
    queryFn: async () => {
      const data = await request.findMany("invoice", {
        populate: ["user", "subscription", "payment"],
        filters: {
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
      });
      setTableParams({
        ...tableParams,
        pagination: { ...tableParams.pagination, total: data.length },
      });

      // return formetter(data);
      return data.data.map((itm) => {
        return {
          id: itm.id,
          ...itm.attributes,
          mobile: itm.attributes.user.data.attributes.mobile,
          username: `${itm.attributes.user.data.attributes.firstname} ${itm.attributes.user.data.attributes.lastname}`,
          subscriptionType: `${itm.attributes?.subscription?.data?.attributes?.type
            ?.split("-")
            .join(" ")}`,
        };
      });
    },
  });

  //console.log(InvoicesData);

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
          <InvoiceListFilter
            refetch={refetch}
            query={query}
            setQuery={setQuery}
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={InvoicesIsLoading || isRefetching}
                  className="table-striped"
                  columns={columns}
                  dataSource={InvoicesData}
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

        {/*   <InvoiceDeletePopup InvoiceId={invoiceId}  />
        <InvoiceEditPopup InvoiceId={invoiceId} /> */}
        <InvoiceDeletePopup invoiceId={invoiceId} />
        <InvoiceEditPopup invoiceId={invoiceId} />
      </div>
    </div>
  );
};

export default InvoiceList;
