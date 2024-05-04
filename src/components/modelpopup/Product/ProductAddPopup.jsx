import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";

const formDataDefaultValues = {
  title: "",
  subtitle: "",
  description: "",
  slug: "",
  price: "",
  discountPrice: "",
  quantity: "",
  label: "",
};

const ProductsAddPopup = ({ refetch }) => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  const { register, handleSubmit, setValue, control, reset } = useForm({
    defaultValues: formDataDefaultValues,
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Create product
      const product = await request.create("product", {
        data: {
          title: data?.title,
          description: data?.description,
          subtitle: data?.subtitle,
          slug: data?.slug,
          price: Number(data?.price),
          discountPrice: Number(data?.discountPrice),
          quantity: Number(data?.quantity),
          label: data?.label,
        },
      });

      // Update Image
      const productId = product?.data?.id;
      /*   const formData = new FormData();
      formData.append("files", file);
      formData.append("field", "thumbnail");
      formData.append("refId", productId);
      formData.append("ref", "api::product.product");
      await fetch(
      "https://helios24x7backend-production.up.railway.app/api"; "https://helios24x7backend-production.up.railway.app/api/upload",
        //"http://localhost:1337/api/upload",
        {
          method: "POST",
          body: formData,
        }
      ); */
      toast.success("product added");
      reset({
        title: "",
        description: "",
        subtitle: "",
        slug: "",
        price: "",
        discountPrice: "",
        quantity: "",
        label: "",
      });
      document.getElementById("product-add-force-close").click();
      refetch();
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="add_product" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Product</h5>
              <button
                id="product-add-force-close"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-sm-12">
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
                  <div className="col-sm-12">
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
                        Subtitle <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        {...register("subtitle", {
                          required: "This input is required.",
                        })}
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
                        Discount Price <span className="text-danger">*</span>
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
                      <label className="col-form-label">Image</label>{" "}
                      <span className="text-danger">*</span>
                      <input
                        required
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
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary submit-btn"
                  >
                    {loading ? " Submit...." : " Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsAddPopup;
