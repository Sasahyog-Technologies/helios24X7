import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import request from "../../../sdk/functions";
import { Refresh } from "../../../utils/refresh";
import { useQuery } from "@tanstack/react-query";

const formDataDefaultValues = {
  firstname: "",
  lastname: "",
  mobile: "",
  reffered_by: "",
  //branch:""
};

const WalkinsAddPopup = ({ refetch }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: formDataDefaultValues,
  });

  const onSubmit = async ({ firstname, lastname, mobile, reffered_by }) => {
    try {
      setLoading(true);
      await request.create("walkin", {
        data: {
          firstname,
          lastname,
          mobile,
          reffered_by,
        },
      });
      toast.success("Walkin Created");
      document.getElementById("walkin-add-force-close").click();
      refetch();
    } catch (error) {
      toast.error(error.response.data.error.message, { mobile: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="add_walkin" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-firstname">Add walkin</h5>
              <button
                id="walkin-add-force-close"
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
                        Firstname <span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        {...register("firstname", {
                          required: "This input is required.",
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Lastname <span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        {...register("lastname", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Mobile No <span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        type="number"
                        className="form-control"
                        {...register("mobile", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Reffered By</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("reffered_by")}
                      />
                    </div>
                  </div>
                </div>
                {/*     <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Branch <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="branch"
                        control={control}
                        render={({ onChange, value, ref }) => (
                          <Select
                            options={branchOptions}
                            placeholder="Select"
                            value={branchOptions.find((c) => c.value === value)}
                            onChange={(val) => setValue("branch", val.value)}
                            required
                          />
                        )}
                        rules={{ required: true }}
                      />
                    </div>
                  </div> */}

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

export default WalkinsAddPopup;
