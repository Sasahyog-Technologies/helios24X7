import "slick-carousel/slick/slick.css";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import request from "../../../../sdk/functions";
import { useQuery } from "@tanstack/react-query";

const TrainerCarousel = () => {
  const { data, isFetched } = useQuery({
    queryKey: ["home-page-clients"],
    queryFn: async () => {
      const trainers = await request.findMany("users", {
        filters: {
          type: "trainer",
        },
        populate: ["profile"],
      });
      return trainers;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="col-lg-12">
      <div>
        <div className="slider-container relative">
          <Slider adaptiveHeight={true} {...settings}>
            {isFetched &&
              data?.map((item, idx) => {
                return (
                  <div className="col-lg-4 col-md-6 p-2 " key={idx}>
                    <div className="team-item position-relative">
                      <div className="position-relative overflow-hidden rounded">
                        <img
                          alt=""
                          className="img-fluid w-100"
                          src={item?.profile?.url}
                        />
                        <div className="team-overlay">
                          <div className="d-flex align-items-center justify-content-start">
                            <a
                              className="btn btn-light btn-square rounded-circle mx-1 d-flex align-items-center justify-content-between"
                              href="#"
                            >
                              <i className="la la-instagram" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div
                        className="position-absolute start-0 bottom-0 w-100 rounded-bottom text-center p-4"
                        style={{ background: "rgba(34, 36, 41, .9)" }}
                      >
                        <h5 className="text-uppercase text-light">
                          {item.firstname} {item.lastname}
                        </h5>
                        <p className="text-uppercase text-secondary m-0">
                          Trainer
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TrainerCarousel;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={"slick-next"}
      style={{
        ...style,
        background: "gray",
        borderRadius: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        right: "35px",
      }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={"slick-prev"}
      style={{
        ...style,
        background: "gray",
        borderRadius: "100%",
        top: "50%",
        zIndex: "999",
        transform: "translateY(-50%)",
        left: "35px",
      }}
      onClick={onClick}
    ></div>
  );
}
