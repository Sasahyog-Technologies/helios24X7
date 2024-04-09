import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import Loading from "../../Loading";
import { Refresh } from "../../../utils/refresh";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { subscriptionStatusOptions } from "../../../utils";
import { ErrorMessage } from "@hookform/error-message";

const membershipDefaultValues = {
  paid: "",
  status: "",
  outstanding: "",
  label: "",
  username: "",
  subscription_type: "",
  payment_type: "",
  plan: "",
};

const MembershipEditPopup = ({ membershipId }) => {
  const [membershipLoading, setmembershipLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: membershipDefaultValues,
  });
  const { data: membershipData, refetch } = useQuery({
    queryKey: ["single-membership-data"],
    queryFn: async () => {
      if (membershipId) {
        setmembershipLoading(true);

        const res = await request.findOne("subscription", membershipId, {
          populate: ["user", "plan"],
        });
        reset({
          paid: res.data.attributes.paid,
          status: res.data.attributes.status,
          outstanding: res.data.attributes.outstanding,
          label: res.data.attributes.label,
          username: `${res?.data?.attributes?.user?.data?.attributes?.firstname} ${res?.data?.attributes?.user?.data?.attributes?.lastname}`,
          subscription_type: res.data.attributes.type,
          payment_type: res.data.attributes.payment_type,
          plan: res?.data?.attributes?.plan?.data?.attributes?.title,
        });
        setStartDate(res.data.attributes.start);
        setEndDate(res.data.attributes.end);
        setmembershipLoading(false);
        return res.data;
      }
      reset(membershipDefaultValues);
      return null;
    },
  });
  //console.log(membershipData);

  const onSubmit = async (dt) => {
    setSubmitLoading(true);
    const { outstanding, status, paid } = dt;
    try {
      await request.update("subscription", membershipId, {
        data: { outstanding, status, paid },
      });
      toast.success("membership updated");
      Refresh();
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [membershipId, refetch, reset]);

  return (
    <>
      <div
        id="edit_subscription"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit membership</h5>
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
              {membershipLoading ? (
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
                              required: "Username is required.",
                            })}
                          />
                          <ErrorMessage errors={errors} name="username" />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Plan <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            disabled
                            {...register("plan", {
                              required: "Please Select Plan",
                            })}
                          />
                          <ErrorMessage errors={errors} name="plan" />
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
                              required: "Subscription Type is required.",
                            })}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="subscription_type"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Payment Type
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            disabled
                            {...register("payment_type", {
                              required: "Payment Type is required.",
                            })}
                          />
                          <ErrorMessage errors={errors} name="payment_type" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Start Date
                            <span className="text-danger">*</span>
                          </label>
                          <div className="cal-icon">
                            <DatePicker
                              selected={startDate}
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
                            End Date
                            <span className="text-danger">*</span>
                          </label>
                          <div className="cal-icon">
                            <DatePicker
                              selected={endDate}
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
                            Paid <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            {...register("paid", {
                              required: "Paid amount is required",
                            })}
                          />
                          <ErrorMessage errors={errors} name="paid" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Outstanding</label>
                          <input
                            className="form-control"
                            type="text"
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
                                options={subscriptionStatusOptions}
                                placeholder={membershipData?.attributes?.status}
                                value={subscriptionStatusOptions.find(
                                  (c) => c.value === value
                                )}
                                onChange={(val) =>
                                  setValue("status", val.value)
                                }
                                defaultValue={
                                  membershipData?.attributes?.status
                                }
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

export default MembershipEditPopup;
