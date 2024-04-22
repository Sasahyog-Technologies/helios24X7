import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useSession } from "../../../Hook/useSession";
import request from "../../../sdk/functions";
import AlertsListFilter from "./AlertsListFilter";
import { format } from "date-fns";
import AlertsAddPopup from "../../../components/modelpopup/Alerts/AlertsAddPopup";
import AlertsEditPopup from "../../../components/modelpopup/Alerts/AlertsEditPopup";
import AlertsDeletePopup from "../../../components/modelpopup/Alerts/AlertsDeletePopup";
import useOwnerManager from "../../../Hook/useOwnerManager";

const AlertsList = () => {
  const [alertId, setAlertId] = useState(null);
  const isWebDevice = useMediaQuery("(min-width:700px)");
  const { isOwner, isOwnerManager } = useOwnerManager();
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Start",
      dataIndex: "start",
      render: (text, record) => (
        <span>{format(new Date(text), "dd/MM/yyyy")}</span>
      ),
    },

    {
      title: "End",
      dataIndex: "end",
      render: (text, record) => (
        <span>{format(new Date(text), "dd/MM/yyyy")}</span>
      ),
    },
    {
      title: "Link",
      dataIndex: "link",
      render: (text, record) => (
        <a href={`${text}`} target="_blank">
          Visit
        </a>
      ),
    },

    isOwnerManager
      ? {
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
                  data-bs-target="#edit_alert"
                  onClick={() => setAlertId(walkin.id)}
                >
                  <i className="fa fa-pencil m-r-5" /> Edit
                </Link>
                {isOwner ? (
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_alert"
                    onClick={() => setAlertId(walkin.id)}
                  >
                    <i className="fa fa-trash m-r-5" /> Delete
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          ),
        }
      : {},
  ];

  /* --------------------------------------------------------------------------- */

  const deviceColumns = [
    {
      render: (record, key, index) => {
        return (
          <div>
            {isOwnerManager ? (
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
                      data-bs-target="#edit_alert"
                      onClick={() => setAlertId(record.id)}
                    >
                      <i className="fa fa-pencil m-r-5" /> Edit
                    </Link>
                    {isOwner ? (
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_alert"
                        onClick={() => setAlertId(record.id)}
                      >
                        <i className="fa fa-trash m-r-5" /> Delete
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Title</span>
                <span> {record?.title}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Start</span>
                <span>
                  {" "}
                  <span>{format(new Date(record?.start), "dd/MM/yyyy")}</span>
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">End </span>
                <span>{format(new Date(record?.end), "dd/MM/yyyy")}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Link</span>
                <span>
                  <a href={`${record?.link}`} target="_blank">
                    Visit
                  </a>
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
  });
  const {
    data: AlertsData,
    isLoading: AlertsIsLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["alerts-list"],
    queryFn: async () => {
      const data = await request.findMany("alert", {
        filters: {
          title: { $containsi: query.search },
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

  //console.log(AlertsData);

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
            maintitle="Alerts"
            title="Dashboard"
            subtitle="Alerts"
            modal="#add_alert"
            name="Add Alert"
            Linkname="/walkin"
            Linkname1="/alerts-list"
            isOwnerManager={isOwnerManager}
          />
          {/* /Page Header */}
          <AlertsListFilter
            query={query}
            setQuery={setQuery}
            refetch={refetch}
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={AlertsIsLoading || isRefetching}
                  className="table-striped"
                  columns={isWebDevice ? columns : deviceColumns}
                  dataSource={AlertsData}
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

        <AlertsAddPopup refetch={refetch} />
        <AlertsEditPopup refetch={refetch} alertId={alertId} />
        <AlertsDeletePopup refetch={refetch} alertId={alertId} />
      </div>
    </div>
  );
};

export default AlertsList;
