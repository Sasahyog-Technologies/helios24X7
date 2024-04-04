import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import Loading from "../../Loading";
import { Refresh } from "../../../utils/refresh";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { payementStatusOptions } from "../../../utils";

const InvoiceDefaultValues = {
  username: "",
  subscription_type: "",
  label: "",
  amount: "",
  status: "",
  outstanding: "",
};

const InvoiceEditPopup = ({ invoiceId }) => {
  const [InvoiceLoading, setInvoiceLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [InvoiceDate, setInvoiceDate] = useState(null);
  const { register, handleSubmit, reset, control, setValue } = useForm({
    defaultValues: InvoiceDefaultValues,
  });
  const { data: InvoiceData, refetch } = useQuery({
    queryKey: ["Invoice-data"],
    queryFn: async () => {
      setInvoiceLoading(true);
      if (invoiceId) {
        const res = await request.findOne("invoice", invoiceId, {
          populate: ["user", "subscription"],
        });
        reset({
          amount: res.data.attributes.amount,
          status: res.data.attributes.status,
          outstanding: res.data.attributes.outstanding,
          label: res.data.attributes.label,
          username: `${res.data.attributes.user.data.attributes.firstname} ${res.data.attributes.user.data.attributes.lastname}`,
          subscription_type: `${res.data.attributes?.subscription?.data?.attributes?.type
            ?.split("-")
            .join(" ")}`,
        });
        setInvoiceDate(res.data.attributes.invoice_date);
        setInvoiceLoading(false);
        return res.data;
      }
      reset(InvoiceDefaultValues);
      return null;
    },
  });
  console.log(InvoiceData);

  const onSubmit = async (dt) => {
    setSubmitLoading(true);
    const { outstanding, status } = dt;
    try {
      await request.update("invoice", invoiceId, {
        data: { outstanding, status },
      });
      toast.success("Invoice updated");
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
  }, [invoiceId, refetch, reset]);

  return (
    <>
      <div id="edit_invoice" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Invoice</h5>
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
              {InvoiceLoading ? (
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
                            Username <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            disabled
                            {...register("username", {
                              required: "This input is required.",
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Label <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            disabled
                            {...register("label", {
                              required: "This input is required.",
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Subscription Type
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            disabled
                            {...register("subscription_type", {
                              required: "This input is required.",
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Invoice Date <span className="text-danger">*</span>
                          </label>
                          <div className="cal-icon">
                            <DatePicker
                              selected={InvoiceDate}
                              //     onChange={(date) => setBirthDate(date)}
                              className="form-control floating datetimepicker"
                              type="date"
                              required={true}
                              disabled
                              dateFormat="dd-MM-yyyy"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            disabled
                            {...register("amount", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Outstanding</label>
                          <input
                            className="form-control"
                            type="text"
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

export default InvoiceEditPopup;
