import toast from "react-hot-toast";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import request from "../../../sdk/functions";
import { useQueryClient } from "@tanstack/react-query";

const formDataDefaultValues = {
  title: "",
  price: "",
  duration: "",
  description: "",
};

const PlansAddPopup = ({ refetch }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: formDataDefaultValues,
  });

  const onSubmit = async ({ title, price, duration, description }) => {
    try {
      setLoading(true);
      await request.create("plan", {
        data: {
          title: title,
          price: price,
          desc: description,
          duration: duration,
        },
      });
      refetch();
      toast.success("Plan Created");
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="add_plan" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Plan</h5>
              <button
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
                      <input
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
                      <label className="col-form-label">
                        Price <span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        type="number"
                        className="form-control"
                        {...register("price", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Duration <span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        type="number"
                        className="form-control"
                        {...register("duration", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        {...register("description")}
                      />
                    </div>
                  </div>
                </div>

                <div className="submit-section">
                  <button
                    type="submit"
                    aria-label="Close"
                    disabled={loading}
                    data-bs-dismiss="modal"
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

export default PlansAddPopup;
