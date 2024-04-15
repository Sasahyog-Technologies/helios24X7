import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PTPDeletePopup from "../../../components/modelpopup/Client/PTPDeletePopup";
import PtpEditPopup from "../../../components/modelpopup/Client/PTPEditPopup";
import useOwnerManager from "../../../Hook/useOwnerManager";
import request from "../../../sdk/functions";
import { FormatTime } from "../../../utils/timeFormater";
import PTPListFilter from "./PTPListFilter";

const PTPList = () => {
  const [ptpId, setPtpId] = useState(null);
  const isWebDevice = useMediaQuery("(min-width:700px)");
  const { isOwner, isOwnerManager } = useOwnerManager();
  const columns = [
    {
      title: "Trainee",
      dataIndex: "trainee",
    },
    {
      title: "Trainer",
      dataIndex: "trainer",
    },

    {
      title: "Session From",
      dataIndex: "session_from",
      render: (session_from) => <span>{`${FormatTime(session_from)}`}</span>,
    },
    {
      title: "Session To",
      dataIndex: "session_to",
      render: (session_to) => <span>{`${FormatTime(session_to)}`}</span>,
    },

    isOwnerManager
      ? {
          title: "Action",
          render: (ptp) => (
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
                  data-bs-target="#edit_ptp"
                  onClick={() => setPtpId(ptp?.id)}
                >
                  <i className="fa fa-pencil m-r-5" /> Edit
                </Link>
                {isOwner ? (
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_ptp"
                    onClick={() => setPtpId(ptp?.id)}
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
                      data-bs-target="#edit_ptp"
                      onClick={() => setPtpId(record.id)}
                    >
                      <i className="fa fa-pencil m-r-5" /> Edit
                    </Link>
                    {isOwner ? (
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_ptp"
                        onClick={() => setPtpId(record.id)}
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
                <span className="fw-bold fs-6">Trainee </span>
                <span> {record?.trainee}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Trainer </span>
                <span> {record?.trainer}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Session From </span>
                <span>
                  <span>{`${FormatTime(record?.session_from)}`}</span>
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Session To </span>
                <span>
                  <span>{`${FormatTime(record?.session_to)}`}</span>
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
    data: PTPData,
    isLoading: PTPIsLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["ptp-list"],
    queryFn: async () => {
      const data = await request.findMany("ptp", {
        populate: ["trainee", "trainer"],
        filters: {
          trainer: {
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
          trainee: {
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
      return data.data.map((item) => {
        return {
          ...item.attributes,
          id: item.id,
          trainer: `${item.attributes?.trainer?.data?.attributes?.firstname} ${item.attributes?.trainer?.data?.attributes?.lastname}`,
          trainee: `${item.attributes?.trainee?.data?.attributes?.firstname} ${item.attributes?.trainee?.data?.attributes?.lastname}`,
        };
      });
    },
  });
  // console.log(PTPData);

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
            maintitle="PTP"
            title="Dashboard"
            subtitle="PTP"
            modal="#add_plan"
            name="Add Plan"
            Linkname="/plan"
            Linkname1="/PTP-list"
            isOwnerManager={isOwnerManager}
          />
          {/* /Page Header */}
          <PTPListFilter query={query} setQuery={setQuery} refetch={refetch} />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={PTPIsLoading || isRefetching}
                  className="table-striped"
                  columns={isWebDevice ? columns : deviceColumns}
                  dataSource={PTPData}
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
      </div>
      <PtpEditPopup refetch={refetch} ptpId={ptpId} />
      <PTPDeletePopup refetch={refetch} ptpId={ptpId} />
    </div>
  );
};

export default PTPList;
