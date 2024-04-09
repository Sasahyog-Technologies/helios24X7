import Select from "react-select";
import toast from "react-hot-toast";
import Loading from "../../Loading";
import { useEffect, useState } from "react";
import request from "../../../sdk/functions";
import { Refresh } from "../../../utils/refresh";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";

const userDefaultValues = {
  firstname: "",
  lastname: "",
  mobile: "",
  branch: "",
  email: "",
};

const ClientEditPopup = ({ userId }) => {
  const [userLoading, setUserLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const { register, handleSubmit, reset, control, setValue } = useForm({
    defaultValues: userDefaultValues,
  });

  const { data: userData, refetch } = useQuery({
    queryKey: ["client-data"],
    queryFn: async () => {
      setUserLoading(true);
      if (userId) {
        const data = await request.findOne("users", userId, {
          populate: ["branch", "body_detail"],
        });
        reset({
          email: data.email,
          mobile: data.mobile,
          lastname: data.lastname,
          firstname: data.firstname,
        });
        setUserLoading(false);
        return data;
      }
      reset(userDefaultValues);
      return null;
    },
  });

  const onSubmit = async (data) => {
    try {
      setSubmitLoading(true);
      await request.update("users", userId, {
        branch: data?.branch,
        lastname: data.lastname,
        firstname: data.firstname,
      });
      toast.success("client updated");
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
  }, [userId, refetch, reset]);

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
      <div id="edit_client" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Client</h5>
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

                      {/*    <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Joining Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          className="form-control floating datetimepicker"
                          type="date"
                          required={true}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div> */}
                      {/*      <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Date of Birth <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={birthDate}
                          onChange={(date) => setBirthDate(date)}
                          className="form-control floating datetimepicker"
                          type="date"
                          required={true}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div> */}

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
                        type="submit"
                        disabled={submitLoading}
                        className="btn btn-primary submit-btn"
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

export default ClientEditPopup;
