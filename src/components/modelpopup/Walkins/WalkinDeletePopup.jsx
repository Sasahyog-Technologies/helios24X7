import toast from "react-hot-toast";
import React, { useState } from "react";
import request from "../../../sdk/functions";
import { Refresh } from "../../../utils/refresh";
const WalkinsDeletePopup = ({ WalkinId, refetch }) => {
  const [loading, setLoading] = useState(false);
  const removeHandler = async () => {
    try {
      setLoading(true);
      await request.remove("walkin", WalkinId);
      toast.success("Walkin deleted");
      document.getElementById("walkin-delete-force-close").click();
      refetch();
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div id="delete_walkin" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title">Delete Walkin</h5>
              <p>You really want to delete this Walkin</p>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="walkin-delete-force-close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body pt-3">
            <div className="d-flex flex-md-row flex-column justify-content-start gap-md-5 gap-2">
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

export default WalkinsDeletePopup;
