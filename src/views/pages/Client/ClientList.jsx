import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { format } from "date-fns";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";

import ClientAddPopup from "../../../components/modelpopup/Client/ClientAddPopup";
import ClientDeletePopup from "../../../components/modelpopup/Client/ClientDeletePopup";
import ClientEditPopup from "../../../components/modelpopup/Client/ClientEditPopup";
import request from "../../../sdk/functions";
import ClientListFilter from "./ClientListFilter";

const ClientList = () => {
  const [userId, setUserId] = useState(null);
  const [usersIsLoading, setUsersIsLoading] = useState(false);
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      render: (text, record) => (
        <span className="w-100">
          <Link to={`/owner/client-profile/${record.id}`}>{text}</Link>
        </span>
      ),
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      render: (text, record) => (
        <span className="table-avatar">
          <Link to={`/owner/client-profile/${record.id}`}>
            {text} <span>{record.role}</span>
          </Link>
        </span>
      ),
    },

    {
      title: "Mobile",
      dataIndex: "mobile",
      render: (text, record) => (
        <span className="w-100">
          <Link to={`/owner/client-profile/${record.id}`}>{text}</Link>
        </span>
      ),
    },

    {
      title: "Join Date",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          <Link to={`/owner/client-profile/${record.id}`}>
            {" "}
            {format(new Date(text), "dd/MM/yyyy")}
          </Link>
        </span>
      ),
    },
    {
      title: "Branch",
      dataIndex: "branch",
      render: (text, record) => (
        <span>
          <Link to={`/owner/client-profile/${record.id}`}>{text?.name}</Link>
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
              data-bs-target="#edit_client"
              onClick={() => setUserId(user.id)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_client"
              onClick={() => setUserId(user.id)}
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

  const { data: usersData, refetch } = useQuery({
    queryKey: ["client-list"],
    queryFn: async () => {
      setUsersIsLoading(true);
      const data = await request.findMany("users", {
        populate: "branch",
        filters: {
          type: "client",
          $or: [
            {
              firstname: {
                $containsi: query.search,
              },
            },
            {
              lastname: {
                $containsi: query.search,
              },
            },
            {
              mobile: {
                $containsi: query.search,
              },
            },
          ],

          branch: {
            name: { $containsi: query.branch },
          },
        },
      });
      setTableParams({
        ...tableParams,
        pagination: { ...tableParams.pagination, total: data.length },
      });
      setUsersIsLoading(false);
      // return formetter(data);
      return data;
    },
  });

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
            maintitle="Client"
            title="Dashboard"
            subtitle="Client"
            modal="#add_client"
            name="Add Client"
            Linkname="/client"
            Linkname1="/client-list"
          />
          {/* /Page Header */}
          <ClientListFilter
            query={query}
            setQuery={setQuery}
            refetch={refetch}
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={usersIsLoading}
                  className="table-striped"
                  columns={columns}
                  dataSource={usersData}
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
        <ClientAddPopup refetch={refetch} />
        <ClientEditPopup userId={userId} />
        <ClientDeletePopup userId={userId} />
      </div>
    </div>
  );
};

export default ClientList;
