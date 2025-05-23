import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { PersonalInfo } from "./steps/PersonalInfo";
import { MoreInfo } from "./steps/MoreInfo";
import { Confirmation } from "./steps/Confirmation";
import { SuccessPage } from "./steps/SuccessPage";
import { ErrorPage } from "./steps/ErrorPage";
import "./index.css";
import { FormProvider } from "./context/FormContext";

const App = () => {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PersonalInfo />} />
          <Route path="/more-info" element={<MoreInfo />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
};

export default App;
