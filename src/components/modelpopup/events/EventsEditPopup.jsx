import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import Loading from "../../Loading";
import { Refresh } from "../../../utils/refresh";
const userDefaultValues = {
  title: "",
  desc: "",
};

const EventEditPopup = ({ eventId }) => {
  const [userLoading, setUserLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: userDefaultValues,
  });
  const { isLoading: userIsLoading, refetch } = useQuery({
    queryKey: ["event-data"],
    queryFn: async () => {
      setUserLoading(true);
      if (eventId) {
        const res = await request.findOne("event", eventId);
        reset({
          title: res.data.attributes.title,
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
      await request.update("event", eventId, {
        data: { ...dt },
      });
      toast.success("Event updated");
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
  }, [eventId, refetch, reset]);

  return (
    <>
      <div id="edit_event" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Event</h5>
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

export default EventEditPopup;
