import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { format } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ClientListFilter from "../../../components/ClientListFilters";
import ClientAddPopup from "../../../components/modelpopup/Client/ClientAddPopup";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import request from "../../../sdk/functions";
import ClientEditPopup from "../../../components/modelpopup/Client/ClientEditPopup";
import ClientDeletePopup from "../../../components/modelpopup/Client/ClientDeletePopup";
import { useSession } from "../../../Hook/useSession";

const EmployeeList = () => {
  const [userId, setUserId] = useState(null);
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      render: (text, record) => (
        <span className="table-avatar">
          <Link to="/profile">
            {text} <span>{record.role}</span>
          </Link>
        </span>
      ),
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      render: (text, record) => (
        <span className="table-avatar">
          <Link to="/profile">
            {text} <span>{record.role}</span>
          </Link>
        </span>
      ),
    },

    {
      title: "Mobile",
      dataIndex: "mobile",
    },

    {
      title: "Join Date",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>{format(new Date(text), "dd/MM/yyyy")}</span>
      ),
    },
    {
      title: "Branch",
      dataIndex: "branch",
      render: (text, record) => <span>{text?.name}</span>,
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
  const { getUserDataToCookie } = useSession();
  const loggedinUser = getUserDataToCookie();
  const loggedinUserId = loggedinUser.user.id;
  const { data: usersData, isLoading: usersIsLoading } = useQuery({
    queryKey: ["client-list"],
    queryFn: async () => {
      const data = await request.findMany("users", {
        populate: "branch",
        "filters[id][$ne]": loggedinUserId,
      });
      setTableParams({
        ...tableParams,
        pagination: { ...tableParams.pagination, total: data.length },
      });
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
            maintitle="Employee"
            title="Dashboard"
            subtitle="Employee"
            modal="#add_employee"
            name="Add Employee"
            Linkname="/employees"
            Linkname1="/employees-list"
          />
          {/* /Page Header */}
          <ClientListFilter query={query} setQuery={setQuery} />
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
                  rowKey={(record) => record.id}
                  onChange={handleTableChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        <ClientAddPopup />
        <ClientEditPopup userId={userId} />
        <ClientDeletePopup userId={userId} />
      </div>
    </div>
  );
};

export default EmployeeList;
