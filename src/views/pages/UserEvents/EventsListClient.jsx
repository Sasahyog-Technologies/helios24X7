import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import request from "../../../sdk/functions";
import Loading from "../../../components/Loading";

export const EventsFilterList = [
  {
    text: "Todays Events",
    id: 1,
    category: "event",
    type: "today",
  },
  {
    text: "Todays Sessions",
    id: 2,
    category: "session",
    type: "today",
  },
  {
    text: "Upcoming Events",
    id: 3,
    category: "event",
    type: "upcoming",
  },
  {
    text: "Upcoming Sessions",
    id: 4,
    category: "session",
    type: "upcoming",
  },
];

const EventsListClient = () => {
  const [active, setActive] = useState(EventsFilterList[0]);
  const [query, setQuery] = useState({
    search: "",
  });
  const {
    data: EventsData,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["fetch-events"],
    queryFn: async () => {
      let filters = {
        populate: "media",
        filters: {},
      };
      if (active.type === "upcoming") {
        filters.filters = {
          category: active.category,
          start: { $gt: new Date() },
          title: { $containsi: query.search },
        };
      } else if (active.type === "today") {
        filters.filters = {
          category: active.category,
          title: { $containsi: query.search },
          $and: [
            {
              start: { $lte: new Date() },
            },
            {
              end: { $gte: new Date() },
            },
          ],
        };
      }

      let res = await request.findMany("event", filters);
      return res.data.map((event) => {
        return {
          ...event.attributes,
          id: event.id,
        };
      });
    },
  });
  const handleSetActive = (ev) => {
    setActive(ev);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [active]);

  //console.log(EventsData);

  return (
    <>
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="file-wrap">
                <div className="file-sidebar">
                  <div className="file-header justify-content-center">
                    <span>Events</span>
                    <Link to="#" className="file-side-close">
                      <i className="fa-solid fa-xmark" />
                    </Link>
                  </div>

                  <div className="file-pro-list">
                    <div className="file-scroll">
                      <ul className="file-menu">
                        {EventsFilterList.map((ev, index) => (
                          <li
                            className={
                              active.id == ev.id
                                ? "active cursor-pointer"
                                : "cursor-pointer"
                            }
                            key={index}
                            onClick={() => handleSetActive(ev)}
                          >
                            <p className="mt-2 mb-2">{ev.text}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="file-cont-wrap w-100">
                  <div className="file-cont-inner">
                    <div className="file-content">
                      <form className="file-search" onSubmit={handleSearch}>
                        <div className="input-group">
                          <div className="input-group-text">
                            <i className="fa-solid fa-magnifying-glass" />
                          </div>
                          <input
                            type="text"
                            className="form-control rounded-pill"
                            placeholder="Search"
                            onChange={(e) =>
                              setQuery({ search: e.target.value })
                            }
                            value={query.search}
                          />
                        </div>
                      </form>
                      {isLoading || isRefetching ? (
                        <Loading />
                      ) : (
                        <>
                          <div className="file-body w-100">
                            <div className="file-scroll">
                              <div className="file-content-inner">
                                <h4>{active.text}</h4>
                                <EventCard events={EventsData} />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default EventsListClient;
