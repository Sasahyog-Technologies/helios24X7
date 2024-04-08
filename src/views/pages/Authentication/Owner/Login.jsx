/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Applogo,
  lp10,
  lp4,
  lp5,
  lp6,
  lp7,
  lp8,
  lp9,
} from "../../../../Routes/ImagePath";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useDispatch } from "react-redux";
import { login } from "../../../../user";
import { resetFunctionwithlogin } from "../../../../components/ResetFunction";
// import { login } from "../../../user";
import request from "../../../../sdk/functions";
import "../../../../assets/css/lp.css";

import { lp1, lp2, lp3 } from "../../../../Routes/ImagePath";
import { useQuery } from "@tanstack/react-query";

const OwnerLogin = () => {
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
                <h1 className="m-0 display-4 text-primary text-uppercase">
                  Helios
                </h1>
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
                      <a href="917983411035">+91 7983411035</a>
                    </h6>
                  </div>
                </div>
                <div className="col-lg-5 px-5 text-end">
                  <div className="d-inline-flex align-items-center py-2">
                    <a
                      className="btn btn-light btn-square rounded-circle me-2"
                      href
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      className="btn btn-light btn-square rounded-circle me-2"
                      href
                    >
                      <i className="fab fa-instagram" />
                    </a>
                    <a className="btn btn-light btn-square rounded-circle" href>
                      <i className="fab fa-youtube" />
                    </a>
                  </div>
                </div>
              </div>
              <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0 px-lg-5">
                <a href="index.html" className="navbar-brand d-block d-lg-none">
                  <h1 className="m-0 display-4 text-primary text-uppercase">
                    Helios
                  </h1>
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
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="w-100" src={lp2} alt="Image" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h5 className="text-white text-uppercase">
                      Best Gym Center
                    </h5>
                    <h1 className="display-2 text-white text-uppercase mb-md-4">
                      Build Your Body Strong With Helios
                    </h1>
                    <a
                      href="/login"
                      className="btn btn-primary py-md-3 px-md-5 me-3"
                    >
                      Join Us
                    </a>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img className="w-100" src={lp3} alt="Image" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h5 className="text-white text-uppercase">
                      Best Gym Center
                    </h5>
                    <h1 className="display-2 text-white text-uppercase mb-md-4">
                      Grow Your Strength With Our Trainers
                    </h1>
                    <a
                      href="/login"
                      className="btn btn-primary py-md-3 px-md-5 me-3"
                    >
                      Join Us
                    </a>
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
        <div className="container-fluid p-5">
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
              <div className="mb-4">
                <h5 className="text-primary text-uppercase">About Us</h5>
                <h1 className="display-3 text-uppercase mb-0">
                  Welcome to Helios
                </h1>
              </div>
              <h4 className="text-body mb-4">COME & FEEL THE DIFFERANCE</h4>
              <p className="mb-4">
                Nonumy erat diam duo labore clita. Sit magna ipsum dolor sed ea
                duo at ut. Tempor sit lorem sit magna ipsum duo. Sit eos dolor
                ut sea rebum, diam sea rebum lorem kasd ut ipsum dolor est
                ipsum. Et stet amet justo amet clita erat, ipsum sed at ipsum
                eirmod labore lorem.
              </p>
              <div className="rounded bg-dark p-5">
                <ul className="nav nav-pills justify-content-between mb-3">
                  <li className="nav-item w-50">
                    <a
                      className="nav-link text-uppercase text-center w-100 active"
                      data-bs-toggle="pill"
                      href="#pills-1"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="nav-item w-50">
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
                      Tempor erat elitr at rebum at at clita aliquyam
                      consetetur. Diam dolor diam ipsum et, tempor voluptua sit
                      consetetur sit. Aliquyam diam amet diam et eos sadipscing
                      labore. Clita erat ipsum et lorem et sit, sed stet no
                      labore lorem sit. Sanctus clita duo justo et tempor
                      consetetur takimata eirmod, dolores takimata consetetur
                      invidunt magna dolores aliquyam dolores dolore. Amet erat
                      amet et magna
                    </p>
                  </div>
                  <div className="tab-pane fade" id="pills-2">
                    <p className="text-secondary mb-0">
                      Tempor erat elitr at rebum at at clita aliquyam
                      consetetur. Diam dolor diam ipsum et, tempor voluptua sit
                      consetetur sit. Aliquyam diam amet diam et eos sadipscing
                      labore. Clita erat ipsum et lorem et sit, sed stet no
                      labore lorem sit. Sanctus clita duo justo et tempor
                      consetetur takimata eirmod, dolores takimata consetetur
                      invidunt magna dolores aliquyam dolores dolore. Amet erat
                      amet et magna
                    </p>
                  </div>
                </div>
              </div>
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
              <div className="bg-light rounded text-center p-5">
                <i className="flaticon-six-pack display-1 text-primary" />
                <h3 className="text-uppercase my-4">Personal Training</h3>
                <p>
                  Sed amet tempor amet sit kasd sea lorem dolor ipsum elitr
                  dolor amet kasd elitr duo vero amet amet stet
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="bg-light rounded text-center p-5">
                <i className="flaticon-barbell display-1 text-primary" />
                <h3 className="text-uppercase my-4">Diet Counseling</h3>
                <p>
                  Sed amet tempor amet sit kasd sea lorem dolor ipsum elitr
                  dolor amet kasd elitr duo vero amet amet stet
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="bg-light rounded text-center p-5">
                <i className="flaticon-bodybuilding display-1 text-primary" />
                <h3 className="text-uppercase my-4">Guided Workout Plan</h3>
                <p>
                  Sed amet tempor amet sit kasd sea lorem dolor ipsum elitr
                  dolor amet kasd elitr duo vero amet amet stet
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
        <div className="container-fluid p-5">
          <div className="mb-5 text-center">
            <h5 className="text-primary text-uppercase">Class Schedule</h5>
            <h1 className="display-3 text-uppercase mb-0">Working Hours</h1>
          </div>
          <div className="tab-class text-center">
            <ul className="nav nav-pills d-inline-flex justify-content-center bg-dark text-uppercase rounded-pill mb-5">
              <li className="nav-item">
                <a
                  className="nav-link rounded-pill text-white active"
                  data-bs-toggle="pill"
                  href="#tab-1"
                >
                  Monday
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link rounded-pill text-white"
                  data-bs-toggle="pill"
                  href="#tab-2"
                >
                  Tuesday
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link rounded-pill text-white"
                  data-bs-toggle="pill"
                  href="#tab-3"
                >
                  Wednesday
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link rounded-pill text-white"
                  data-bs-toggle="pill"
                  href="#tab-4"
                >
                  Thursday
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link rounded-pill text-white"
                  data-bs-toggle="pill"
                  href="#tab-5"
                >
                  Friday
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link rounded-pill text-white"
                  data-bs-toggle="pill"
                  href="#tab-6"
                >
                  Saturday
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link rounded-pill text-white"
                  data-bs-toggle="pill"
                  href="#tab-7"
                >
                  Sunday
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-5">
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00am - 8.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Power Lifting
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        John Deo
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00am - 10.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Body Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Taylor
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        10.00am - 12.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Cardio Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jack Sparrow
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        12.00pm - 2.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Weight Loose
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Robert Smith
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        2.00pm - 4.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Fitness Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Adam Phillips
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        4.00pm - 6.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Crossfit Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Alien
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00pm - 8.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Muscle Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Petter John
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00pm - 10.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Yoga Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jessy Reo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-2" className="tab-pane fade p-0">
                <div className="row g-5">
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00am - 8.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Power Lifting
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        John Deo
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00am - 10.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Body Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Taylor
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        10.00am - 12.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Cardio Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jack Sparrow
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        12.00pm - 2.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Weight Loose
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Robert Smith
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        2.00pm - 4.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Fitness Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Adam Phillips
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        4.00pm - 6.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Crossfit Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Alien
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00pm - 8.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Muscle Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Petter John
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00pm - 10.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Yoga Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jessy Reo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-3" className="tab-pane fade p-0">
                <div className="row g-5">
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00am - 8.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Power Lifting
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        John Deo
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00am - 10.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Body Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Taylor
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        10.00am - 12.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Cardio Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jack Sparrow
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        12.00pm - 2.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Weight Loose
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Robert Smith
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        2.00pm - 4.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Fitness Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Adam Phillips
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        4.00pm - 6.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Crossfit Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Alien
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00pm - 8.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Muscle Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Petter John
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00pm - 10.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Yoga Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jessy Reo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-4" className="tab-pane fade p-0">
                <div className="row g-5">
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00am - 8.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Power Lifting
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        John Deo
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00am - 10.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Body Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Taylor
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        10.00am - 12.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Cardio Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jack Sparrow
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        12.00pm - 2.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Weight Loose
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Robert Smith
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        2.00pm - 4.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Fitness Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Adam Phillips
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        4.00pm - 6.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Crossfit Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Alien
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00pm - 8.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Muscle Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Petter John
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00pm - 10.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Yoga Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jessy Reo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-5" className="tab-pane fade p-0">
                <div className="row g-5">
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00am - 8.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Power Lifting
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        John Deo
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00am - 10.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Body Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Taylor
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        10.00am - 12.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Cardio Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jack Sparrow
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        12.00pm - 2.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Weight Loose
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Robert Smith
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        2.00pm - 4.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Fitness Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Adam Phillips
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        4.00pm - 6.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Crossfit Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Alien
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00pm - 8.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Muscle Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Petter John
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00pm - 10.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Yoga Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jessy Reo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-6" className="tab-pane fade p-0">
                <div className="row g-5">
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00am - 8.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Power Lifting
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        John Deo
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00am - 10.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Body Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Taylor
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        10.00am - 12.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Cardio Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jack Sparrow
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        12.00pm - 2.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Weight Loose
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Robert Smith
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        2.00pm - 4.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Fitness Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Adam Phillips
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        4.00pm - 6.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Crossfit Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Alien
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00pm - 8.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Muscle Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Petter John
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00pm - 10.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Yoga Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jessy Reo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-7" className="tab-pane fade p-0">
                <div className="row g-5">
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00am - 8.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Power Lifting
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        John Deo
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00am - 10.00am
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Body Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Taylor
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        10.00am - 12.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Cardio Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jack Sparrow
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        12.00pm - 2.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Weight Loose
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Robert Smith
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        2.00pm - 4.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Fitness Program
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Adam Phillips
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        4.00pm - 6.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Crossfit Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        James Alien
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        6.00pm - 8.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Muscle Building
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Petter John
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">
                        8.00pm - 10.00pm
                      </h6>
                      <h5 className="text-uppercase text-primary">
                        Yoga Class
                      </h5>
                      <p className="text-uppercase text-secondary mb-0">
                        Jessy Reo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  <h5 className="text-secondary text-uppercase">Subscribed</h5>
                  <h1
                    className="display-5 text-white mb-0"
                    data-toggle="counter-up"
                  >
                    {data?.subscriptions}
                  </h1>
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
                  <h5 className="text-secondary text-uppercase">
                    Our Trainers
                  </h5>
                  <h1
                    className="display-5 text-white mb-0"
                    data-toggle="counter-up"
                  >
                    {data?.trainers}
                  </h1>
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
                  <h5 className="text-secondary text-uppercase">Branches</h5>
                  <h1
                    className="display-5 text-white mb-0"
                    data-toggle="counter-up"
                  >
                    {data?.branches}
                  </h1>
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
                  <h5 className="text-secondary text-uppercase">
                    Happy Clients
                  </h5>
                  <h1
                    className="display-5 text-white mb-0"
                    data-toggle="counter-up"
                  >
                    {data.clients}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Facts End */}
        {/* Team Start */}
        <div id="trainers" className="container-fluid p-5">
          <div className="mb-5 text-center">
            <h5 className="text-primary text-uppercase">The Team</h5>
            <h1 className="display-3 text-uppercase mb-0">Expert Trainers</h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <div className="team-item position-relative">
                <div className="position-relative overflow-hidden rounded">
                  <img className="img-fluid w-100" src={lp4} alt="" />
                  <div className="team-overlay">
                    <div className="d-flex align-items-center justify-content-start">
                      <a
                        className="btn btn-light btn-square rounded-circle mx-1"
                        href="#"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                      <a
                        className="btn btn-light btn-square rounded-circle mx-1"
                        href="#"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a
                        className="btn btn-light btn-square rounded-circle mx-1"
                        href="#"
                      >
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="position-absolute start-0 bottom-0 w-100 rounded-bottom text-center p-4"
                  style={{ background: "rgba(34, 36, 41, .9)" }}
                >
                  <h5 className="text-uppercase text-light">John Deo</h5>
                  <p className="text-uppercase text-secondary m-0">Trainer</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-item position-relative">
                <div className="position-relative overflow-hidden rounded">
                  <img className="img-fluid w-100" src={lp5} alt="" />
                  <div className="team-overlay">
                    <div className="d-flex align-items-center justify-content-start">
                      <a
                        className="btn btn-light btn-square rounded-circle mx-1"
                        href="#"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                      <a
                        className="btn btn-light btn-square rounded-circle mx-1"
                        href="#"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a
                        className="btn btn-light btn-square rounded-circle mx-1"
                        href="#"
                      >
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="position-absolute start-0 bottom-0 w-100 rounded-bottom text-center p-4"
                  style={{ background: "rgba(34, 36, 41, .9)" }}
                >
                  <h5 className="text-uppercase text-light">James Taylor</h5>
                  <p className="text-uppercase text-secondary m-0">Trainer</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-item position-relative">
                <div className="position-relative overflow-hidden rounded">
                  <img className="img-fluid w-100" src={lp6} alt="" />
                  <div className="team-overlay">
                    <div className="d-flex align-items-center justify-content-start">
                      <a
                        className="btn btn-light btn-square rounded-circle mx-1"
                        href="#"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                      <a
                        className="btn btn-light btn-square rounded-circle mx-1"
                        href="#"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a
                        className="btn btn-light btn-square rounded-circle mx-1"
                        href="#"
                      >
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="position-absolute start-0 bottom-0 w-100 rounded-bottom text-center p-4"
                  style={{ background: "rgba(34, 36, 41, .9)" }}
                >
                  <h5 className="text-uppercase text-light">Adam Phillips</h5>
                  <p className="text-uppercase text-secondary m-0">Trainer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Team End */}
        {/* Testimonial Start */}
        <div className="container-fluid p-0 my-5">
          <div className="row g-0">
            <div className="col-lg-6" style={{ minHeight: "500px" }}>
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100"
                  src={lp7}
                  style={{ objectFit: "cover" }}
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
                <div className="testimonial-item">
                  <p className="fs-4 fw-normal text-light mb-4">
                    <i className="fa fa-quote-left text-primary me-3" />
                    Dolores sed duo clita tempor justo dolor et stet lorem kasd
                    labore dolore lorem ipsum. At lorem lorem magna ut et,
                    nonumy et labore et tempor diam tempor erat dolor rebum sit
                    ipsum.
                  </p>
                  <div className="d-flex align-items-center">
                    <img
                      className="img-fluid rounded-circle"
                      src={lp8}
                      alt=""
                    />
                    <div className="ps-4">
                      <h5 className="text-uppercase text-light">Client Name</h5>
                      <span className="text-uppercase text-secondary">
                        Profession
                      </span>
                    </div>
                  </div>
                </div>
                <div className="testimonial-item">
                  <p className="fs-4 fw-normal text-light mb-4">
                    <i className="fa fa-quote-left text-primary me-3" />
                    Dolores sed duo clita tempor justo dolor et stet lorem kasd
                    labore dolore lorem ipsum. At lorem lorem magna ut et,
                    nonumy et labore et tempor diam tempor erat dolor rebum sit
                    ipsum.
                  </p>
                  <div className="d-flex align-items-center">
                    <img
                      className="img-fluid rounded-circle"
                      src={lp9}
                      alt=""
                    />
                    <div className="ps-4">
                      <h5 className="text-uppercase text-light">Client Name</h5>
                      <span className="text-uppercase text-secondary">
                        Profession
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Testimonial End */}
        {/* Blog Start */}
        <div id="plans" className="container-fluid p-5">
          <div className="mb-5 text-center">
            <h5 className="text-primary text-uppercase">Plans</h5>
            <h1 className="display-3 text-uppercase mb-0">Our Plans</h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-4">
              <div className="blog-item">
                <div className="position-relative overflow-hidden rounded-top">
                  <img className="img-fluid" src={lp10} alt="" />
                </div>
                <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                  <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                    <span>01</span>
                    <h6 className="text-light text-uppercase mb-0">January</h6>
                    <span>2045</span>
                  </div>
                  <a className="h5 text-uppercase text-light" href>
                    Sed amet tempor amet sit kasd sea lorem
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="blog-item">
                <div className="position-relative overflow-hidden rounded-top">
                  <img className="img-fluid" src={lp10} alt="" />
                </div>
                <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                  <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                    <span>01</span>
                    <h6 className="text-light text-uppercase mb-0">January</h6>
                    <span>2045</span>
                  </div>
                  <a className="h5 text-uppercase text-light" href>
                    Sed amet tempor amet sit kasd sea lorem
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="blog-item">
                <div className="position-relative overflow-hidden rounded-top">
                  <img className="img-fluid" src={lp10} alt="" />
                </div>
                <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                  <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                    <span>01</span>
                    <h6 className="text-light text-uppercase mb-0">January</h6>
                    <span>2045</span>
                  </div>
                  <a className="h5 text-uppercase text-light" href>
                    Sed amet tempor amet sit kasd sea lorem
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Blog End */}
        {/* Footer Start */}
        <div className="container-fluid bg-dark text-secondary px-5 mt-5">
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
                    <p className="mb-0">+91 8218603083</p>
                  </div>
                  <div className="d-flex mb-2">
                    <i className="bi bi-telephone text-primary me-2" />
                    <p className="mb-0">+91 7983411035</p>
                  </div>
                  <div className="d-flex mt-4">
                    <a
                      className="btn btn-primary btn-square rounded-circle me-2"
                      href="#"
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      className="btn btn-primary btn-square rounded-circle"
                      href="#"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 pt-0 pt-lg-5 mb-5">
                  <h4 className="text-uppercase text-light mb-4">
                    Quick Links
                  </h4>
                  <div className="d-flex flex-column justify-content-start">
                    <a className="text-secondary mb-2" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      Home
                    </a>
                    <a className="text-secondary mb-2" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      About Us
                    </a>
                    <a className="text-secondary mb-2" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      Class Schedule
                    </a>
                    <a className="text-secondary mb-2" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      Our Trainers
                    </a>
                    <a className="text-secondary mb-2" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      Latest Blog
                    </a>
                    <a className="text-secondary" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      Contact Us
                    </a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 pt-0 pt-lg-5 mb-5">
                  <h4 className="text-uppercase text-light mb-4">
                    Popular Links
                  </h4>
                  <div className="d-flex flex-column justify-content-start">
                    <a className="text-secondary mb-2" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      Home
                    </a>
                    <a className="text-secondary mb-2" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      About Us
                    </a>
                    <a className="text-secondary mb-2" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      Class Schedule
                    </a>
                    <a className="text-secondary mb-2" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      Our Trainers
                    </a>
                    <a className="text-secondary mb-2" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      Latest Blog
                    </a>
                    <a className="text-secondary" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="d-flex flex-column align-items-center justify-content-center text-center h-100 bg-primary p-5">
                <h4 className="text-uppercase text-white mb-4">Newsletter</h4>
                <h6 className="text-uppercase text-white">
                  Subscribe Our Newsletter
                </h6>
                <p className="text-light">
                  Amet justo diam dolor rebum lorem sit stet sea justo kasd
                </p>
                <form action>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-white p-3"
                      placeholder="Your Email"
                    />
                    <button className="btn btn-dark">Sign Up</button>
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
            <div className="col-lg-8">
              <div className="py-lg-4 text-center">
                <p className="text-secondary mb-0">
                  ©{" "}
                  <a className="text-light fw-bold" href="#">
                    Your Site Name
                  </a>
                  . All Rights Reserved.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="py-lg-4 text-center credit">
                <p className="text-light mb-0">
                  Designed by{" "}
                  <a
                    className="text-light fw-bold"
                    href="https://htmlcodex.com"
                  >
                    HTML Codex
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer End */}
        {/* Back to Top */}
        <a href="#" className="btn btn-dark py-3 fs-4 back-to-top">
          <i className="bi bi-arrow-up" />
        </a>
        {/* JavaScript Libraries */}
        {/* Template Javascript */}
      </div>
    </div>
  );
};

export default OwnerLogin;
