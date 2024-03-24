// react-hot-toast;;

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
// import { getBranches } from "../../../strapi/functions/braches";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import { useForm, Controller } from "react-hook-form";

const formDataDefaultValues = {
  firstname: "",
  lastname: "",
  mobile: "",
  password: "",
  email: `random${Math.floor(
    Math.random() * 1000 * Math.random() * 10
  )}@gmail.com`, // please use uuid for unique email
  branch: "",
  plan: "",
  paid: "",
  outstanding: "",
};

const ClientAddPopup = () => {
  const employee = [
    { value: 1, label: "Select Department" },
    { value: 2, label: "Web Development" },
    { value: 3, label: "IT Management" },
    { value: 4, label: "Marketing" },
  ];
  const designation = [
    { value: 1, label: "Web Developer" },
    { value: 2, label: "Web Designer" },
    { value: 3, label: "Ios Developer" },
    { value: 4, label: "Marketing" },
  ];
  const companies = [
    { value: 1, label: "Global Technologies" },
    { value: 1, label: "Delta Infotech" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#ff9b44",
      },
    }),
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [branchOptions, setBranchOptions] = useState([]);
  const [planOptions, setPlanOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: formDataDefaultValues,
  });

  /* 
  const { data: branches, isFetched: isBranchesFetched } = useQuery({
    queryKey: ["arr"],
    queryFn: () => request.findMany("branch"),
  });
  const { data: plans, isFetched: isPlansFetched } = useQuery({
    queryKey: ["arr"],
    queryFn: () => request.findMany("plan"),
  });

  const planOptions = isPlansFetched
    ? plans?.data?.map((plan) => ({
        value: plan.id,
        label: plan.attributes.title,
      }))
    : [];

  const branchOptions = isBranchesFetched
    ? branches?.data?.map((branch) => ({
        value: branch.id,
        label: branch.attributes.name,
      }))
    : []; 
  */

  const onSubmit = async (data) => {
    // e.preventDefault();
    try {
      setLoading(true);
      let createRes = await request.create("register", {
        username: data.mobile,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        mobile: data.mobile,
        email: data.email,
        branch: data.branch,
      });

      const subRes = await request.create("subscription", {
        data: {
          user: createRes.user.id,
          plan: data.plan,
          paid: data.paid,
          outstanding: data.outstanding,
          start: startDate,
          end: endDate,
          payment_type: "cash",
          //   start_date: startDate,
        },
      });
      toast.success("client created");
    } catch (error) {
      toast.error(error.response.data.error.message,{duration:5000});
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
      let plans = await request.findMany("plan");
      let plansArr = plans?.data?.map((plan) => ({
        value: plan.id,
        label: plan.attributes.title,
      }));
      setPlanOptions(plansArr);
    };
    fetchBranchPlans();
  }, []);
  //console.log(branchOptions, planOptions);
  const handleDateChange1 = (date) => {
    setStartDate(date);
  };
  return (
    <>
      <div id="add_employee" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Client</h5>
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
                        {...register("firstname", { required: true })}
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
                        End Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          className="form-control floating datetimepicker"
                          type="date"
                          dateFormat="dd-MM-yyyy"
                          required={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Phone <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        {...register("mobile", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Plan</label>
                      <Controller
                        name="plan"
                        control={control}
                        render={({ onChange, value, ref }) => (
                          <Select
                            options={planOptions}
                            placeholder="Select"
                            value={planOptions.find((c) => c.value === value)}
                            onChange={(val) => setValue("plan", val.value)}
                          />
                        )}
                        rules={{ required: true }}
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
                          />
                        )}
                        rules={{ required: true }}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Paid </label>
                      <input
                        className="form-control"
                        type="text"
                        {...register("paid", { required: true })}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Outstanding </label>
                      <input
                        className="form-control"
                        type="text"
                        {...register("outstanding", { required: true })}
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

      {/* ------------------------Edit------------------------------- */}

      <div id="edit_employee" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Employee</h5>
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
              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        defaultValue="John"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Last Name</label>
                      <input
                        className="form-control"
                        defaultValue="Doe"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        defaultValue="johndoe"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        defaultValue="johndoe@example.com"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Password</label>
                      <input
                        className="form-control"
                        defaultValue="johndoe"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Confirm Password</label>
                      <input
                        className="form-control"
                        defaultValue="johndoe"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Employee ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        defaultValue="FT-0001"
                        readOnly=""
                        className="form-control floating"
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
                          onChange={handleDateChange1}
                          className="form-control floating datetimepicker"
                          type="date"
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Phone </label>
                      <input
                        className="form-control"
                        defaultValue={9876543210}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Company</label>
                      <Select
                        options={companies}
                        placeholder="Select"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Department <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={employee}
                        placeholder="Select"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Designation <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={designation}
                        placeholder="Select"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                </div>
                <div className="table-responsive m-t-15">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>Module Permission</th>
                        <th className="text-center">Read</th>
                        <th className="text-center">Write</th>
                        <th className="text-center">Create</th>
                        <th className="text-center">Delete</th>
                        <th className="text-center">Import</th>
                        <th className="text-center">Export</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Holidays</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Leaves</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Clients</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Projects</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Tasks</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Chats</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Assets</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Timing Sheets</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    //  data-bs-dismiss="modal"
                    // aria-label="Close"
                    //  type="reset"
                  >
                    Save
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

export default ClientAddPopup;

/*


  {/* <div className="table-responsive m-t-15">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>Module Permission</th>
                        <th className="text-center">Read</th>
                        <th className="text-center">Write</th>
                        <th className="text-center">Create</th>
                        <th className="text-center">Delete</th>
                        <th className="text-center">Import</th>
                        <th className="text-center">Export</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Holidays</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Leaves</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Clients</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Projects</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Tasks</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Chats</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Assets</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Timing Sheets</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */
