import React, { useState } from "react";
import Charts from "./charts";
import Reports from "./Reports";
import Statistics from "./statistics";
import request from "../../../../../sdk/functions";

import Breadcrumbs from "../../../../../components/Breadcrumbs";
import { useQuery } from "@tanstack/react-query";

const users = [
  {
    id: 1,
    icon: "fa fa-cubes",
    number: 112,
    label: "Projects",
  },
  {
    id: 2,
    icon: "fa fa-usd",
    number: 44,
    label: "Clients",
  },
  {
    id: 3,
    icon: "fa-regular fa-gem",
    number: 37,
    label: "Tasks",
  },
  {
    id: 4,
    icon: "fa fa-user",
    number: 218,
    label: "Employees",
  },
];

const AdminDashboard = () => {
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
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs maintitle="Welcome Admin!" title="Dashboard" />
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className={`dash-widget-icon fa fa-user`} />
                  <div className="dash-widget-info">
                    <h3>{data?.clients}</h3>
                    <span>Clients</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className={`dash-widget-icon fa fa-gem`} />
                  <div className="dash-widget-info">
                    <h3>{data?.trainers}</h3>
                    <span>Trainers</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className={`dash-widget-icon fa fa-cubes`} />
                  <div className="dash-widget-info">
                    <h3>{data?.branches}</h3>
                    <span>Branches</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className={`dash-widget-icon fa fa-cubes`} />
                  <div className="dash-widget-info">
                    <h3>{data?.subscriptions}</h3>
                    <span>Subscriptions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Charts />
          <Reports />
          <Statistics />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
