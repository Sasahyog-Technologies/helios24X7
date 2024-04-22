import Select from "react-select";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import request from "../../../sdk/functions";
import React, { useEffect, useState } from "react";
import { paymentTypeOptions } from "../../../utils";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { InvoiceNumberGenerator } from "../../../utils/invoiceNumberGenerate";
import { useQueryClient } from "@tanstack/react-query";

const SendWhatsappNotification = async ({ mobile, password }) => {
  await fetch("https://graph.facebook.com/v19.0/309147725609522/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer EAATd1LnPQs8BOZBeZAEDHUXY8CXxDi2sZCcZBEN4lhLlQx4QOa0B8OdQJsZB2vTyRJhDHAMZAZCmolqZC69IGAhAD9gXeyUfFEj7DkEPRpMQ5M1bHtx1vE4LwzwE8dQN6MoYZAnO5OI47oUQZCZBEAS7YJHvnSilg2fO7UaWpM2nFhRZBBhYfuhwjunMtDjH1CZACZAUbQ",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: `91${mobile}`,
      type: "template",
      template: {
        name: "membershipconfirmed",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: mobile,
              },
              {
                type: "text",
                text: password,
              },
            ],
          },
        ],
      },
    }),
  });
};

// Call the function to send the template message

function generatePassword(length = 8) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

const formDataDefaultValues = {
  firstname: "",
  lastname: "",
  mobile: "",
  password: generatePassword(),
  email: `random${Math.floor(
    Math.random() * 1000 * Math.random() * 10
  )}@gmail.com`, // please use uuid for unique email
  branch: "",
  paymentType: "",
  plan: "",
  gender: "",
  paid: "",
  weight: "",
  height: "",
  bmr: "",
  chest: "",
  hip: "",
  biceps: "",
  calf: "",
  weist: "",
  neck: "",
  planPrice: 0,
  outstanding: 0,
  discount: 0,
  planPriceAfterDiscount: 0,
};

function calculateEndDate(startDate, durationInMonths) {
  //console.log(startDate);
  if (typeof startDate === "string") {
    startDate = new Date(startDate);
  }
  const t = new Date(startDate);
  const p = new Date();
  p.setMonth(t.getMonth() + parseInt(durationInMonths));
  return p.toISOString();
}

