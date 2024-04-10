import clsx from "clsx";
import { Image } from "antd";
import { useState } from "react";
import request from "../../../../sdk/functions";
import { useQuery } from "@tanstack/react-query";

function getSevenDaysList() {
  const daysList = [];
  const currentDate = new Date();

  // Loop to get the next 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    date.setHours(0, 0, 0, 0);
    daysList.push(date);
  }

  return daysList;
}

function getDayName(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = date.getDay();
  return days[dayIndex].toString();
}

const Events = () => {
  const daysList = getSevenDaysList();
  const [select, setSelect] = useState(0);
  const { data, isFetched } = useQuery({
    queryKey: ["home-page-events", select],
    queryFn: async () => {
      const trainers = await request.findMany("event", {
        populate: ["media"],
        filters: {
          start: new Date(daysList.at(select)),
        },
      });
      return trainers;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div id="sessions" className="container-fluid p-5">
      <div className="mb-5 text-center">
        <h5 className="text-primary text-uppercase">Activities</h5>
        <h1 className="display-3 text-uppercase mb-0">Events & Sessions</h1>
      </div>
      <div className="tab-class text-center">
        <ul className="nav nav-pills d-inline-flex gap-1 p-2 justify-content-center bg-dark text-uppercase rounded px-2 py-4 mb-5">
          {daysList?.map((d, index) => {
            return (
              <li
                onClick={() => {
                  setSelect(index);
                }}
                key={index}
                className="nav-item"
              >
                <p
                  className={clsx(
                    "nav-link rounded-pill text-white",
                    select === index && "active"
                  )}
                >
                  {getDayName(d)}
                </p>
              </li>
            );
          })}
        </ul>
        <div className="tab-content">
          <div id="tab-1" className="tab-pane fade show p-0 active">
            <div className="row g-5">
              {isFetched && data?.data?.length < 1 && (
                <div>
                  <p>No Events & Session Available</p>
                </div>
              )}

              {isFetched &&
                data?.data?.map((event) => {
                  return (
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="bg-dark rounded text-center py-5 px-3">
                        <Image
                          alt={"event-image"}
                          src={event?.attributes?.media?.data?.attributes?.url}
                        />
                        <h6 className="text-uppercase text-light mb-3 mt-3">
                          {event?.attributes?.category}
                        </h6>
                        <h5 className="text-uppercase text-primary">
                          {event?.attributes?.title}
                        </h5>
                        <p className="text-secondary mb-0 mt-1">
                          {event?.attributes?.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
