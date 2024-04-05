import React, { useState } from "react";

const PaymentListFilter = ({ query, setQuery, refetch }) => {
  const [focused, setFocused] = useState(false);

  const handleLabelClick1 = () => {
    setFocused(true);
  };

  const handleInputBlur1 = () => {
    if (query.name === "") {
      setFocused(false);
    }
  };

  const handleSearch = () => {
    refetch();
  };

  return (
    <div>
      <div className="row filter-row">
        <div className="col-sm-6 col-md-3">
          <div
            className={
              focused || query.name !== ""
                ? "input-block form-focus focused"
                : "input-block form-focus"
            }
          >
            <input
              type="text"
              className="form-control floating"
              value={query.name}
              onFocus={handleLabelClick1}
              onBlur={handleInputBlur1}
              onChange={(e) => setQuery({ ...query, name: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <label className="focus-label" onClick={handleLabelClick1}>
              Client Name
            </label>
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

export default PaymentListFilter;
