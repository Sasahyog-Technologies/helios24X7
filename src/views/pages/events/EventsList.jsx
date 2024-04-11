import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import EventsAddPopup from "../../../components/modelpopup/events/EventsAddPopup";
import EventsDeletePopup from "../../../components/modelpopup/events/EventsDeletePopup";
import EventEditPopup from "../../../components/modelpopup/events/EventsEditPopup";
import request from "../../../sdk/functions";
import EventsListFilter from "./EventsListFilter";
import { format } from "date-fns";
import { Image } from "antd";
import { useMediaQuery } from "usehooks-ts";
import { useSession } from "../../../Hook/useSession";

const EventsList = () => {
  const [eventId, seteventId] = useState(null);
  const [image, setImage] = useState();
  const isWebDevice = useMediaQuery("(min-width:700px)");
  const { getUserDataToCookie } = useSession();
  const loggedInUser = getUserDataToCookie()?.user;

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
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
      title: "Description",
      dataIndex: "desc",
    },

    {
      title: "Media",
      dataIndex: "media",
      render: (media, record) => (
        <span className="table-avatar">
          <Image
            width={30}
            src={`${media?.data?.attributes?.url}`}
            class="rounded  d-block w-10"
          />
        </span>
      ),
    },
    {
      title: "Action",
      render: (event) => (
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
              data-bs-target="#edit_event"
              onClick={() => seteventId(event.id)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            {loggedInUser?.type === "owner" ? (
              <Link
                className="dropdown-item"
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#delete_event"
                onClick={() => seteventId(event.id)}
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
                    data-bs-target="#edit_event"
                    onClick={() => seteventId(record.id)}
                  >
                    <i className="fa fa-pencil m-r-5" /> Edit
                  </Link>
                  {loggedInUser?.type === "owner" ? (
                    <Link
                      className="dropdown-item"
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_event"
                      onClick={() => seteventId(record.id)}
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
                <span className="fw-bold fs-6">Title </span>
                <span> {record?.title}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Category </span>
                <span> {record?.category}</span>
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
                <span className="fw-bold fs-6">Media </span>
                <span className="table-avatar">
                  <Image
                    width={30}
                    src={`${record?.media?.data?.attributes?.url}`}
                    class="rounded  d-block w-10"
                  />
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
    title: "",
  });

  const {
    data: eventsData,
    isLoading: eventIsLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["event-list"],
    queryFn: async () => {
      const data = await request.findMany("event", {
        populate: "media",
        filters: {
          title: { $containsi: query.title },
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

  // console.log(eventsData);

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
            maintitle="Events & Sessions"
            title="Dashboard"
            subtitle="Events & Sessions"
            modal="#add_event"
            name="Add Event"
            Linkname="/event"
            Linkname1="/events-list"
          />
          {/* /Page Header */}
          <EventsListFilter
            query={query}
            setQuery={setQuery}
            refetch={refetch}
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={eventIsLoading || isRefetching}
                  className="table-striped"
                  columns={isWebDevice ? columns : deviceColumns}
                  dataSource={eventsData}
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

        <EventEditPopup refetch={refetch} eventId={eventId} />
        <EventsAddPopup refetch={refetch} />
        <EventsDeletePopup refetch={refetch} eventId={eventId} />
      </div>
    </div>
  );
};

export default EventsList;
