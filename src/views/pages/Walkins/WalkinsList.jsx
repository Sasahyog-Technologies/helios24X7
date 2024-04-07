import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import request from "../../../sdk/functions";
import WalkinsListFilter from "./WalkinsListFilter";
import WalkinsAddPopup from "../../../components/modelpopup/Walkins/WalkinsAddPopup";
import WalkinsDeletePopup from "../../../components/modelpopup/Walkins/WalkinDeletePopup";
import WalkinEditPopup from "../../../components/modelpopup/Walkins/WalkinEditPopup";

const WalkinsList = () => {
  const [walkinId, setwalkinId] = useState(null);
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
      title: "Reffered By",
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
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_walkin"
              onClick={() => setwalkinId(walkin.id)}
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
                  columns={columns}
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
        <WalkinsAddPopup />
        <WalkinsDeletePopup WalkinId={walkinId} />
        <WalkinEditPopup WalkinId={walkinId} />
      </div>
    </div>
  );
};

export default WalkinsList;
