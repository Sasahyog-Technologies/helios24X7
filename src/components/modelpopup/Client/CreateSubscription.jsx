import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import { Refresh } from "../../../utils/refresh";
import Select from "react-select";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { calculateEndDate } from "../../../utils/calculateEndDate";
import { InvoiceNumberGenerator } from "../../../utils/invoiceNumberGenerate";
import { paymentTypeOptions } from "../../../utils";

const formDataDefaultValues = {
  plan: "",
  paid: "",
  outstanding: 0,
  paymentType: "",
  planPrice: 0,
};

const CreateSubscriptionPopup = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(Date.now());
  const [planOptions, setPlanOptions] = useState([]);
  const [plans, setPlans] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: formDataDefaultValues,
  });

  const onSubmit = async (data) => {
    if (parseInt(data.paid) > parseInt(data.planPrice)) {
      return toast.error("Amount is greater than plan price");
    }
    try {
      setLoading(true);
      const planDuration = plans.find((pt) => pt.id == data.plan)?.attributes
        .duration;
      let subsRes = await request.create("subscription", {
        data: {
          user: userId,
          plan: data.plan,
          paid: data.paid,
          outstanding: data.outstanding || null,
          start: startDate,
          end: calculateEndDate(startDate, planDuration),
          payment_type: data.paymentType,
          type: "gym-subscription",
        },
      });
      let paymentRes = await request.create("payment", {
        data: {
          user: userId,
          subscription: subsRes.data.id,
          amount: data.paid,
          outstanding: data.outstanding || null,
          payment_date: new Date().toISOString(),
          status: "success",
          payment_type: data.paymentType,
        },
      });
      await request.create("invoice", {
        data: {
          user: userId,
          subscription: subsRes.data.id,
          payment: paymentRes.data.id,
          invoice_number: InvoiceNumberGenerator(),
          invoice_date: new Date().toISOString(),
          amount: data.paid,
          outstanding: data.outstanding || null,
        },
      });
      toast.success("Subscription created");
      Refresh();
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let fetchBranchPlans = async () => {
      let plans = await request.findMany("plan");
      setPlans(plans.data);
      let plansArr = plans?.data?.map((plan) => ({
        value: plan.id,
        label: plan.attributes.title,
        price: plan.attributes.price,
      }));
      setPlanOptions(plansArr);
    };
    fetchBranchPlans();
  }, []);

  return (
    <>
      <div
        id="create_subscription"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-paid">Create Subscription</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* {JSON.stringify(userInfo)} */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Paid <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="paid"
                        control={control}
                        render={({ onChange, value, ref }) => (
                          <input
                            className="form-control"
                            value={value}
                            type="number"
                            required
                            onChange={(e) => {
                              setValue("paid", e.target.value);
                              setValue(
                                "outstanding",
                                getValues("planPrice") - e.target.value
                              );
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Joining Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          className="form-control floating datetimepicker"
                          type="date"
                          required={true}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Plan<span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="plan"
                        control={control}
                        render={({ onChange, value, ref }) => (
                          <Select
                            options={planOptions}
                            placeholder="Select"
                            value={planOptions.find((c) => c.value === value)}
                            onChange={(val) => {
                              setValue("plan", val.value);
                              setValue("planPrice", parseInt(val.price));
                              setValue(
                                "outstanding",
                                getValues("planPrice") - getValues("paid")
                              );
                            }}
                            required
                          />
                        )}
                        rules={{ required: true }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Outstanding</label>
                      <input
                        className="form-control"
                        type="number"
                        disabled
                        {...register("outstanding")}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Payment Type<span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="plan"
                        control={control}
                        render={({ onChange, value, ref }) => (
                          <Select
                            options={paymentTypeOptions}
                            placeholder="Select"
                            value={paymentTypeOptions.find(
                              (c) => c.value === value
                            )}
                            onChange={(val) =>
                              setValue("paymentType", val.value)
                            }
                            required
                          />
                        )}
                        rules={{ required: true }}
                      />
                    </div>
                  </div>
                </div>

                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    // data-bs-dismiss="modal"
                    // aria-label="Close"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? " Submit...." : " Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSubscriptionPopup;
