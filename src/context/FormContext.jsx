import { createContext, useContext, useState } from "react";

const FormContext = createContext();

const initialState = {
  name: "",
  email: "",
  color: "",
  terms: false,
};

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(initialState);
  const [colorOptions, setColorOptions] = useState([]);

  const resetForm = () => {
    setFormData(initialState);
    setColorOptions([]);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        resetForm,
        colorOptions,
        setColorOptions,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  return useContext(FormContext);
}
