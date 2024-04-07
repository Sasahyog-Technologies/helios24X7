import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import request from "../../../sdk/functions";
import { Refresh } from "../../../utils/refresh";
import React, { useState } from "react";
import { InvoiceNumberGenerator } from "../../../utils/invoiceNumberGenerate";

const formDataDefaultValues = {
  paid: "",
  outstanding: "",
};

const PayOutstanding = ({ subscription }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: formDataDefaultValues,
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await request.update("subscription", subscription?.id, {
        data: {
          paid: parseInt(subscription.paid) + parseInt(data.paid),
          outstanding: data?.outstanding,
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
      toast.success("Subscription created");
      Refresh();
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
                      <input
                        className="form-control"
                        type="text"
                        required
                        {...register("paid", {
                          required: "This input is required.",
                        })}
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
                        type="text"
                        required
                        {...register("outstanding")}
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