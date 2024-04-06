import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const EventCard = ({ events }) => {
  return (
    <div className="row row-sm w-100 mt-4">
      {events.map((event, index) => (
        <div className="col-7 col-sm-5 col-md-4 col-lg-5 col-xl-4" key={index}>
          <div className="card card-file">
          {/*   <div className="dropdown-file">
              <Link to="#" className="dropdown-link" data-bs-toggle="dropdown">
                <i className="fa fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link to="#" className="dropdown-item">
                  View Details
                </Link>
                <Link to="#" className="dropdown-item">
                  Share
                </Link>
                <Link to="#" className="dropdown-item">
                  Download
                </Link>
                <Link to="#" className="dropdown-item">
                  Rename
                </Link>
                <Link to="#" className="dropdown-item">
                  Delete
                </Link>
              </div>
            </div> */}
            <div className="card-file-thumb">
              <i className={`fa-regular `} />
            </div>
            <div className="card-body">
              <h6>
                <Link to="#">{event?.title}</Link>
              </h6>
          {/*     <span>{event?.desc}</span> */}
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
