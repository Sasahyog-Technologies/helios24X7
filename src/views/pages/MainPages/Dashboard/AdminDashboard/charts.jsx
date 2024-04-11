import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import request from "../../../../../sdk/functions";

const formatter = (payments) => {
  const t = {};
  const j = [];
  payments.forEach((payment) => {
    const createdAt = formatDate(payment?.attributes?.createdAt);
    if (t[createdAt]) {
      t[createdAt] = t[createdAt] + parseFloat(payment?.attributes?.amount);
    } else {
      t[createdAt] = parseFloat(payment?.attributes?.amount);
    }
  });

  Object.keys(t).forEach((date) => {
    j.push({ y: date, "Total Revenue": t[date] });
  });

  return j;
};

const Charts = () => {
  var last7Days = getLast7Days();
  const { data, isLoading } = useQuery({
    queryKey: ["graph-data"],
    queryFn: async () => {
      const payments = await request.findMany("payment", {
        filters: {
          createdAt: {
            $gte: new Date(last7Days.at(0)),
            $lte: new Date(last7Days.at(6)),
          },
        },
      });
      return formatter(payments?.data);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12  text-center">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Weekly Overview</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={data}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <CartesianGrid />
                      <XAxis dataKey="y" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Total Revenue"
                        stroke="#ff9b44"
                        fill="#00c5fb"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;

function getLast7Days() {
  var dates = [];
  for (var i = 6; i >= 0; i--) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

function formatDate(inputDate) {
  var date = new Date(inputDate);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  // Adding leading zeros if necessary
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return day + "-" + month + "-" + year;
}
