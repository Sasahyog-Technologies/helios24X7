import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import { Refresh } from "../../../utils/refresh";
import Loading from "../../Loading";

const userDefaultValues = {
  password: "",
};

const ClientEditPasswordPopup = ({ userId }) => {
  const [bodyDetailId, setBodyDetailId] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, control, setValue } = useForm({
    defaultValues: userDefaultValues,
  });
  const {
    data: userData,
    isLoading: userIsLoading,
    refetch,
  } = useQuery({
    queryKey: ["client-data"],
    queryFn: async () => {
      setUserLoading(true);
      if (userId) {
        const data = await request.findOne("users", userId, {
          populate: ["branch", "body_detail"],
        });
        reset({
          password: data.password,
        });
        setBodyDetailId(data?.body_detail?.id || null);
        setUserLoading(false);
        return data;
      }
      reset(userDefaultValues);
      return null;
    },
  });

  const onSubmit = async (data) => {
    console.log("id", bodyDetailId);
    try {
      setSubmitLoading(true);
      await request.update("users", userId, {
        password: data.password,
      });
      toast.success("client password updated");
      document.getElementById("client-password-edit-force-close").click();
      queryClient.invalidateQueries({ queryKey: ["client-list"] });
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [userId, refetch, reset]);

  return (
    <>
      <div
        id="edit_client_password"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Client</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="client-password-edit-force-close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="modal-body">
              {userIsLoading ? (
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
                            Password <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            {...register("password", {
                              required: "This input is required.",
                            })}
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

export default ClientEditPasswordPopup;
