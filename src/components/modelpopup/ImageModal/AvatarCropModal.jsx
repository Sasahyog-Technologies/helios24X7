import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
const CropperModal = ({ src, setPreview, setCropModalOpen }) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);

  //handle save
  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      setPreview(URL.createObjectURL(blob));
      setCropModalOpen(false);
    }
  };

  return (
    <div className="">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Avatar Crop</h5>
            <button
              type="button"
              onClick={() => setCropModalOpen(false)}
              className="btn"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <AvatarEditor
              ref={cropRef}
              image={src}
              style={{ width: "100%", height: "100%" }}
              border={50}
              borderRadius={150}
              color={[0, 0, 0, 0.72]}
              scale={slideValue / 10}
              rotate={0}
            />
            <input
              type="range"
              min={10}
              max={100}
              onChange={(e) => setSlideValue(e.target.value)}
              value={slideValue}
              className="cursor-pointer"
            />
            <button type="button" onClick={handleSave} className="btn">
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setCropModalOpen(false);
                setPreview(null);
              }}
              className="btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropperModal;
