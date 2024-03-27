import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import Loading from "../../Loading";
import { Refresh } from "../../../utils/refresh";
const userDefaultValues = {
  title: "",
  price: "",
  duration: "",
  desc: "",
};

const PlanEditPopup = ({ planId }) => {
  const [userLoading, setUserLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: userDefaultValues,
  });
  const { isLoading: userIsLoading, refetch } = useQuery({
    queryKey: ["client-data"],
    queryFn: async () => {
      setUserLoading(true);
      if (planId) {
        const res = await request.findOne("plan", planId);
        reset({
          title: res.data.attributes.title,
          price: res.data.attributes.price,
          duration: res.data.attributes.duration,
          desc: res.data.attributes.desc,
        });
        setUserLoading(false);
        return res;
      }
      reset(userDefaultValues);
      return null;
    },
  });

  const onSubmit = async (dt) => {
    setSubmitLoading(true);
    try {
      await request.update("plan", planId, {
        data: { ...dt },
      });
      toast.success("plan updated");
      Refresh()
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [planId, refetch, reset]);

  return (
    <>
      <div id="edit_plan" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Plan</h5>
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
                            Title <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            {...register("title", {
                              required: "This input is required.",
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Price <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            {...register("price", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Duration <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            {...register("duration", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Description</label>
                          <textarea
                            className="form-control"
                            type="text"
                            {...register("desc")}
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

export default PlanEditPopup;
