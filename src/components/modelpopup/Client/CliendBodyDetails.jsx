import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import request from "../../../sdk/functions";
import { Refresh } from "../../../utils/refresh";

const userDefaultValues = {
  hip: "",
  bmr: "",
  calf: "",
  chest: "",
  branch: "",
  weight: "",
  height: "",
  biceps: "",
  weist: "",
  neck: "",
};

const ClientBodyDetails = ({ userId }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: userDefaultValues,
  });

  const onSubmit = async (data) => {
    try {
      setSubmitLoading(true);
      await request.create("body-tracking", {
        data: {
          user: userId,
          bmr: data.bmr || null,
          hip: data.hip || null,
          calf: data.calf || null,
          neck: data.neck || null,
          chest: data.chest || null,
          weist: data.weist || null,
          weight: data.weight || null,
          height: data.height || null,
          biceps: data.biceps || null,
        },
      });
      toast.success("details updated");
      Refresh();
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <div
        role="dialog"
        id="edit_body_details"
        className="modal custom-modal fade"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Body Details</h5>
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
                        Weight (Kg) <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        required
                        {...register("weight", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Height (cm)</label>
                      <input
                        className="form-control"
                        type="number"
                        {...register("height")}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">BMR (cal/day)</label>
                      <input
                        className="form-control"
                        type="number"
                        {...register("bmr")}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Chest (cm)</label>
                      <input
                        className="form-control"
                        type="number"
                        {...register("chest")}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Hip (cm)</label>
                      <input
                        className="form-control"
                        type="number"
                        {...register("hip")}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Biceps (cm)</label>
                      <input
                        className="form-control"
                        type="number"
                        {...register("biceps")}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Calf (cm)</label>
                      <input
                        className="form-control"
                        type="number"
                        {...register("calf")}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Weist (cm)</label>
                      <input
                        className="form-control"
                        type="number"
                        {...register("weist")}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Neck (cm)</label>
                      <input
                        className="form-control"
                        type="number"
                        {...register("neck")}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientBodyDetails;
