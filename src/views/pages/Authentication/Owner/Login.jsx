/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import "../../../../assets/css/lp.css";

import AboutUs from "./About";
import Events from "./Events";
import toast from "react-hot-toast";
import React, { useState } from "react";
import PlanCarousel from "./PlanCarousel";
import TrainerCarousel from "./TrainerCarousel";
import { useQuery } from "@tanstack/react-query";
import request from "../../../../sdk/functions";
import { lp7, lp8, lp9, lp1 } from "../../../../Routes/ImagePath";
import { helios_banner, hlogo } from "../../../../Routes/ImagePath";

const OwnerLogin = () => {
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [walkinCreateLoading, setWalkinCreateLoading] = useState(false);

  const handleWalkinCreate = async (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      toast.error("Mobile Number is not valid");
      return;
    }
    try {
      setWalkinCreateLoading(true);
      await request.create("walkin", {
        data: {
          mobile,
          firstname: name.split(" ")[0] || "",
          lastname: name.split(" ")[1] || "",
        },
      });
      setMobile("");
      setName("");
      toast.success("Subscription Added");
    } catch (error) {
      toast.error(error?.response?.data?.error?.message, { mobile: 4000 });
      console.log(error);
    } finally {
      setWalkinCreateLoading(false);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["admin-report"],
    queryFn: async () => {
      const clients = await request.findMany("users", {
        filters: {
          type: "client",
        },
        feilds: ["username"],
      });

      const trainers = await request.findMany("users", {
        filters: {
          type: "trainer",
        },
        feilds: ["username"],
      });

      const branches = await request.findMany("branch", {
        feilds: ["name"],
      });

      const subscriptions = await request.findMany("subscription", {
        feilds: ["type"],
      });

      return {
        clients: clients.length,
        trainers: trainers.length,
        branches: branches.data.length,
        subscriptions: subscriptions.data.length,
      };
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <div>
        <div className="container-fluid bg-dark px-0">
          <div className="row gx-0">
            <div className="col-lg-3 bg-dark d-none d-lg-block">
              <a
                href="index.html"
                className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
              >
                <img
                  style={{ height: "80px", width: "180px" }}
                  src={hlogo}
                  alt="img"
                />
              </a>
            </div>
            <div className="col-lg-9">
              <div className="row gx-0 bg-secondary d-none d-lg-flex">
                <div className="col-lg-7 px-5 text-start">
                  <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                    <i className="fa fa-phone-alt text-primary me-2" />
                    <h6 className="mb-0">
                      <a href="tel:918218603083">+91 8218603083</a>
                    </h6>
                  </div>
                  <div className="h-100 d-inline-flex align-items-center py-2">
                    <i className="fa fa-phone-alt text-primary me-2" />
                    <h6 className="mb-0">
                      <a href="tel:917983411035">+91 7983411035</a>
                    </h6>
                  </div>
                </div>
                <div className="col-lg-5 px-5 text-end">
                  <div className="d-inline-flex align-items-center py-2">
                    <a
                      className="btn btn-light btn-square rounded-circle me-2"
                      href="https://www.instagram.com/helios_gym.24x7?igsh=MXZzajk5d2ZoM3Z3"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                  </div>
                </div>
              </div>
              <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0 px-lg-5">
                <a href="#" className="navbar-brand d-block d-lg-none">
                  <img
                    alt="img"
                    src={hlogo}
                    style={{ height: "80px", width: "180px" }}
                  />
                </a>
                <button
                  type="button"
                  className="navbar-toggler"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarCollapse"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse justify-content-between"
                  id="navbarCollapse"
                >
                  <div className="navbar-nav mr-auto py-0">
                    <a href="#trainers" className="nav-item nav-link">
                      Trainers
                    </a>
                    <a href="#plans" className="nav-item nav-link">
                      Plans
                    </a>
                  </div>
                  <a
                    href="/login"
                    className="btn btn-primary py-md-3 px-md-5 d-none d-lg-block"
                  >
                    Join Us
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
        {/* Header End */}
        {/* Carousel Start */}
        <div className="container-fluid p-0 mb-5">
          <div
            id="header-carousel"
            data-bs-ride="carousel"
            className="carousel slide"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  style={{
                    minHeight: "80vh",
                    objectFit: "cover",
                  }}
                  className="w-100"
                  src={helios_banner}
                  alt="helios bnnare"
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h5 className="text-white text-uppercase">
                      Best Gym Center
                    </h5>
                    <h1 className="display-2 text-white text-uppercase mb-md-4">
                      Build Your Body Strong With Helios
                    </h1>
                    <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-2">
                      <a
                        href="/login"
                        className="btn btn-primary py-md-3 px-md-5"
                      >
                        Join Us
                      </a>
                      <a href="#footer" class="btn btn-light py-md-3 px-md-5">
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  style={{
                    minHeight: "80vh",
                    objectFit: "cover",
                  }}
                  className="w-100"
                  src={helios_banner}
                  alt="helios bnnare"
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h5 className="text-white text-uppercase">
                      Best Gym Center
                    </h5>
                    <h1 className="display-2 text-white text-uppercase mb-md-4">
                      Grow Your Strength With Our Trainers
                    </h1>
                    <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-2">
                      <a
                        href="/login"
                        className="btn btn-primary py-md-3 px-md-5"
                      >
                        Join Us
                      </a>
                      <a href="#footer" class="btn btn-light py-md-3 px-md-5">
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#header-carousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#header-carousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        {/* Carousel End */}
        {/* About Start */}
        <div className="container-fluid p-4">
          <div className="row gx-5">
            <div
              className="col-lg-5 mb-5 mb-lg-0"
              style={{ minHeight: "500px" }}
            >
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100 rounded"
                  src={lp1}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="mb-4 d-flex">
                <h1 className="display-3 text-uppercase mb-0">
                  Welcome to Helios
                </h1>
              </div>
              <h4 className="text-body mb-4">COME & FEEL THE DIFFERANCE</h4>
              <p className="mb-4">
                Helios 24X7 isn't just a gym; it's a lifestyle. Step into a
                world where fitness knows no bounds, where the pursuit of
                excellence is a 24/7 endeavor. With our commitment to providing
                unparalleled service, cutting-edge equipment, and a vibrant
                atmosphere, Helios 24X7 stands as the pinnacle of
                fitness in Bareilly.
              </p>
              <AboutUs />
              {/* <div className="rounded bg-dark p-5">
                <ul className="nav nav-pills d-flex gap-2 flex-sm-row flex-column justify-content-between mb-3">
                  <li className="nav-item w-50 d-none d-sm-flex">
                    <a
                      className="nav-link text-uppercase text-center w-100 active"
                      data-bs-toggle="pill"
                      href="#pills-1"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="nav-item w-100 d-flex d-sm-none">
                    <a
                      className="nav-link text-uppercase text-center w-100 active"
                      data-bs-toggle="pill"
                      href="#pills-1"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="nav-item w-50 d-none d-sm-flex">
                    <a
                      className="nav-link text-uppercase text-center w-100"
                      data-bs-toggle="pill"
                      href="#pills-2"
                    >
                      Why Choose Us
                    </a>
                  </li>
                  <li className="nav-item w-100 d-flex d-sm-none">
                    <a
                      className="nav-link text-uppercase text-center w-100"
                      data-bs-toggle="pill"
                      href="#pills-2"
                    >
                      Why Choose Us
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="pills-1">
                    <p className="text-secondary mb-0">
                      Helios 24X7 isn't just a gym; it's a lifestyle. Step into
                      a world where fitness knows no bounds, where the pursuit
                      of excellence is a 24/7 endeavor. With our commitment to
                      providing unparalleled service, cutting-edge equipment,
                      and a vibrant atmosphere, Helios 24X7 stands as the
                      pinnacle of fitness in Bareilly.
                    </p>
                  </div>
                  <div className="tab-pane fade" id="pills-2">
                    <p className="text-secondary mb-0">
                      + 24/7 Access <br />
                      + International Standard Equipment <br />
                      + Elite Trainers <br />
                      + Cutting-Edge Technology <br />
                      + Vibrant Community Atmosphere <br />
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* About End */}
        {/* Programe Start */}
        <div
          className="container-fluid programe position-relative px-5 mt-5"
          style={{ marginBottom: "135px" }}
        >
          <div className="row g-5 gb-5">
            <div className="col-lg-4 col-md-6">
              <div className="bg-light rounded text-center p-5 border border-dark">
                <i className="flaticon-six-pack display-1 text-primary" />
                <h3 className="text-uppercase my-4">Personal Training</h3>
                <p>
                  Transform your fitness journey with personalized training
                  sessions tailored to your needs and goals. Elevate your
                  workouts today!
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="bg-light rounded text-center p-5 border border-dark">
                <i className="flaticon-barbell display-1 text-primary" />
                <h3 className="text-uppercase my-4">Diet Counseling</h3>
                <p>
                  Unlock the power of healthy eating with expert diet
                  counseling. Get personalized nutrition guidance for a balanced
                  lifestyle.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="bg-light rounded text-center p-5 border border-dark">
                <i className="flaticon-bodybuilding display-1 text-primary" />
                <h3 className="text-uppercase my-4">Guided Workout Plan</h3>
                <p>
                  Maximize your workout potential with a guided exercise plan
                  designed just for you. Start your journey to
                  fitness success now!
                </p>
              </div>
            </div>
            <div className="col-lg-12 col-md-6 text-center">
              <h1 className="text-uppercase text-light mb-4">
                Your Dream Body Is Just 3 Steps Away
              </h1>
            </div>
          </div>
        </div>
        {/* Programe Start */}
        {/* Class Timetable Start */}
        <Events />
        {/* Class Timetable Start */}
        {/* Facts Start */}
        <div className="container-fluid bg-dark facts p-5 my-5">
          <div className="row gx-5 gy-4 py-5">
            <div className="col-lg-3 col-md-6">
              <div className="d-flex">
                <div
                  className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="fa fa-star fs-4 text-white" />
                </div>
                <div className="ps-4">
                  <h1
                    className="display-5 text-white mb-0"
                    data-toggle="counter-up"
                  >
                    {data?.subscriptions}
                  </h1>
                  <h5 className="text-secondary text-uppercase">Subscribed</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex">
                <div
                  className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="fa fa-users fs-4 text-white" />
                </div>
                <div className="ps-4">
                  <h1
                    className="display-5 text-white mb-0"
                    data-toggle="counter-up"
                  >
                    {data?.trainers}
                  </h1>
                  <h5 className="text-secondary text-uppercase">
                    Our Trainers
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex">
                <div
                  className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="fa fa-check fs-4 text-white" />
                </div>
                <div className="ps-4">
                  <h1
                    className="display-5 text-white mb-0"
                    data-toggle="counter-up"
                  >
                    {data?.branches}
                  </h1>
                  <h5 className="text-secondary text-uppercase">Branches</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex">
                <div
                  className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="fa fa-mug-hot fs-4 text-white" />
                </div>
                <div className="ps-4">
                  <h1
                    className="display-5 text-white mb-0"
                    data-toggle="counter-up"
                  >
                    {data?.clients}
                  </h1>
                  <h5 className="text-secondary text-uppercase">
                    Happy Clients
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Facts End */}
        {/* Team Start */}

        <div id="trainers" className="container-fluid p-4">
          <div className="mb-5 text-center">
            <h5 className="text-primary text-uppercase">The Team</h5>
            <h1 className="display-3 text-uppercase mb-0">Expert Trainers</h1>
          </div>

          <TrainerCarousel />
        </div>
        {/* Team End */}
        {/* Testimonial Start */}
        <div className="container-fluid p-0 my-5">
          <div className="row g-0">
            <div className="col-lg-6" style={{ minHeight: "500px" }}>
              <div className="position-relative h-100">
                <img
                  src={lp7}
                  alt="client"
                  style={{ objectFit: "cover" }}
                  className="position-absolute w-100 h-100"
                />
              </div>
            </div>
            <div className="col-lg-6 bg-dark p-5">
              <div className="mb-5">
                <h5 className="text-primary text-uppercase">Testimonial</h5>
                <h1 className="display-3 text-uppercase text-light mb-0">
                  Our Client Say
                </h1>
              </div>
              <div className="owl-carousel testimonial-carousel">
                <div className="testimonial-item mb-4">
                  <p className="fs-4 fw-normal text-light mb-4">
                    <i className="fa fa-quote-left text-primary me-3" />
                    Stepping into the new gym branch feels like entering a
                    strength training sanctuary! With top-notch equipment,
                    personalized coaching, and an empowering atmosphere, it's a
                    powerhouse for serious fitness enthusiasts like me.
                  </p>
                  <div className="d-flex align-items-center">
                    <img
                      className="img-fluid rounded-circle"
                      src={lp8}
                      alt=""
                      style={{ width: "100px" }}
                    />
                    <div className="ps-4">
                      <h5 className="text-uppercase text-light">
                        Sarthak Agrawal
                      </h5>
                      <span className="text-uppercase text-secondary">
                        CEO of Sasahayog Technology
                      </span>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="testimonial-item">
                  <p className="fs-4 fw-normal text-light mb-4">
                    <i className="fa fa-quote-left text-primary me-3" />
                    The new gym branch is a vibrant hub of wellness! From
                    rejuvenating yoga sessions to high-energy Zumba classes,
                    accompanied by expert guidance and a warm community spirit,
                    it's a holistic haven for all fitness lovers
                  </p>
                  <div className="d-flex align-items-center">
                    <img
                      className="img-fluid rounded-circle"
                      src={lp9}
                      style={{ width: "100px" }}
                      alt=""
                    />
                    <div className="ps-4">
                      <h5 className="text-uppercase text-light">
                        Tanya Gangwar's
                      </h5>
                      <span className="text-uppercase text-secondary">
                        College Student
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PlanCarousel />
        <div
          id="footer"
          className="container-fluid bg-dark text-secondary px-5 mt-5"
        >
          <div className="row gx-5">
            <div className="col-lg-8 col-md-6">
              <div className="row gx-5">
                <div className="col-lg-4 col-md-12 pt-5 mb-5">
                  <h4 className="text-uppercase text-light mb-4">
                    Get In Touch
                  </h4>
                  <div className="d-flex mb-2">
                    <i className="bi bi-geo-alt text-primary me-2" />
                    <p className="mb-0">
                      3rd Floor, Galleria Tower RAMPUR GARDEN, BAREILLY
                    </p>
                  </div>
                  <div className="d-flex mb-2">
                    <i className="bi bi-envelope-open text-primary me-2" />
                    <a className="mb-0" href="tel:8218603083">
                      +91 8218603083
                    </a>
                  </div>
                  <div className="d-flex mb-2">
                    <i className="bi bi-telephone text-primary me-2" />
                    <a className="mb-0" href="tel:7983411035">
                      +91 7983411035
                    </a>
                  </div>
                  <div className="d-flex mt-4">
                    <a
                      className="btn btn-primary btn-square rounded-circle"
                      target="_blank"
                      href="https://www.instagram.com/helios_gym.24x7?igsh=MXZzajk5d2ZoM3Z3"
                      rel="noreferrer"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="d-flex flex-column align-items-center justify-content-center text-center h-100 bg-primary p-3">
                <h4 className="text-uppercase text-white mb-4">Helios24X7</h4>
                <h6 className="text-uppercase text-white mb-4">
                  Subscribe Helios24X7
                </h6>

                <form onSubmit={handleWalkinCreate} style={{ width: "70%" }}>
                  <div className="d-flex flex-column gap-2">
                    <input
                      type="text"
                      className="form-control border-white p-3 w-full"
                      placeholder="Your Mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="form-control border-white p-3 w-full"
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <button
                      className="btn btn-dark"
                      disabled={walkinCreateLoading}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container-fluid py-4 py-lg-0 px-5"
          style={{ background: "#111111" }}
        >
          <div className="row gx-5">
            <div className="col-lg-12">
              <div className="py-lg-4 text-center">
                <p className="text-secondary mb-0">
                  ©{" "}
                  <a className="text-light fw-bold" href="#">
                    Helios Gym 24 X 7
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer End */}
        {/* Back to Top */}
        <a href="#" className="btn btn-dark py-1 fs-4 m-3 back-to-top">
          <i className="la la-arrow-up" />
        </a>
        {/* JavaScript Libraries */}
        {/* Template Javascript */}
      </div>
    </div>
  );
};

export default OwnerLogin;
