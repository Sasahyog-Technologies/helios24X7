import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm,Controller } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import Loading from "../../Loading";
import { Refresh } from "../../../utils/refresh";
import Select from "react-select";
const userDefaultValues = {
  firstname: "",
  lastname: "",
  mobile: "",
  email: "",
  branch: "",
  weight: "",
  height: "",
  bmr: "",
  chest: "",
  hip: "",
  biceps: "",
  calf: "",
  weist: "",
  neck: "",
};

const ClientEditPopup = ({ userId }) => {
  const [bodyDetailId, setBodyDetailId] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const { register, handleSubmit, reset,control,setValue } = useForm({
    defaultValues: userDefaultValues,
  });
  const { data: userData, isLoading: userIsLoading, refetch } = useQuery({
    queryKey: ["client-data"],
    queryFn: async () => {
      setUserLoading(true);
      if (userId) {
        const data = await request.findOne("users", userId, {
          populate: ["branch", "body_detail"],
        });
        reset({
          firstname: data.firstname,
          lastname: data.lastname,
          mobile: data.mobile,
          email: data.email,
          branch: data?.branch?.id || "",
          weight: data?.body_detail?.weight || null,
          height: data?.body_detail?.height || null,
          bmr: data?.body_detail?.bmr || null,
          chest: data?.body_detail?.chest || null,
          hip: data?.body_detail?.hip || null,
          biceps: data?.body_detail?.biceps || null,
          calf: data?.body_detail?.calf || null,
          weist: data?.body_detail?.weist || null,
          neck: data?.body_detail?.neck || null,
        });
        setBodyDetailId(data?.body_detail?.id || null);
        setUserLoading(false);
        return data;
      }
      reset(userDefaultValues);
      return null;
    },
  });

  const onSubmit = async (data) => {
    console.log("id", bodyDetailId);
    try {
      setSubmitLoading(true);
      if (bodyDetailId) {
        await request.update("bodyDetail", bodyDetailId, {
          data: {
            weight: data.weight || null,
            height: data.height || null,
            bmr: data.bmr || null,
            chest: data.chest || null,
            hip: data.hip || null,
            biceps: data.biceps || null,
            calf: data.calf || null,
            weist: data.weist || null,
            neck: data.neck || null,
          },
        });
      }

      await request.update("users", userId, {
        firstname: data.firstname,
        lastname: data.lastname,
        branch: data?.branch,
      });

      //   console.log(bodyDetailRes);
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
    queryKey:["fetch-branches"],
    queryFn: async () => {
      let branches = await request.findMany("branch");
      let branchesArr = branches?.data?.map((branch) => ({
        value: branch.id,
        label: branch.attributes.name,
      }));
      setBranchOptions(branchesArr);
    }
  })

  return (
    <>
      <div id="edit_client" className="modal custom-modal fade" role="dialog">
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

                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Weight (Kg) <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            {...register("weight", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Height (cm)
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            {...register("height")}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            BMR (cal/day)
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            {...register("bmr")}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Chest (cm)</label>
                          <input
                            className="form-control"
                            type="text"
                            {...register("chest")}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Hip (cm)</label>
                          <input
                            className="form-control"
                            type="text"
                            {...register("hip")}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Biceps (cm)</label>
                          <input
                            className="form-control"
                            type="text"
                            {...register("biceps")}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Calf (cm)</label>
                          <input
                            className="form-control"
                            type="text"
                            {...register("calf")}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Weist (cm)</label>
                          <input
                            className="form-control"
                            type="text"
                            {...register("weist")}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Neck (cm)</label>
                          <input
                            className="form-control"
                            type="text"
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
