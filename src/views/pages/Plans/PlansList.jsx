import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PlansAddPopup from "../../../components/modelpopup/Plans/PlansAddPopup";
import PlansDeletePopup from "../../../components/modelpopup/Plans/PlansDeletePopup";
import PlanEditPopup from "../../../components/modelpopup/Plans/PlansEditPopup";
import { useSession } from "../../../Hook/useSession";
import request from "../../../sdk/functions";
import PlansListFilter from "./PlansListFilter";

const PlansList = () => {
  const [planId, setPlanId] = useState(null);
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
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_plan"
              onClick={() => setPlanId(plan.id)}
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
    title: "",
    price: "",
    duration: "",
  });
  const {
    data: plansData,
    isLoading: usersIsLoading,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ["plans-list"],
    queryFn: async () => {
      const data = await request.findMany("plan", {
        filters: {
          title: { $containsi: query.title },
          price: { $containsi: query.price },
          duration: { $containsi: query.duration },
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
                  loading={usersIsLoading || isRefetching}
                  className="table-striped"
                  columns={columns}
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
        <PlanEditPopup planId={planId} />
        <PlansDeletePopup planId={planId} />
      </div>
    </div>
  );
};

export default PlansList;
