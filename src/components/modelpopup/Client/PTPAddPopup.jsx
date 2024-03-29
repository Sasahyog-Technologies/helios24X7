import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import { Refresh } from "../../../utils/refresh";
import Select from "react-select";
import DatePicker from "react-datepicker";

const formDataDefaultValues = {
  plan: "",
  paid: "",
  outstanding: "",
  trainer: "",
};

const PtpAddPopup = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(Date.now());
  const [planOptions, setPlanOptions] = useState([]);
  const [trainerOptions, setTrainerOptions] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: formDataDefaultValues,
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let subscriptionRes = await request.create("subscription", {
        data: {
          user: userId,
          plan: data.plan,
          paid: data.paid,
          outstanding: data.outstanding,
          start: startDate,
          payment_type: "cash",
          type: "trainer-subscription",
        },
      });
      const response = await request.create("ptp", {
        data: {
          trainee: userId,
          trainer: data.trainer,
          subscription: subscriptionRes.data.id,
        },
      });
      console.log(response);
      toast.success("PTP created");
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
      let plansArr = plans?.data?.map((plan) => ({
        value: plan.id,
        label: plan.attributes.title,
      }));
      setPlanOptions(plansArr);
      const trainer = await request.findMany("users", {
        filters: {
          type: "trainer",
        },
      });
      let trainerArr = trainer?.map((t) => ({
        value: t.id,
        label: `${t.firstname} ${t.lastname}`,
      }));
      setTrainerOptions(trainerArr);
    };
    fetchBranchPlans();
  }, []);

  return (
    <>
      <div id="add_ptp" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-paid">Add Trainer</h5>
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
                        paid <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        {...register("paid", {
                          required: "This input is required.",
                        })}
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
                        outstanding <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        {...register("outstanding", { required: true })}
                      />
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
                            onChange={(val) => setValue("plan", val.value)}
                            required
                          />
                        )}
                        rules={{ required: true }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Trainer<span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="trainer"
                        control={control}
                        render={({ onChange, value, ref }) => (
                          <Select
                            options={trainerOptions}
                            placeholder="Select"
                            value={trainerOptions.find(
                              (c) => c.value === value
                            )}
                            onChange={(val) => setValue("trainer", val.value)}
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

export default PtpAddPopup;