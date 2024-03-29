import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import Loading from "../../Loading";
import Select from "react-select";
import { Refresh } from "../../../utils/refresh";
const userDefaultValues = {
  firstname: "",
  lastname: "",
  mobile: "",
  email: "",
  branch: "",
};

const TrianerEditPopup = ({ userId }) => {
  const [userLoading, setUserLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const { register, handleSubmit, reset, control, setValue } = useForm({
    defaultValues: userDefaultValues,
  });
  const {
    data: userData,
    isLoading: userIsLoading,
    refetch,
  } = useQuery({
    queryKey: ["trainer-data"],
    queryFn: async () => {
      setUserLoading(true);
      if (userId) {
        const data = await request.findOne("users", userId, {
          populate: ["branch"],
        });
        reset({
          firstname: data.firstname,
          lastname: data.lastname,
          mobile: data.mobile,
          email: data.email,
          branch: data?.branch?.id || "",
        });
        setUserLoading(false);
        return data;
      }
      reset(userDefaultValues);
      return null;
    },
  });

  const onSubmit = async (data) => {
    setSubmitLoading(true);
    try {
      await request.update("users", userId, {
        firstname: data.firstname,
        lastname: data.lastname,
        branch: data?.branch,
      });
      Refresh();
      toast.success("Trainer Updated");
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [userId, refetch, reset]);

  useEffect(() => {
    let fetchBranchPlans = async () => {
      let branches = await request.findMany("branch");
      let branchesArr = branches?.data?.map((branch) => ({
        value: branch.id,
        label: branch.attributes.name,
      }));
      setBranchOptions(branchesArr);
    };
    fetchBranchPlans();
  }, []);

  return (
    <>
      <div id="edit_trainer" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Client</h5>
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
                            First Name <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            {...register("firstname", {
                              required: "This input is required.",
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Last Name <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            {...register("lastname", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            disabled
                            {...register("mobile", { required: true })}
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
                                placeholder={userData?.branch?.name}
                                value={branchOptions.find(
                                  (c) => c.value === value
                                )}
                                onChange={(val) =>
                                  setValue("branch", val.value)
                                }
                                defaultValue={userData?.branch?.name}
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

export default TrianerEditPopup;
