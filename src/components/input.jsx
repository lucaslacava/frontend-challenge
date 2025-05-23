import React from "react";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  disabled = false,
  required = false,
  name,
  id,
  label,
  ...props
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        disabled={disabled}
        required={required}
        name={name}
        id={id}
        {...props}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default Input;
