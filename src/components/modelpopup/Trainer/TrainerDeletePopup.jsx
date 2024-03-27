import React, { useState } from "react";
import request from "../../../sdk/functions";
import toast from "react-hot-toast";
import { Refresh } from "../../../utils/refresh";
const TrianerDeletePopup = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const removeHandler = async () => {
    try {
      setLoading(true);
      const data = await request.remove("users", userId);
      //  console.log(data);
      toast.success("Trainer deleted");
      Refresh();
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div id="delete_trainer" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title">Delete Trainer</h5>
              <p>You really want to delete this trainer</p>
            </div>
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
            <div className="d-flex justify-content-start gap-5">
              <button
                className="btn btn-primary submit-btn"
                // data-bs-dismiss="modal"
                // aria-label="Close"
                type="button"
                disabled={loading}
                onClick={removeHandler}
              >
                {loading ? "Delete...." : " Delete"}
              </button>
              <button
                className="btn btn-light submit-btn text-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
                type="button"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrianerDeletePopup;
