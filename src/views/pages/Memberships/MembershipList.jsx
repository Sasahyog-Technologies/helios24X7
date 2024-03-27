import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { format } from "date-fns";
import React, { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import MembershipListFilter from "../../../components/ClientListFilters";
import { useSession } from "../../../Hook/useSession";
import request from "../../../sdk/functions";

const MembershipList = () => {
  const [userId, setUserId] = useState(null);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
    },
 

    {
      title: "Mobile",
      dataIndex: "mobile",
    },

    {
      title: "Start Date",
      dataIndex: "start",
      render: (text, record) => (
        <span>{format(new Date(text), "dd/MM/yyyy")}</span>
      ),
    },
    {
      title: "End Date",
      dataIndex: "end",
      render: (text, record) => (
        <span>{text ? format(new Date(text), "dd/MM/yyyy") :""}</span>
      ),
    },
    {
      title: "Paid",
      dataIndex: "paid",
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
    },
    {
      title: "Plan",
      dataIndex: "plan",
    },
    {
      title: "Payment Type",
      dataIndex: "payment_type",
    },
 
   /*  {
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
  const { getUserDataToCookie } = useSession();
  const loggedinUser = getUserDataToCookie();
  const loggedinUserId = loggedinUser.user.id;
  const { data: subscriptionData, isLoading: usersIsLoading } = useQuery({
    queryKey: ["membership-list"],
    queryFn: async () => {
      const data = await request.findMany("subscription", {
        populate: ["user", "plan"],
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
          plan:item.attributes.plan.data ? item.attributes.plan.data.attributes.title  :null,
          fullname:item.attributes.user.data ? `${item.attributes.user.data.attributes.firstname} ${item.attributes.user.data.attributes.lastname}`  :null,
          mobile:item.attributes.user.data ? `${item.attributes.user.data.attributes.mobile}`  :null,
        };
      });
    },
  });

  //console.log(subscriptionData);

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
            maintitle="Membership"
            title="Dashboard"
            subtitle="Membership"
            modal="#add_membership"
            name="Add Membership"
            Linkname="/membership"
            Linkname1="/membership-list"
          />
          {/* /Page Header */}
          <MembershipListFilter query={query} setQuery={setQuery} />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={usersIsLoading}
                  className="table-striped"
                  columns={columns}
                   dataSource={subscriptionData}
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
   {/*      <ClientAddPopup />
        <ClientEditPopup userId={userId} />
        <ClientDeletePopup userId={userId} /> */}
      </div>
    </div>
  );
};

export default MembershipList;
