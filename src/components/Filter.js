import React from "react";
import "./index.css";

function Filter({ dispatch }) {
  return (
    <div className="Filter">
      <div className="Filter-Option">
        <label>Pin code:</label>
        <input
          type="text"
          name="pincode"
          onChange={(e) =>
            dispatch({ type: "FILTERPIN", value: e.target.value })
          }
        />
      </div>

      <div className="Filter-Option">
        <label>Date:</label>
        <input
          type="date"
          name="date"
          onChange={(e) =>
            dispatch({ type: "FILTERDATE", value: e.target.value })
          }
        />
      </div>
    </div>
  );
}

export default Filter;
