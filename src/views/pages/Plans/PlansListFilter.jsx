import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import request from "../../../sdk/functions";

const PlansListFilter = ({ query, setQuery, refetch }) => {
  const [focused, setFocused] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#ff9b44",
      },
    }),
  };
  const handleLabelClick1 = () => {
    setFocused(true);
  };

  const handleInputBlur1 = () => {
    if (query.search === "") {
      setFocused(false);
    }
  };

  const handleSearch = () => {
    refetch();
  };

  useQuery({
    queryKey: ["find-branch"],
    queryFn: async () => {
      let branches = await request.findMany("branch");
      let branchesArr = branches?.data?.map((branch) => ({
        value: branch.attributes.name,
        label: branch.attributes.name,
      }));
      branchesArr.push({
        value: "",
        label: "None",
      });
      setBranchOptions(branchesArr);
    },
  });

  return (
    <div>
      <div className="row filter-row">
        <div className="col-sm-6 col-md-3">
          <div
            className={
              focused || query.search !== ""
                ? "input-block form-focus focused"
                : "input-block form-focus"
            }
          >
            <input
              type="text"
              className="form-control floating"
              value={query.search}
              onFocus={handleLabelClick1}
              onBlur={handleInputBlur1}
              onChange={(e) => setQuery({ ...query, search: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <label className="focus-label" onClick={handleLabelClick1}>
              Plans Title,Price or Duration
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div className="input-block form-focus select-focus">
            <Select
              options={branchOptions}
              placeholder="Select Branch"
              styles={customStyles}
              onChange={(val) => setQuery({ ...query, branch: val.value })}
            />
            <label className="focus-label">Branch</label>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <button
            type="button"
            onClick={handleSearch}
            className="btn btn-success btn-block w-100"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlansListFilter;
