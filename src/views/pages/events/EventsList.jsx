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

const EventsList = () => {
  const [eventId, seteventId] = useState(null);
  const [image, setImage] = useState();

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
      title: "Description",
      dataIndex: "desc",
    },
    {
      title: "Media",
      dataIndex: "media",
      render: (media, record) => (
        <span className="table-avatar">
          <img
            src={`${process.env.REACT_APP_STARPI_URL}${media?.data?.attributes?.url}`}
            class="rounded  d-block w-25"
            alt="..."
          ></img>
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
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_event"
              onClick={() => seteventId(event.id)}
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
  });

  const {
    data: eventsData,
    isLoading: eventIsLoading,
    refetch,
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
            maintitle="Events"
            title="Dashboard"
            subtitle="Events"
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
                  loading={eventIsLoading}
                  className="table-striped"
                  columns={columns}
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

        <EventEditPopup eventId={eventId} />
        <EventsAddPopup />
        <EventsDeletePopup eventId={eventId} />
      </div>
    </div>
  );
};

export default EventsList;
