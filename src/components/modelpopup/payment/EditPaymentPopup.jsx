import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import Loading from "../../Loading";
import { Refresh } from "../../../utils/refresh";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { payementStatusOptions } from "../../../utils";

const paymentDefaultValues = {
  username: "",
  subscription_type: "",
  amount: "",
  status: "",
  outstanding: "",
};

const PaymentEditPopup = ({ paymentId, refetch }) => {
  const [paymentLoading, setpaymentLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [paymentDate, setPaymentDate] = useState(null);
  const { register, handleSubmit, reset, control, setValue } = useForm({
    defaultValues: paymentDefaultValues,
  });
  const { data: paymentData } = useQuery({
    queryKey: ["payment-data", paymentId],
    queryFn: async () => {
      setpaymentLoading(true);
      if (paymentId) {
        const res = await request.findOne("payment", paymentId, {
          populate: ["user", "subscription"],
        });
        reset({
          amount: res.data.attributes.amount,
          status: res.data.attributes.status,
          label: res.data.attributes.label,
          outstanding: res.data.attributes.outstanding,
          username: `${res.data.attributes.user.data.attributes.firstname} ${res.data.attributes.user.data.attributes.lastname}`,
          subscription_type: `${res.data.attributes?.subscription?.data?.attributes?.type
            ?.split("-")
            .join(" ")}`,
        });
        setPaymentDate(res.data.attributes.payment_date);
        setpaymentLoading(false);
        return res.data;
      }
      reset(paymentDefaultValues);
      return null;
    },
  });
  //console.log(paymentData);

  const onSubmit = async (dt) => {
    setSubmitLoading(true);
    const { outstanding, status } = dt;
    try {
      await request.update("payment", paymentId, {
        data: { outstanding, status },
      });
      toast.success("Payment updated");
      document.getElementById("payment-edit-force-close").click();
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.error?.message, { duration: 4000 });
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <div id="edit_payment" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Payment</h5>
              <button
                id="payment-edit-force-close"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="modal-body">
              {paymentLoading ? (
                <>
                  <Loading />
                </>
              ) : (
                <>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Username <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            disabled
                            {...register("username", {
                              required: "This input is required.",
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Subscription Type
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            disabled
                            {...register("subscription_type", {
                              required: "This input is required.",
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Payment Date <span className="text-danger">*</span>
                          </label>
                          <div className="cal-icon">
                            <DatePicker
                              selected={paymentDate}
                              //     onChange={(date) => setBirthDate(date)}
                              className="form-control floating datetimepicker"
                              type="date"
                              required={true}
                              disabled
                              dateFormat="dd-MM-yyyy"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            disabled
                            {...register("amount", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Outstanding</label>
                          <input
                            className="form-control"
                            type="text"
                            disabled
                            {...register("outstanding")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Status <span className="text-danger">*</span>
                          </label>
                          <Controller
                            name="status"
                            control={control}
                            render={({ onChange, value, ref }) => (
                              <Select
                                options={payementStatusOptions}
                                placeholder={paymentData?.attributes?.status}
                                value={payementStatusOptions.find(
                                  (c) => c.value === value
                                )}
                                onChange={(val) =>
                                  setValue("status", val.value)
                                }
                                defaultValue={paymentData?.attributes?.status}
                              />
                            )}
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
                        disabled={submitLoading}
                      >
                        {submitLoading ? " Update...." : " Update"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentEditPopup;
