import React from "react";
import Charts from "./charts";
import InvoiceTable from "./invoiceTable";
import { useQuery } from "@tanstack/react-query";
import request from "../../../../../sdk/functions";
import Breadcrumbs from "../../../../../components/Breadcrumbs";

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
        populate: ["plan"],
      });

      const invoices = await request.findMany("invoice", {
        feilds: ["invoice_number"],
      });

      const walkin = await request.findMany("walkin", {
        feilds: ["firstname"],
      });

      const gym_subscription = await request.findMany("payment", {
        populate: {
          subscription: {
            filters: {
              type: "gym-subscription",
            },
          },
        },
        feilds: ["amount"],
      });

      const trainer_subscription = await request.findMany("payment", {
        populate: {
          subscription: {
            filters: {
              type: "trainer-subscription",
            },
          },
        },
        feilds: ["amount"],
      });

      const gym_subscription_count = gym_subscription?.data?.reduce(
        (accumulator, currentArray) => {
          return accumulator + parseInt(currentArray?.attributes?.amount);
        },
        0
      );

      const trainer_subscription_count = trainer_subscription?.data?.reduce(
        (accumulator, currentArray) => {
          return accumulator + parseInt(currentArray?.attributes?.amount);
        },
        0
      );

      const total_revanue = subscriptions?.data?.reduce(
        (accumulator, currentArray) => {
          return (
            accumulator +
            parseInt(
              currentArray.attributes?.plan?.data?.attributes?.price ?? 0
            )
          );
        },
        0
      );

      return {
        clients: clients?.length,
        walkin: walkin.data.length,
        trainers: trainers?.length,
        total_revanue: total_revanue,
        branches: branches?.data.length,
        invoices: invoices?.data?.length,
        subscriptions: subscriptions?.data.length,
        gym_subscription: gym_subscription_count,
        trainer_subscription: trainer_subscription_count,
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
            <Chip
              title={"Clients"}
              variable={data?.clients}
              icon={"dash-widget-icon fa fa-user"}
            />

            <Chip
              title={"Trainers"}
              variable={data?.trainers}
              icon={"dash-widget-icon fa fa-gem"}
            />

            <Chip
              title={"Branches"}
              variable={data?.branches}
              icon={"dash-widget-icon fa fa-cubes"}
            />

            <Chip
              title={"Subscription"}
              variable={data?.subscriptions}
              icon={"dash-widget-icon fa fa-cubes"}
            />

            {/* <Chip
              title={"Walk-Ins"}
              variable={data?.walkin}
              icon={"dash-widget-icon fa fa-user"}
            /> */}

            <Chip
              title={"Total Revenue"}
              variable={data?.total_revanue}
              icon={"dash-widget-icon fa fa-gem"}
            />

            <Chip
              title={"Invoices"}
              variable={data?.invoices}
              icon={"dash-widget-icon fa fa-cubes"}
            />

            <Chip
              title={"Gym Subscription"}
              variable={data?.gym_subscription}
              icon={"dash-widget-icon fa fa-cubes"}
            />

            <Chip
              title={"Trainer Subscription"}
              variable={data?.trainer_subscription}
              icon={"dash-widget-icon fa fa-cubes"}
            />
          </div>
          <Charts />
          <InvoiceTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const Chip = ({ icon, variable, title }) => {
  return (
    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
      <div className="card dash-widget">
        <div className="card-body">
          <span className={icon} />
          <div className="dash-widget-info">
            <h3>{variable}</h3>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
