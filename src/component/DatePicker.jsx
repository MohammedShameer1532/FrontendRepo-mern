import React from "react";

const DatePicker = ({ dob, onDateChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="dob">Date of Birth</label>
      <input
        type="date"
        className="form-control"
        id="dob"
        name="dob"
        value={dob}
        onChange={(e) => onDateChange(e.target.value)}
      />
    </div>
  );
};

export default DatePicker;
