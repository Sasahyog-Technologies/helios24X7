import React from "react";
import { Image } from "antd";
import { format } from "date-fns";
const EventCard = ({ events }) => {
  return (
    <div className="row row-sm w-100 mt-4">
      {events.map((event, index) => (
        <div className="col-7 col-sm-5 col-md-4 col-lg-5 col-xl-4" key={index}>
          <div className="card card-file">
            <div>
              <Image src={event?.media?.data?.attributes?.url} alt="image" />
            </div>
            <div className="card-body">
              <h6>{event?.title}</h6>
            </div>
            <div className="card-footer">
              <div> Start : {format(new Date(event?.start), "dd/MM/yyyy")}</div>
              <div> End : {format(new Date(event?.end), "dd/MM/yyyy")}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCard;
