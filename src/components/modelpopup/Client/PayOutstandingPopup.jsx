import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import request from "../../../sdk/functions";
import { Refresh } from "../../../utils/refresh";
import React, { useEffect, useState } from "react";
import { InvoiceNumberGenerator } from "../../../utils/invoiceNumberGenerate";
import Select from "react-select";
import { paymentTypeOptions } from "../../../utils";

const formDataDefaultValues = {
  paid: "",
  outstanding: 0,
  paymentType: "",
  outstandingPrice: 0,
};

const PayOutstanding = ({ subscription, refetch }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: formDataDefaultValues,
  });

  const onSubmit = async (data) => {
    if (parseInt(data.paid) > parseInt(data.outstandingPrice)) {
      return toast.error("Amount is greater than plan price");
    }
    try {
      setLoading(true);
      await request.update("subscription", subscription?.id, {
        data: {
          paid: parseInt(subscription.paid) + parseInt(data.paid),
          outstanding: data?.outstanding,
          payment_type: data.paymentType,
        },
      });

      let paymentRes = await request.create("payment", {
        data: {
          status: "success",
          amount: data.paid,
          subscription: subscription?.id,
          user: subscription.user.data.id,
          outstanding: data.outstanding || null,
          payment_date: new Date().toISOString(),
          payment_type: data.paymentType,
        },
      });
      await request.create("invoice", {
        data: {
          amount: data.paid,
          payment: paymentRes.data.id,
          subscription: subscription?.id,
          user: subscription.user.data.id,
          invoice_number: InvoiceNumberGenerator(),
          invoice_date: new Date().toISOString(),
          outstanding: data.outstanding || null,
        },
      });
      toast.success("Outstanding Updated");
      document.getElementById("outstanding-edit-force-close").click();
      refetch();
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setValue("outstanding", subscription?.outstanding);
    setValue("outstandingPrice", subscription?.outstanding);
  }, [subscription]);
  return (
    <>
      <div
        id="pay_outstanding"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-paid">Pay Outstanding Balance</h5>
              <button
                id="outstanding-edit-force-close"
                type="button"
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
                                getValues("outstandingPrice") - e.target.value
                              );
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Outstanding <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        disabled
                        {...register("outstanding")}
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

export default PayOutstanding;
