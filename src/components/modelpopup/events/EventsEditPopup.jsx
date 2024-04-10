import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import Loading from "../../Loading";
import { Refresh } from "../../../utils/refresh";
import DatePicker from "react-datepicker";
import { EventCategoryOptions } from "../../../utils";
import Select from "react-select";

const userDefaultValues = {
  title: "",
  description: "",
  category: "",
};

const EventEditPopup = ({ eventId }) => {
  const [userLoading, setUserLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [file, setFile] = useState();
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  const { register, handleSubmit, reset, control, setValue } = useForm({
    defaultValues: userDefaultValues,
  });
  const { data: eventData, refetch } = useQuery({
    queryKey: ["event-data"],
    queryFn: async () => {
      setUserLoading(true);
      if (eventId) {
        const res = await request.findOne("event", eventId);
        reset({
          title: res?.data?.attributes?.title,
          description: res?.data?.attributes?.desc,
          category: res?.data?.attributes?.category,
        });
        setStartDate(res?.data?.attributes?.start);
        setEndDate(res?.data?.attributes?.end);
        setUserLoading(false);
        return res.data;
      }
      reset(userDefaultValues);
      return null;
    },
  });

  const onSubmit = async (dt) => {
    setSubmitLoading(true);
    try {
      await request.update("event", eventId, {
        data: { ...dt, start: startDate, end: endDate },
      });
      // Update Image
      const formData = new FormData();
      formData.append("files", file);
      formData.append("field", "media");
      formData.append("refId", eventId);
      formData.append("ref", "api::event.event");
      await fetch(
        "https://helios24x7backend-production.up.railway.app/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      toast.success("Event updated");
      Refresh();
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "Something Went Wrong",
        { duration: 4000 }
      );
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [eventId, refetch, reset]);

  return (
    <>
      <div id="edit_event" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Event</h5>
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
              {userLoading ? (
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
                          <input
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
                            Start Date <span className="text-danger">*</span>
                          </label>
                          <div className="cal-icon">
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              className="form-control floating datetimepicker"
                              type="date"
                              dateFormat="dd-MM-yyyy"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            End Date <span className="text-danger">*</span>
                          </label>
                          <div className="cal-icon">
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                              className="form-control floating datetimepicker"
                              type="date"
                              dateFormat="dd-MM-yyyy"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Category <span className="text-danger">*</span>
                          </label>
                          <Controller
                            name="category"
                            control={control}
                            render={({ value }) => (
                              <Select
                                options={EventCategoryOptions}
                                placeholder={eventData?.attributes?.category}
                                value={EventCategoryOptions.find(
                                  (c) => c.value === value
                                )}
                                onChange={(val) =>
                                  setValue("category", val.value)
                                }
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            descriptionription
                          </label>
                          <textarea
                            className="form-control"
                            type="text"
                            {...register("description")}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Image</label>
                          <input
                            required
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={handleImageChange}
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

export default EventEditPopup;
