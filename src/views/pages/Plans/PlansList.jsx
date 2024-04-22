import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PlansAddPopup from "../../../components/modelpopup/Plans/PlansAddPopup";
import PlansDeletePopup from "../../../components/modelpopup/Plans/PlansDeletePopup";
import PlanEditPopup from "../../../components/modelpopup/Plans/PlansEditPopup";
import useOwnerManager from "../../../Hook/useOwnerManager";
import request from "../../../sdk/functions";
import PlansListFilter from "./PlansListFilter";

const PlansList = () => {
  const [planId, setPlanId] = useState(null);
  const isWebDevice = useMediaQuery("(min-width:700px)");

  const { isOwner, isOwnerManager } = useOwnerManager();
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
    },

    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Branch",
      dataIndex: "branch",
    },
    isOwnerManager
      ? {
          title: "Action",
          render: (plan) => (
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
                  data-bs-target="#edit_plan"
                  onClick={() => setPlanId(plan.id)}
                >
                  <i className="fa fa-pencil m-r-5" /> Edit
                </Link>
                {isOwner ? (
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_plan"
                    onClick={() => setPlanId(plan.id)}
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
                      data-bs-target="#edit_plan"
                      onClick={() => setPlanId(record.id)}
                    >
                      <i className="fa fa-pencil m-r-5" /> Edit
                    </Link>

                    {isOwner ? (
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_plan"
                        onClick={() => setPlanId(record.id)}
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
                <span className="fw-bold fs-6">Title </span>
                <span> {record?.title}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Price </span>
                <span> {record?.price}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Duration </span>
                <span> {record?.duration}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Branch </span>
                <span>{record?.branch}</span>
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
    data: plansData,
    isLoading: PlansIsLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["plans-list"],
    queryFn: async () => {
      const data = await request.findMany("plan", {
        populate: ["branch"],
        filters: {
          $or: [
            {
              title: {
                $containsi: query.search,
              },
            },
            {
              price: {
                $containsi: query.search,
              },
            },
            {
              duration: {
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
      // return formetter(data);
      return data.data.map((item) => {
        return {
          ...item.attributes,
          id: item.id,
          branch: item.attributes?.branch?.data?.attributes?.name || "",
        };
      });
    },
  });

  // console.log(plansData);

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
            maintitle="Plans"
            title="Dashboard"
            subtitle="Plans"
            modal="#add_plan"
            name="Add Plan"
            Linkname="/plan"
            Linkname1="/plans-list"
            isOwnerManager={isOwnerManager}
          />
          {/* /Page Header */}
          <PlansListFilter
            query={query}
            setQuery={setQuery}
            refetch={refetch}
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={PlansIsLoading || isRefetching}
                  className="table-striped"
                  columns={isWebDevice ? columns : deviceColumns}
                  dataSource={plansData}
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
        <PlansAddPopup refetch={refetch} />
        <PlanEditPopup refetch={refetch} planId={planId} />
        <PlansDeletePopup refetch={refetch} planId={planId} />
      </div>
    </div>
  );
};

export default PlansList;
