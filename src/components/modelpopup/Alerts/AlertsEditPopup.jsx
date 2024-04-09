import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import Loading from "../../Loading";
import { Refresh } from "../../../utils/refresh";
import DatePicker from "react-datepicker";
const AlertDefaultValues = {
  title: "",
  link: "",
};

const AlertsEditPopup = ({ alertId }) => {
  const [AlertLoading, setAlertLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: AlertDefaultValues,
  });
  const { isLoading: alertIsLoading, refetch } = useQuery({
    queryKey: ["alert-data"],
    queryFn: async () => {
      setAlertLoading(true);
      if (alertId) {
        const res = await request.findOne("alert", alertId);
        reset({
          title: res.data.attributes.title,
          link: res.data.attributes.link,
        });
        setStartDate(res.data.attributes.start);
        setEndDate(res.data.attributes.end);
        setAlertLoading(false);
        return res;
      }
      reset(AlertDefaultValues);
      return null;
    },
  });

  const onSubmit = async (dt) => {
    setSubmitLoading(true);
    try {
      await request.update("alert", alertId, {
        data: { ...dt, start: startDate, end: endDate },
      });
      toast.success("Alert updated");
      Refresh();
    } catch (error) {
      toast.error(error?.response?.data?.error?.message, { mobile: 4000 });
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [alertId, refetch, reset]);

  return (
    <>
      <div id="edit_alert" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Alert</h5>
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
              {AlertLoading ? (
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
                            Title <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            type="text"
                            required
                            {...register("title", {
                              required: "This input is required.",
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Link <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            {...register("link", { required: true })}
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Start<span className="text-danger">*</span>
                          </label>
                          <div className="cal-icon">
                            <DatePicker
                              onChange={(date) => setStartDate(date)}
                              className="form-control floating datetimepicker"
                              type="date"
                              required={true}
                              selected={startDate}
                              dateFormat="dd-MM-yyyy"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            End<span className="text-danger">*</span>
                          </label>
                          <div className="cal-icon">
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                              className="form-control floating datetimepicker"
                              type="date"
                              required={true}
                              dateFormat="dd-MM-yyyy"
                            />
                          </div>
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

export default AlertsEditPopup;
