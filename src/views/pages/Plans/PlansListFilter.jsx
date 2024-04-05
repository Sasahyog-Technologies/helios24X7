import React, { useState } from "react";

const PlansListFilter = ({ query, setQuery, refetch }) => {
  const [focused, setFocused] = useState(false);
  const [focused1, setFocused1] = useState(false);
  const [focused2, setFocused2] = useState(false);

  const handleLabelClick1 = () => {
    setFocused(true);
  };
  const handleLabelClick2 = () => {
    setFocused1(true);
  };
  const handleLabelClick3 = () => {
    setFocused2(true);
  };

  const handleInputBlur1 = () => {
    if (query.title === "") {
      setFocused(false);
    }
  };
  const handleInputBlur2 = () => {
    if (query.price === "") {
      setFocused1(false);
    }
  };
  const handleInputBlur3 = () => {
    if (query.duration === "") {
      setFocused2(false);
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
              focused || query.title !== ""
                ? "input-block form-focus focused"
                : "input-block form-focus"
            }
          >
            <input
              type="text"
              className="form-control floating"
              value={query.title}
              onFocus={handleLabelClick1}
              onBlur={handleInputBlur1}
              onChange={(e) => setQuery({ ...query, title: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <label className="focus-label" onClick={handleLabelClick1}>
              Plans Title
            </label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div
            className={
              focused1 || query.price !== ""
                ? "input-block form-focus focused"
                : "input-block form-focus"
            }
          >
            <input
              type="text"
              className="form-control floating"
              value={query.price}
              onFocus={handleLabelClick2}
              onBlur={handleInputBlur2}
              onChange={(e) => setQuery({ ...query, price: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <label className="focus-label" onClick={handleLabelClick2}>
              Plans Price
            </label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div
            className={
              focused2 || query.duration !== ""
                ? "input-block form-focus focused"
                : "input-block form-focus"
            }
          >
            <input
              type="text"
              className="form-control floating"
              value={query.duration}
              onFocus={handleLabelClick3}
              onBlur={handleInputBlur3}
              onChange={(e) => setQuery({ ...query, duration: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <label className="focus-label" onClick={handleLabelClick3}>
              Plans Duration
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

export default PlansListFilter;
