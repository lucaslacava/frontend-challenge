import React from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export const ProtectedRoute = ({ children, step }) => {
  const { formData } = useForm();

  const getRedirectPath = () => {
    switch (step) {
      case "personalInfo":
        return null;
      case "moreInfo":
        if (!formData.name || !formData.email) return "/";
        return null;
      case "confirmation":
      case "success":
      case "error":
        if (!formData.name || !formData.email) return "/";
        return null;

      default:
        return "/";
    }
  };

  const redirectPath = getRedirectPath();

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
