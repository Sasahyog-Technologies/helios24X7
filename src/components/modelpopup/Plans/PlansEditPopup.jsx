import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import Loading from "../../Loading";
import { Refresh } from "../../../utils/refresh";
import Select from "react-select";
import { durationOptions } from "../../../utils";

const planDefaultValues = {
  title: "",
  price: "",
  duration: "",
  desc: "",
  branch: "",
  seleted: "",
};

const PlanEditPopup = ({ planId }) => {
  const [planLoading, setplanLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);

  const selectedOptions = [
    {
      value: true,
      label: "Selected",
    },
    {
      value: false,
      label: "Not Selected",
    },
  ];

  const { register, handleSubmit, reset, control, setValue } =
    useForm({
      defaultValues: planDefaultValues,
    });
  const {
    data: planData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["plan-data"],
    queryFn: async () => {
      setplanLoading(true);
      if (planId) {
        const res = await request.findOne("plan", planId, {
          populate: ["branch"],
        });
        reset({
          title: res.data.attributes.title,
          price: res.data.attributes.price,
          duration: res.data.attributes.duration,
          desc: res.data.attributes.desc,
          branch: res.data?.attributes?.branch?.data?.id || "",
          seleted: res?.data?.attributes?.seleted || false,
        });
        setplanLoading(false);
        return res.data;
      }
      reset(planDefaultValues);
      return null;
    },
  });

  //console.log(planData)

  const onSubmit = async (dt) => {
    setSubmitLoading(true);
    try {
      await request.update("plan", planId, {
        data: { ...dt },
      });
      toast.success("plan updated");
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
  }, [planId, refetch, reset]);

  useQuery({
    queryKey: ["fetch-branches"],
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
      <div id="edit_plan" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Plan</h5>
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
              {planLoading ? (
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
                            Price <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            {...register("price", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Duration (Month)
                            <span className="text-danger">*</span>
                          </label>
                          <Controller
                            name="duration"
                            control={control}
                            render={({ onChange, value, ref }) => (
                              <Select
                                options={durationOptions}
                                placeholder={`${planData?.attributes?.duration}`}
                                value={durationOptions.find(
                                  (c) => c.value === value
                                )}
                                onChange={(val) =>
                                  setValue("duration", val.value)
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Description</label>
                          <textarea
                            className="form-control"
                            type="text"
                            {...register("desc")}
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
                                placeholder={
                                  planData?.attributes?.branch?.data?.attributes
                                    ?.name
                                }
                                value={branchOptions.find(
                                  (c) => c.value === value
                                )}
                                onChange={(val) =>
                                  setValue("branch", val.value)
                                }
                                defaultValue={
                                  planData?.attributes?.branch?.data?.attributes
                                    ?.name
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Show on Landing Page{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Controller
                            name="seleted"
                            control={control}
                            render={({ onChange, value, ref }) => (
                              <Select
                                options={selectedOptions}
                                placeholder={
                                  planData?.attributes?.seleted
                                    ? "Selected"
                                    : "Not Selected"
                                }
                                value={selectedOptions.find(
                                  (c) => c.value === value
                                )}
                                onChange={(val) =>
                                  setValue("seleted", val.value)
                                }
                                defaultValue={planData?.attributes?.seleted}
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

export default PlanEditPopup;
