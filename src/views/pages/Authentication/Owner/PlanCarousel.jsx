import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import request from "../../../../sdk/functions";
import { useQuery } from "@tanstack/react-query";

const PlanCarousel = () => {
  const { data, isFetched } = useQuery({
    queryKey: ["home-page-plans"],
    queryFn: async () => {
      const trainers = await request.findMany("plan", {
        filters: {
          seleted: true,
        },
      });
      return trainers.data;
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
    <div id="plans" className="container-fluid p-5">
      <div className="mb-5 text-center">
        <h5 className="text-primary text-uppercase">Plans</h5>
        <h1 className="display-3 text-uppercase mb-0">Our Plans</h1>
      </div>
      <div className="row g-5">
        <Slider adaptiveHeight={true} {...settings}>
          {isFetched &&
            data?.map((item) => {
              return (
                <div className="col-lg-4 p-2">
                  <div className="blog-item">
                    <div className="position-relative overflow-hidden rounded-top"></div>
                    <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                      <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                        <span>Duration</span>
                        <h6 className="text-light text-uppercase mb-0">
                          {item.attributes?.duration} Month
                        </h6>
                        <span>₹{item?.attributes?.price}</span>
                      </div>
                      <a className="h5 text-uppercase text-light" href>
                        {item?.attributes?.title}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default PlanCarousel;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,

        background: "gray",
        top: "50%",
        transform: "translateY(-50%)",
        right: "10px", // Adjust this value as needed
      }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,

        background: "gray",
        top: "50%",
        zIndex: "999",
        transform: "translateY(-50%)",
        left: "20px", // Adjust this value as needed
      }}
      onClick={onClick}
    ></div>
  );
}
