import React from "react";
import "../stylesheets/input.scss";
function Input({
  type,
  value,
  onChange,
  required,
  id,
  placeholder,
  className,
}) {
  return (
    <div className={`form-input-container ${className}`}>
      {/* <div className="input-container-box"> */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        id={id}
        placeholder={placeholder}
      />
      {/* </div> */}
    </div>
  );
}

export default Input;
