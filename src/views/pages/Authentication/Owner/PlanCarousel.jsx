import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import request from "../../../../sdk/functions";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
        <Slider {...settings}>
          {isFetched &&
            data?.map((item, index) => {
              return (
                <div className="d-flex justify-content-center align-items-center px-4" key={index} style={{height:"900px"}}>
                  <div className="pricing pricing-warning w-100">
                    <div className="title">
                      <a href="/shop"> {item?.attributes?.title}</a>
                    </div>
                    <div className="price-box">
                      <div className="icon pull-right border circle">
                        <span
                          className="livicon livicon-processed"
                          data-n="shopping-cart"
                          data-s="32"
                          data-c="#1e1e1e"
                          data-hc="0"
                          id="livicon-1"
                          style={{ width: "32px", height: "32px" }}
                        >
                          <i className="la la-dumbbell" />
                        </span>
                      </div>
                      <div className="starting">{item.attributes?.duration} Month</div>
                      <div className="price">
                        ₹{item?.attributes?.price}
                        {/* <span>/month</span> */}
                      </div>
                    </div>
                    <ul className="options">
                      {/*    <li>
                        <span>
                          <i className="fa fa-check"></i>
                        </span>
                        Responsive Design
                      </li> */}
                      <li className="active">
                        <span>
                          <i className="fa fa-check"></i>
                        </span>
                        Duration -   {item.attributes?.duration} Month
                      </li>
                    </ul>
                    <div className="bottom-box">
                      {/*    <a href="/shop" className="more">
                        Read More <span className="fa fa-angle-right"></span>
                      </a>
                      <div className="rating-box">
                        <div className="rating" style={{ width: "60%" }}>
                          icon
                        </div>
                      </div> */}
                      <Link to="#" className="btn btn-lg btn-warning clearfix">
                        Buy Now
                      </Link>
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
  // console.log(className);
  return (
    <div
      className={"slick-next"}
      style={{
        ...style,
        background: "gray",
        top: "50%",
        borderRadius: "100%",
        transform: "translateY(-50%)",
        right: "35px",
      }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  // console.log(className)
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
        left: "34px",
      }}
      onClick={onClick}
    ></div>
  );
}
 