import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import request from "../../../sdk/functions";
import { useMediaQuery } from "usehooks-ts";
import WalkinsListFilter from "./WalkinsListFilter";
import { useSession } from "../../../Hook/useSession";
import Breadcrumbs from "../../../components/Breadcrumbs";
import WalkinsAddPopup from "../../../components/modelpopup/Walkins/WalkinsAddPopup";
import WalkinsDeletePopup from "../../../components/modelpopup/Walkins/WalkinDeletePopup";
import WalkinEditPopup from "../../../components/modelpopup/Walkins/WalkinEditPopup";

const WalkinsList = () => {
  const [walkinId, setwalkinId] = useState(null);
  const isWebDevice = useMediaQuery("(min-width:700px)");
  const { getUserDataToCookie } = useSession();
  const loggedInUser = getUserDataToCookie()?.user;
  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstname",
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
    },

    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Referred By",
      dataIndex: "reffered_by",
    },

    {
      title: "Action",
      render: (walkin) => (
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
              data-bs-target="#edit_walkin"
              onClick={() => setwalkinId(walkin.id)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            {loggedInUser?.type === "owner" ? (
              <Link
                className="dropdown-item"
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#delete_walkin"
                onClick={() => setwalkinId(walkin.id)}
              >
                <i className="fa fa-trash m-r-5" /> Delete
              </Link>
            ) : (
              ""
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
                    data-bs-target="#edit_walkin"
                    onClick={() => setwalkinId(record.id)}
                  >
                    <i className="fa fa-pencil m-r-5" /> Edit
                  </Link>
                  {loggedInUser?.type === "owner" ? (
                    <Link
                      className="dropdown-item"
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_walkin"
                      onClick={() => setwalkinId(record.id)}
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
                <span className="fw-bold fs-6">First Name</span>
                <span> {record?.firstname}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Last Name</span>
                <span> {record?.lastname}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Mobile </span>
                <span>{record?.mobile}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Referred By </span>
                <span>{record?.reffered_by}</span>
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
  });
  const {
    data: WalkinsData,
    isLoading: WalkinsIsLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["Walkins-list"],
    queryFn: async () => {
      const data = await request.findMany("walkin", {
        filters: {
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

  //console.log(WalkinsData);

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
            maintitle="Walkins"
            title="Dashboard"
            subtitle="Walkins"
            modal="#add_walkin"
            name="Add walkin"
            Linkname="/walkin"
            Linkname1="/walkins-list"
          />
          {/* /Page Header */}
          <WalkinsListFilter
            query={query}
            setQuery={setQuery}
            refetch={refetch}
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={WalkinsIsLoading || isRefetching}
                  className="table-striped"
                  columns={isWebDevice ? columns : deviceColumns}
                  dataSource={WalkinsData}
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

        {/*      
        <walkinEditPopup walkinId={walkinId} />
      */}
        <WalkinsAddPopup refetch={refetch} />
        <WalkinsDeletePopup refetch={refetch} WalkinId={walkinId} />
        <WalkinEditPopup refetch={refetch} WalkinId={walkinId} />
      </div>
    </div>
  );
};

export default WalkinsList;
