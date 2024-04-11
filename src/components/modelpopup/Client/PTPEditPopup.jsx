import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import request from "../../../sdk/functions";
import { Refresh } from "../../../utils/refresh";
import Select from "react-select";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { calculateEndDate } from "../../../utils/calculateEndDate";
import { durationOptions } from "../../../utils/index";
import { InvoiceNumberGenerator } from "../../../utils/invoiceNumberGenerate";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";

const formDataDefaultValues = {
  trainer: "",
};

const PtpEditPopup = ({ ptpId, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [trainerOptions, setTrainerOptions] = useState([]);
  const [sessionFrom, setSessionFrom] = useState("00:00:00");
  const [sessionTo, setSessionTo] = useState("00:00:00");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: formDataDefaultValues,
  });

  const {
    data: ptpData,
    isLoading: ptpIsLoading,

    isRefetching,
  } = useQuery({
    queryKey: ["ptp-data", ptpId],
    queryFn: async () => {
      if (ptpId) {
        const data = await request.findOne("ptp", ptpId, {
          populate: ["trainer"],
        });
        reset({
          trainer: data?.data?.attributes?.trainer?.data?.id,
        });
        //   console.log(data.data);
        setSessionFrom(data?.data?.attributes?.session_from);
        setSessionTo(data?.data?.attributes?.session_to);
        return data?.data?.attributes;
      }
      reset(formDataDefaultValues);
      return null;
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await request.update("ptp", ptpId, {
        data: {
          trainer: data.trainer,
          session_from: sessionFrom,
          session_to: sessionTo,
        },
      });
      toast.success("PTP Updated");
      document.getElementById("ptp-edit-force-close").click();
      refetch();
    } catch (error) {
      // toast.error(error.response.data.error.message, { duration: 4000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useQuery({
    queryKey: ["fetch-trainer"],
    queryFn: async () => {
      const trainer = await request.findMany("users", {
        filters: {
          type: "trainer",
        },
      });
      let trainerArr = trainer?.map((t) => ({
        value: t.id,
        label: `${t.firstname} ${t.lastname}`,
      }));
      setTrainerOptions(trainerArr);
      return trainerArr;
    },
  });

  return (
    <>
      <div id="edit_ptp" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-paid">Edit PTP</h5>

              <button
                id="ptp-edit-force-close"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* {JSON.stringify(userInfo)} */}
              {ptpIsLoading || isRefetching ? (
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
                            Session From <span className="text-danger">*</span>
                          </label>
                          <div className="">
                            <input
                              aria-label="time"
                              type="time"
                              value={sessionFrom}
                              onChange={(e) =>
                                setSessionFrom(`${e.target.value}:00`)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Session To <span className="text-danger">*</span>
                          </label>
                          <div className="">
                            <input
                              aria-label="time"
                              type="time"
                              value={sessionTo}
                              onChange={(e) =>
                                setSessionTo(`${e.target.value}:00`)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Trainer<span className="text-danger">*</span>
                          </label>
                          <Controller
                            name="trainer"
                            control={control}
                            render={({ onChange, value, ref }) => (
                              <Select
                                options={trainerOptions}
                                placeholder={`${ptpData?.trainer?.data?.attributes?.firstname} ${ptpData?.trainer?.data?.attributes?.lastname}`}
                                value={trainerOptions.find(
                                  (c) => c.value === value
                                )}
                                onChange={(val) =>
                                  setValue("trainer", val.value)
                                }
                              />
                            )}
                            rules={{ required: true }}
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
                        disabled={loading}
                      >
                        {loading ? " Submit...." : " Submit"}
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

export default PtpEditPopup;
