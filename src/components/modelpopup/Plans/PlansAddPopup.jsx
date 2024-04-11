import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import request from "../../../sdk/functions";
import { Refresh } from "../../../utils/refresh";
import { useQuery } from "@tanstack/react-query";
import { durationOptions } from "../../../utils";

const formDataDefaultValues = {
  title: "",
  price: "",
  duration: "",
  description: "",
  branch: "",
};

const PlansAddPopup = ({ refetch }) => {
  const [loading, setLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: formDataDefaultValues,
  });

  const onSubmit = async ({ title, price, duration, description, branch }) => {
    try {
      setLoading(true);
      await request.create("plan", {
        data: {
          title: title,
          price: price,
          desc: description,
          duration: duration,
          branch: branch,
        },
      });
      toast.success("Plan Created");
      document.getElementById("plan-add-force-close").click();
      refetch();
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useQuery({
    queryKey: ["fetch-branch"],
    queryFn: async () => {
      let branches = await request.findMany("branch");
      let branchesArr = branches?.data?.map((branch) => ({
        value: branch.id,
        label: branch.attributes.name,
      }));
      setBranchOptions(branchesArr);
    },
  });

  return (
    <>
      <div id="add_plan" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Plan</h5>
              <button
                id="plan-add-force-close"
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
                        Duration (Month)<span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="trainer"
                        control={control}
                        render={({ onChange, value, ref }) => (
                          <Select
                            options={durationOptions}
                            placeholder="Select"
                            value={durationOptions.find(
                              (c) => c.value === value
                            )}
                            onChange={(val) => setValue("duration", val.value)}
                            required
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
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

export default PlansAddPopup;
