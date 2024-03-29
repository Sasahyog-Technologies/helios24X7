import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import request from "../../../sdk/functions";
import { paymentTypeOptions } from "../../../utils";
import { calculateEndDate } from "../../../utils/calculateEndDate";
import { Refresh } from "../../../utils/refresh";

const formDataDefaultValues = {
  paid: "",
  outstanding: "",
  duration: "",
  paymentType: "",
};

const ExtendPTPSubscriptionPopup = ({ userId, ptpId, activePlanEndDate,setActivePlanEndDate }) => {
  const [loading, setLoading] = useState(false);
 

   console.log(activePlanEndDate, `ptp : ${ptpId}` , `userid: ${userId}`);

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
    //if (!activePlanEndDate) return null;
    console.log("call");
    const endDate = calculateEndDate(activePlanEndDate, data.duration);
    try {
      setLoading(true);
      await request.create("subscription", {
        data: {
          user: userId,
          paid: data.paid,
          outstanding: data.outstanding || null,
          start: activePlanEndDate,
          end: endDate,
          payment_type: data.paymentType,
          type: "trainer-subscription",
          personal_training_program: ptpId,
        },
      });
      toast.success("Subscription extended");
      setActivePlanEndDate(null)
      Refresh();
    } catch (error) {
      toast.error(error?.response?.data?.error?.message, { duration: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        id="extend_subscription"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-paid">Extend PTP Subscription</h5>
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
                        {...register("paid")}
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
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Duration(Month) <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        required
                        {...register("duration")}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">outstanding</label>
                      <input
                        className="form-control"
                        type="text"
                        {...register("outstanding")}
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
                    {loading ? " Extend...." : " Extend"}
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

export default ExtendPTPSubscriptionPopup;
