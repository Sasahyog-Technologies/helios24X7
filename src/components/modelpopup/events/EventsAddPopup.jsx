import Select from "react-select";
import toast from "react-hot-toast";
import React, { useState } from "react";
import request from "../../../sdk/functions";
import { useForm, Controller } from "react-hook-form";
import { EventCategoryOptions } from "../../../utils/index";
import { Refresh } from "../../../utils/refresh";

const formDataDefaultValues = {
  title: "",
  category: "",
  end_date: "",
  start_date: "",
  description: "",
};

const EventsAddPopup = () => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: formDataDefaultValues,
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Create Event
      const event = await request.create("event", {
        data: {
          title: data?.title,
          desc: data?.description,
          category: data?.category,
          end: new Date(data?.end_date).toISOString(),
          start: new Date(data?.start_date).toISOString(),
        },
      });

      // Update Image
      const eventId = event.data.id;
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
      toast.success("event created");
      Refresh();
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="add_event" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Events</h5>
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
                  <div className="col-sm-12">
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
                  <div className="col-sm-12">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Description</label>
                      <textarea
                        className="form-control"
                        type="text"
                        {...register("description")}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Start Date</label>
                      <input
                        required
                        className="form-control"
                        type="date"
                        {...register("start_date")}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">End Date</label>
                      <input
                        className="form-control"
                        type="date"
                        {...register("end_date")}
                      />
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
                            placeholder="Select"
                            value={EventCategoryOptions.find(
                              (c) => c.value === value
                            )}
                            onChange={(val) => setValue("category", val.value)}
                          />
                        )}
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
                    type="submit"
                    disabled={loading}
                    aria-label="Close"
                    data-bs-dismiss="modal"
                    className="btn btn-primary submit-btn"
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

export default EventsAddPopup;
