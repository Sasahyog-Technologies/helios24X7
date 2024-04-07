import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

const ClientAvatar = ({ userId, profile }) => {
  const profile_picture_url = profile?.url;
  return (
    <>
      <Link to={"#"} data-bs-toggle="modal" data-bs-target="#edit-avatar">
        <div className="profile-img-wrap">
          <div className="profile-img text-uppercase bg-info rounded-circle d-flex justify-content-center align-items-center display-3">
            <img src={profile_picture_url} alt="" />
          </div>
        </div>
      </Link>

      <Modal userId={userId} />
    </>
  );
};

export default ClientAvatar;

const Modal = ({ userId }) => {
  const cropRef = useRef(null);
  const [file, setFile] = useState(null);
  const [slideValue, setSlideValue] = useState(10);

  const handleSave = async () => {
    if (cropRef) {
      try {
        // Crop File
        const dataUrl = cropRef.current.getImage().toDataURL();
        const result = await fetch(dataUrl);
        const blob = await result.blob();
        const fileName = "cropped-image.jpg";
        const mimeType = blob.type;
        const file = new File([blob], fileName, { type: mimeType });
        // Update Profile

        const formData = new FormData();
        formData.append("files", file);
        formData.append("field", "profile");
        formData.append("refId", userId);
        formData.append("ref", "plugin::users-permissions.user");

        toast.promise(
          fetch(
            "https://helios24x7backend-production.up.railway.app/api/upload",
            {
              method: "POST",
              body: formData,
            }
          ),
          {
            error: "error",
            loading: "profile is updating..",
            success: "profile is updated",
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <div
      tabIndex={-1}
      role="dialog"
      id="edit-avatar"
      className="modal fade"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="standard-modalLabel">
              Change Profile
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            {!file ? (
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={onChangeHandler}
              />
            ) : (
              <>
                <AvatarEditor
                  border={50}
                  rotate={0}
                  image={file}
                  ref={cropRef}
                  borderRadius={150}
                  scale={slideValue / 10}
                  color={[0, 0, 0, 0.72]}
                  style={{ width: "100%", height: "100%" }}
                />

                <input
                  min={10}
                  max={100}
                  type="range"
                  value={slideValue}
                  className="cursor-pointer"
                  onChange={(e) => setSlideValue(e.target.value)}
                />
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
  );
};