const ClientAddPopup = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [planOptions, setPlanOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const queryClient = useQueryClient();

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: formDataDefaultValues,
  });

  const onSubmit = async (data) => {
    if (data.mobile.length > 10 || data.mobile.length < 10)
      return toast.error("Mobile must be at least 10");
    if (parseInt(data.paid) > parseInt(data.planPriceAfterDiscount))
      return toast.error("Amount is greater than plan price");
    try {
      setLoading(true);
      SendWhatsappNotification({
        mobile: data.mobile,
        password: data.password,
      });
      const planDuration = plans.find((pt) => pt.id === data.plan)?.attributes
        .duration;

      let createRes = await request.create("register", {
        type: "client",
        email: data.email,
        mobile: data.mobile,
        branch: data.branch,
        gender: data.gender,
        birthdate: birthDate,
        username: data.mobile,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
      });

      let subsRes = await request.create("subscription", {
        data: {
          plan: data.plan,
          start: startDate,
          paid: data.paid,
          user: createRes.user.id,
          type: "gym-subscription",
          outstanding: data.outstanding,
          payment_type: data.paymentType,
          end: calculateEndDate(startDate, planDuration),
          discount: data.discount,
        },
      });
      let paymentRes = await request.create("payment", {
        data: {
          status: "success",
          amount: data.paid,
          user: createRes.user.id,
          outstanding: data.outstanding,
          subscription: subsRes.data.id,
          payment_type: data.paymentType,
          payment_date: new Date().toISOString(),
          discount: data.discount,
        },
      });
      await request.create("invoice", {
        data: {
          amount: data.paid,
          user: createRes.user.id,
          payment: paymentRes.data.id,
          outstanding: data.outstanding,
          subscription: subsRes.data.id,
          invoice_number: InvoiceNumberGenerator(),
          invoice_date: new Date().toISOString(),
          discount: data.discount,
        },
      });
      toast.success("client created");
      document.getElementById("client-add-force-close").click();
      queryClient.invalidateQueries({ queryKey: ["client-list"] });
    } catch (error) {
      toast.error(error?.response?.data?.error?.message, { duration: 4000 });
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
      let plans = await request.findMany("plan");
      setPlans(plans.data);
      let plansArr = plans?.data?.map((plan) => ({
        value: plan.id,
        label: plan.attributes.title,
        price: plan.attributes.price,
      }));
      setPlanOptions(plansArr);
    };
    fetchBranchPlans();
  }, []);

  return (
    <>
      <div id="add_client" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Client</h5>
              <button
                type="button"
                id="client-add-force-close"
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
                        type="text"
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
                      <label className="col-form-label">Date of Birth</label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={birthDate}
                          onChange={(date) => setBirthDate(date)}
                          className="form-control floating datetimepicker"
                          type="date"
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
                        type="number"
                        required
                        {...register("mobile", { required: true })}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Payment Type<span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="plan"
                        control={control}
                        render={({ onChange, value, ref }) => (
                          <Select
                            options={paymentTypeOptions}
                            placeholder="Select"
                            value={paymentTypeOptions.find(
                              (c) => c.value === value
                            )}
                            onChange={(val) =>
                              setValue("paymentType", val.value)
                            }
                            required
                          />
                        )}
                        rules={{ required: true }}
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
                            required
                          />
                        )}
                        rules={{ required: true }}
                      />
                    </div>
                  </div>

                  {/* ------------------------------------- */}
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Plan<span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="plan"
                        control={control}
                        render={({ onChange, value, ref }) => (
                          <Select
                            options={planOptions}
                            placeholder="Select"
                            value={planOptions.find((c) => c.value === value)}
                            onChange={(val) => {
                              setValue("plan", val.value);
                              setValue("planPrice", parseInt(val.price));
                              setValue(
                                "planPriceAfterDiscount",
                                parseInt(val.price) - getValues("discount")
                              );
                              setValue(
                                "outstanding",
                                getValues("planPriceAfterDiscount") -
                                  getValues("paid")
                              );
                            }}
                            required
                          />
                        )}
                        rules={{ required: true }}
                      />
                    </div>
                  </div>
                  {/* --------------------- */}

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Paid <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="paid"
                        control={control}
                        render={({ onChange, value, ref }) => (
                          <input
                            className="form-control"
                            value={value}
                            type="number"
                            required
                            onChange={(e) => {
                              setValue("paid", e.target.value);
                              setValue(
                                "outstanding",
                                getValues("planPriceAfterDiscount") -
                                  e.target.value
                              );
                              /*      setValue(
                                "outstanding",
                                getValues("planPrice") - e.target.value
                              ); */
                            }}
                          />
                        )}
                        rules={{ required: true }}
                      />
                    </div>
                  </div>
                  {/* ------------discount ------------------ */}
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Discount <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="discount"
                        control={control}
                        render={({ onChange, value, ref }) => (
                          <input
                            className="form-control"
                            value={value}
                            type="number"
                            required
                            onChange={(e) => {
                              setValue("discount", e.target.value);
                              setValue(
                                "planPriceAfterDiscount",
                                getValues("planPrice") - getValues("discount")
                              );
                              setValue(
                                "outstanding",
                                getValues("planPriceAfterDiscount") -
                                  getValues("paid")
                              );
                              /*   setValue(
                                "outstanding",
                                getValues("planPrice") - e.target.value
                              ); */
                            }}
                          />
                        )}
                        rules={{ required: true }}
                      />
                    </div>
                  </div>
                  {/* ------------ price after discount ------------------ */}
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Plan Price After Discount{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        required
                        disabled
                        {...register("planPriceAfterDiscount")}
                      />
                    </div>
                  </div>

                  {/* ---------------- */}
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Plan Price <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        required
                        disabled
                        {...register("planPrice")}
                      />
                    </div>
                  </div>
                  {/* --------------- */}

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Outstanding</label>
                      <input
                        className="form-control"
                        type="number"
                        disabled
                        {...register("outstanding")}
                      />
                    </div>
                  </div>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="multipleErrorInput"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p key={type}> Error : {message}</p>
                    ))
                  }
                />
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    // aria-label="Close"
                    // data-bs-dismiss="modal"
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

export default ClientAddPopup;
