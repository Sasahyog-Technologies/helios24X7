import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { format } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import MembershipDeletePopup from "../../../components/modelpopup/Membership/DeleteMembershipPopup";
import MembershipEditPopup from "../../../components/modelpopup/Membership/EditMembershipPopup";
import request from "../../../sdk/functions";
import MembershipListFilter from "./MembershipListFilter";
import PayOutstanding from "../../../components/modelpopup/Client/PayOutstandingPopup";
import { useMediaQuery } from "usehooks-ts";
import { useSession } from "../../../Hook/useSession";

const MembershipList = () => {
  const [membership, setMembership] = useState(false);
  const [subscriptionId, setsubscriptionId] = useState(null);
  const isWebDevice = useMediaQuery("(min-width:700px)");
  const { getUserDataToCookie } = useSession();
  const loggedInUser = getUserDataToCookie()?.user;

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      render: (text, record) => <span className="text-capitalize">{text}</span>,
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
        <span>{text ? format(new Date(text), "dd/MM/yyyy") : ""}</span>
      ),
    },
    {
      title: "Paid",
      dataIndex: "paid",
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
      render: (text, record) => <span>{text ? text : "0"}</span>,
    },
    {
      title: "Plan",
      dataIndex: "plan",
      render: (text, record) => (
        <span className="text-capitalize">
          {text ? text : "Personal Training Program"}
        </span>
      ),
    },
    {
      title: "Payment Type",
      dataIndex: "payment_type",
    },
    {
      title: "Subscription Type",
      dataIndex: "type",
      render: (text, record) => (
        <span className="text-capitalize">{text?.split("-").join(" ")}</span>
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
              data-bs-target="#edit_subscription"
              onClick={() => setsubscriptionId(user.id)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            {loggedInUser?.type === "owner" ? (
              <Link
                className="dropdown-item"
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#delete_subscription"
                onClick={() => setsubscriptionId(user.id)}
              >
                <i className="fa fa-trash m-r-5" /> Delete
              </Link>
            ) : (
              ""
            )}
            {parseFloat(user.outstanding) > 0 && (
              <Link
                to="#"
                data-bs-toggle="modal"
                className="dropdown-item"
                data-bs-target="#pay_outstanding"
                onClick={() => setMembership(user)}
              >
                <i className="la la-money-check-alt m-r-5" /> Pay Outstanding
              </Link>
            )}
          </div>
        </div>
      ),
    },
  ];

  /* --------------------------------------------------------------------------- */

  const deviceColumns = [
    {
      render: (record, key, index) => {
        return (
          <div>
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
                    data-bs-target="#edit_subscription"
                    onClick={() => setsubscriptionId(record.id)}
                  >
                    <i className="fa fa-pencil m-r-5" /> Edit
                  </Link>

                  {loggedInUser?.type === "owner" ? (
                    <Link
                      className="dropdown-item"
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_subscription"
                      onClick={() => setsubscriptionId(record.id)}
                    >
                      <i className="fa fa-trash m-r-5" /> Delete
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Full Name </span>
                <span> {record?.fullname}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Mobile </span>
                <span> {record?.mobile}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Start </span>
                <span>
                  <span>{format(new Date(record?.start), "dd/MM/yyyy")}</span>
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">End </span>
                <span>
                  <span>{format(new Date(record?.end), "dd/MM/yyyy")}</span>
                </span>
              </div>

              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Paid </span>
                <span> {record?.paid}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Outstanding </span>
                <span> {record?.outstanding ? record?.outstanding : "0"}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Payment Type </span>
                <span> {record?.payment_type}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Subscription Type </span>
                <span>
                  {" "}
                  <span className="text-capitalize">
                    {record?.type?.split("-").join(" ")}
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
    type: "",
  });
  const {
    data: subscriptionData,
    isLoading: usersIsLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["membership-list"],
    queryFn: async () => {
      const data = await request.findMany("subscription", {
        populate: ["user", "plan"],
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
              type: {
                $containsi: query.type,
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
      return data.data.map((item) => {
        return {
          ...item.attributes,
          id: item.id,
          plan: item.attributes.plan.data
            ? item.attributes.plan.data.attributes.title
            : null,
          fullname: item.attributes.user.data
            ? `${item.attributes.user.data.attributes.firstname} ${item.attributes.user.data.attributes.lastname}`
            : null,
          mobile: item.attributes.user.data
            ? `${item.attributes.user.data.attributes.mobile}`
            : null,
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
          />
          {/* /Page Header */}
          <MembershipListFilter
            query={query}
            setQuery={setQuery}
            refetch={refetch}
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={usersIsLoading || isRefetching}
                  className="table-striped"
                  columns={isWebDevice ? columns : deviceColumns}
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
        <PayOutstanding refetch={refetch} subscription={membership} />
        <MembershipDeletePopup
          refetch={refetch}
          membershipId={subscriptionId}
        />
        <MembershipEditPopup refetch={refetch} membershipId={subscriptionId} />
      </div>
    </div>
  );
};

export default MembershipList;
