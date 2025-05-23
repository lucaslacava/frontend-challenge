import React from "react";

const Button = ({
  children,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
