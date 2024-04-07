import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import Loading from "../../Loading";
import { Refresh } from "../../../utils/refresh";
const WalkinDefaultValues = {
  firstname: "",
  lastname: "",
  mobile: "",
  reffered_by: "",
};

const WalkinEditPopup = ({ WalkinId }) => {
  const [WalkinLoading, setWalkinLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: WalkinDefaultValues,
  });
  const { isLoading: userIsLoading, refetch } = useQuery({
    queryKey: ["Walkin-data"],
    queryFn: async () => {
      setWalkinLoading(true);
      if (WalkinId) {
        const res = await request.findOne("walkin", WalkinId);
        reset({
          firstname: res.data.attributes.firstname,
          lastname: res.data.attributes.lastname,
          mobile: res.data.attributes.mobile,
          reffered_by: res.data.attributes.reffered_by,
        });
        setWalkinLoading(false);
        return res;
      }
      reset(WalkinDefaultValues);
      return null;
    },
  });

  const onSubmit = async (dt) => {
    setSubmitLoading(true);
    try {
      await request.update("walkin", WalkinId, {
        data: { ...dt },
      });
      toast.success("Walkin updated");
      Refresh()
    } catch (error) {
      toast.error(error.response.data.error.message, { mobile: 4000 });
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [WalkinId, refetch, reset]);

  return (
    <>
      <div id="edit_walkin" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-firstname">Edit Walkin</h5>
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
              {WalkinLoading ? (
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
                            firstname <span className="text-danger">*</span>
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
                            lastname <span className="text-danger">*</span>
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
                            mobile <span className="text-danger">*</span>
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
                          <label className="col-form-label">reffered_by</label>
                          <input
                            className="form-control"
                            type="text"
                            {...register("reffered_by")}
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

export default WalkinEditPopup;
