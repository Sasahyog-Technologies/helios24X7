import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import Loading from "../../Loading";
import { Refresh } from "../../../utils/refresh";
import DatePicker from "react-datepicker";

import Select from "react-select";

const userDefaultValues = {
  title: "",
  subtitle: "",
  description: "",
  slug: "",
  price: "",
  discountPrice: "",
  quantity: "",
  label: "",
};

const ProductEditPopup = ({ productId, refetch }) => {
  const [userLoading, setUserLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [file, setFile] = useState();
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  const { register, handleSubmit, reset, control, setValue } = useForm({
    defaultValues: userDefaultValues,
  });
  const { data: ProductData } = useQuery({
    queryKey: ["product-data", productId],
    queryFn: async () => {
      if (productId) {
        setUserLoading(true);
        const res = await request.findOne("product", productId);
        reset({
          title: res?.data?.attributes?.title,
          subtitle: res?.data?.attributes?.subtitle,
          description: res?.data?.attributes?.description,
          slug: res?.data?.attributes?.slug,
          price: res?.data?.attributes?.price,
          discountPrice: res?.data?.attributes?.discountPrice,
          quantity: res?.data?.attributes?.quantity,
          label: res?.data?.attributes?.label,
        });

        setUserLoading(false);
        return res.data;
      }
      reset(userDefaultValues);
      return null;
    },
  });

  const onSubmit = async (dt) => {
    setSubmitLoading(true);
    try {
      await request.update("product", productId, {
        data: { ...dt },
      });
      // Update Image
      /*    const formData = new FormData();
      formData.append("files", file);
      formData.append("field", "media");
      formData.append("refId", productId);
      formData.append("ref", "api::Product.Product");
      await fetch(
        "https://helios24x7backend-production.up.railway.app/api/upload",
        {
          method: "POST",
          body: formData,
        }
      ); */
      toast.success("Product updated");
      document.getElementById("product-edit-force-close").click();
      refetch();
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "Something Went Wrong",
        { duration: 4000 }
      );
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <div id="edit_product" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Product</h5>
              <button
                id="product-edit-force-close"
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
                          <label className="col-form-label">Subtitle</label>
                          <textarea
                            className="form-control"
                            type="text"
                            {...register("subtitle")}
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Description</label>
                          <textarea
                            className="form-control"
                            type="text"
                            {...register("description")}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Description</label>
                          <textarea
                            className="form-control"
                            type="text"
                            {...register("description")}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Slug <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            {...register("slug", {
                              required: "This input is required.",
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Price <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            required
                            {...register("price", {
                              required: "This input is required.",
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Discount Price{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            required
                            {...register("discountPrice", {
                              required: "This input is required.",
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Quantity <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            required
                            {...register("quantity", {
                              required: "This input is required.",
                            })}
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={handleImageChange}
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

export default ProductEditPopup;
