import React from "react";
import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import request from "../../../../../sdk/functions";

const filterer = (data) => {
  const monthIndex = new Date().getMonth() + 1;
  const j = data.filter((user) => {
    const bdayMonth = new Date(user?.birthdate).getMonth() + 1;
    console.log(bdayMonth);
    return monthIndex === bdayMonth;
  });
  return j;
};

const InvoiceTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["birthdays"],
    queryFn: () =>
      request.findMany("users", {
        populate: ["branch"],
        sort: "birthdate:asc",
        pagination: {
          page: 1,
          pageSize: 10,
        },
      }),
  });

  filterer(data);

  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstname",
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
    },
    {
      title: "Birthdate",
      dataIndex: "birthdate",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      render: (text) => <span>{text?.name}</span>,
    },
  ];

  return (
    <div className="col-md-12 d-flex">
      <div className="card card-table flex-fill">
        <div className="card-header">
          <h3 className="card-title mb-0">This Month Birthdates</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <Table
              isLoading={isLoading}
              dataSource={filterer(data)}
              columns={columns}
              pagination={false}
              rowKey={(record) => record.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
