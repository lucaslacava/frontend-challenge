import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { PersonalInfo } from "./steps/PersonalInfo";
import { MoreInfo } from "./steps/MoreInfo";
import { Confirmation } from "./steps/Confirmation";
import { SuccessPage } from "./steps/SuccessPage";
import { ErrorPage } from "./steps/ErrorPage";
import { FormProvider } from "./context/FormContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute step="personalInfo">
                <PersonalInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/more-info"
            element={
              <ProtectedRoute step="moreInfo">
                <MoreInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirmation"
            element={
              <ProtectedRoute step="confirmation">
                <Confirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute step="success">
                <SuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/error"
            element={
              <ProtectedRoute step="error">
                <ErrorPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
};

export default App;
