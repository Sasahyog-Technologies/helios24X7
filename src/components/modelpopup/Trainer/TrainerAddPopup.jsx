import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import request from "../../../sdk/functions";
import { Refresh } from "../../../utils/refresh";

const formDataDefaultValues = {
  firstname: "",
  lastname: "",
  mobile: "",
  password: "",
  email: `random${Math.floor(
    Math.random() * 1000 * Math.random() * 10
  )}@gmail.com`, // please use uuid for unique email
  branch: "",
};

const TrainerAddPopup = () => {
  const [startDate, setStartDate] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [branchOptions, setBranchOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
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
      });
      //console.log(createRes);
      toast.success("trainer created");
      Refresh()
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
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        required
                        {...register("password", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
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
                          required={true}
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
