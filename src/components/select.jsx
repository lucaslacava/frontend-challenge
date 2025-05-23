import React from "react";

const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  name,
  id,
  isLoading,
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={disabled}
      name={name}
      id={id}
    >
      <option value="" disabled>
        {isLoading ? "Loading..." : placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
