import React from "react";
import InvoiceView from "./InvoiceView";
import request from "../../../sdk/functions";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import Breadcrumbs from "../../../components/Breadcrumbs";

const InvoiceDetials = () => {
  const path = window.location.pathname;
  const invoiceId = path.split("/")[path.split("/").length - 1];

  const { data: invoiceData, isLoading: invoiceLoading } = useQuery({
    queryKey: ["invoice-data", invoiceId],
    queryFn: async () => {
      if (invoiceId) {
        const data = await request.findOne("invoice", invoiceId, {
          populate: [
            "user",
            "payment",
            "user.branch",
            "subscription",
            "subscription.plan",
            "subscription.personal_training_program",
            "subscription.personal_training_program.trainer",
          ],
        });
        return data?.data?.attributes;
      }
      return null;
    },
  });

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Invoice"
            title="Dashboard"
            subtitle="Details"
          />

          {invoiceLoading && <Loading />}

          {!invoiceLoading && (
            <InvoiceView
              branchData={
                invoiceData.user.data.attributes.branch.data.attributes
              }
              start={invoiceData?.subscription?.data?.attributes?.start}
              end={invoiceData?.subscription?.data?.attributes?.end}
              subscriptionType={
                invoiceData?.subscription?.data?.attributes?.type
              }
              trainer={
                invoiceData?.subscription?.data?.attributes
                  ?.personal_training_program?.data?.attributes?.trainer?.data
                  ?.attributes?.firstname +
                " " +
                invoiceData?.subscription?.data?.attributes
                  ?.personal_training_program?.data?.attributes?.trainer?.data
                  ?.attributes?.lastname
              }
              invoiceNumber={invoiceId}
              amount={invoiceData?.amount}
              discount={invoiceData?.discount}
              outstanding={invoiceData?.outstanding}
              invoice_date={invoiceData?.invoice_date}
              userMobile={invoiceData?.user?.data?.attributes?.mobile}
              userLastName={invoiceData?.user?.data?.attributes?.lastname}
              userFirstName={invoiceData?.user?.data?.attributes?.firstname}
              paymentType={
                invoiceData?.subscription?.data?.attributes?.payment_type
              }
              planName={
                invoiceData?.subscription?.data?.attributes?.plan?.data
                  ?.attributes.title
              }
              planPrice={
                invoiceData?.subscription?.data?.attributes?.plan?.data
                  ?.attributes.price
              }
              planDuration={
                invoiceData?.subscription?.data?.attributes?.plan?.data
                  ?.attributes.title
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default InvoiceDetials;
