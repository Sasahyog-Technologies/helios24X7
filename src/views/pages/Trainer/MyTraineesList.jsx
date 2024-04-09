import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useSession } from "../../../Hook/useSession";
import request from "../../../sdk/functions";
import MyTraineesFilter from "./MyTraineesFilter";
import { FormatTime } from "../../../utils/timeFormater";
import { useMediaQuery } from "usehooks-ts";

const MyTraineesList = () => {
  const [traineeId, setTraineeId] = useState(null);
  const isWebDevice = useMediaQuery("(min-width:700px)");
  const { getUserDataToCookie } = useSession();
  const user = getUserDataToCookie()?.user;
  const trainerId = user.id;

  const columns = [
    {
      title: "Trainee Name",
      dataIndex: "trainee",
      render: (text, record) => <span className="text-capitalize">{text}</span>,
    },

    {
      title: "Mobile",
      dataIndex: "mobile",
      render: (text, record) => <span className="table-avatar">{text}</span>,
    },
    {
      title: "Session From",
      dataIndex: "session_from",
      render: (text, record) => (
        <span className="table-avatar">{FormatTime(text)}</span>
      ),
    },
    {
      title: "Session To",
      dataIndex: "session_to",
      render: (text, record) => (
        <span className="table-avatar">{FormatTime(text)}</span>
      ),
    },
  ];

  /* --------------------------------------------------------------------------- */

  const deviceColumns = [
    {
      render: (record, key, index) => {
        return (
          <div>
            <div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Trainee Name</span>
                <span> {record?.trainee}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Mobile</span>
                <span> {record?.mobile}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Session</span>
                <span>
                  {FormatTime(record?.session_from)} -{" "}
                  {FormatTime(record?.session_to)}
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
    data: trainersData,
    isLoading: trainersIsLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["trainer-list"],
    queryFn: async () => {
      const data = await request.findMany("ptp", {
        populate: ["trainee"],
        filters: {
          trainer: trainerId,
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
      // console.log(data);
      setTableParams({
        ...tableParams,
        pagination: { ...tableParams.pagination, total: data.length },
      });
      // return formetter(data);
      return data.data?.map((item) => {
        return {
          ...item.attributes,
          id: item.id,
          trainee: `${item?.attributes?.trainee?.data?.attributes?.firstname} ${item?.attributes?.trainee?.data?.attributes?.lastname}`,
          mobile: item?.attributes?.trainee?.data?.attributes?.mobile,
        };
      });
    },
  });

  //console.log(trainersData);

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
            maintitle="My Trainees"
            title="Dashboard"
            subtitle="Trainees"
            /*    modal="#add_trainer"
            name="Add Trainer"
            Linkname="/trainer"
            Linkname1="/trainer-list" */
          />
          {/* /Page Header */}
          <MyTraineesFilter
            query={query}
            setQuery={setQuery}
            refetch={refetch}
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={trainersIsLoading || isRefetching}
                  className="table-striped"
                  columns={isWebDevice ? columns : deviceColumns}
                  dataSource={trainersData}
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
        {/*     <TrainerAddPopup />
        <TrianerEditPopup traineeId={traineeId} />
        <TrianerDeletePopup traineeId={traineeId} /> */}
      </div>
    </div>
  );
};

export default MyTraineesList;
