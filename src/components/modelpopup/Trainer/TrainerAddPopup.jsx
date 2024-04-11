import Select from "react-select";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import request from "../../../sdk/functions";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

const formDataDefaultValues = {
  firstname: "",
  lastname: "",
  mobile: "",
  password: "",
  email: `random${Math.floor(
    Math.random() * 1000 * Math.random() * 10
  )}@gmail.com`, // please use uuid for unique email
  branch: "",
  gender: "",
  social_link: "",
};

const TrainerAddPopup = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [branchOptions, setBranchOptions] = useState([]);
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: formDataDefaultValues,
  });

  const onSubmit = async (data) => {
    if (data.mobile.length > 10 || data.mobile.length < 10)
      return toast.error("Mobile must be at least 10");
    try {
      setLoading(true);
      await request.create("register", {
        username: data.mobile,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        mobile: data.mobile,
        email: data.email,
        branch: data.branch,
        birthdate: birthDate,
        type: "trainer",
        gender: data.gender,
        social_link: data.social_link,
      });
      document.getElementById("trainer-add-force-close").click();
      queryClient?.invalidateQueries({ queryKey: ["trainer-list"] });
      toast.success("Trainer Created");
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
      <div id="add_trainer" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Trainer</h5>
              <button
                id="trainer-add-force-close"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* {JSON.stringify(userInfo)} */}
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
                        {...register("firstname")}
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
                        {...register("lastname")}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        required
                        {...register("password")}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Gender<span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="plan"
                        control={control}
                        render={({ onChange, value, ref }) => (
                          <Select
                            options={genderOptions}
                            placeholder="Select"
                            value={genderOptions.find((c) => c.value === value)}
                            onChange={(val) => setValue("gender", val.value)}
                            required
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
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
                          required
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
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
                        {...register("mobile")}
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
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Social Link</label>
                      <input
                        className="form-control"
                        type="text"
                        {...register("social_link")}
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
                    disabled={loading}
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

export default TrainerAddPopup;
