import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import request from "../../../sdk/functions";
import { Refresh } from "../../../utils/refresh";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";

const formDataDefaultValues = {
  title: "",
  link: "",
};

const AlertsAddPopup = ({ refetch }) => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState(null);
  const { register, handleSubmit } = useForm({
    defaultValues: formDataDefaultValues,
  });

  const onSubmit = async ({ title, link }) => {
    try {
      setLoading(true);
      await request.create("alert", {
        data: {
          title,
          link,
          start: startDate,
          end: endDate,
        },
      });
      document.getElementById("fc").click();
      refetch();
      toast.success("Alert Created");
    } catch (error) {
      toast.error(error.response.data.error.message, { start: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="add_alert" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Alert</h5>
              <button
                id="fc"
                type="button"
                aria-label="Close"
                className="btn-close"
                data-bs-dismiss="modal"
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
                        Title <span className="text-danger">*</span>
                      </label>
                      <textarea
                        required
                        type="text"
                        className="form-control"
                        {...register("title", {
                          required: "This input is required.",
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Link</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("link")}
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
                    type="submit"
                    // aria-label="Close"
                    disabled={loading}
                    //   data-bs-dismiss="modal"
                    className="btn btn-primary submit-btn"
                  >
                    {loading ? " Submitting..." : " Submit"}
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

export default AlertsAddPopup;
