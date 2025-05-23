import { useEffect, useState, useCallback } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PageWrapper } from "../components/PageWrapper";
import { Title } from "../components/Title";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/Spinner";
import { useForm } from "../context/FormContext";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../lib/utils";
import { COLORS_API } from "../api";

export const MoreInfo = () => {
  const navigate = useNavigate();
  const { formData, setFormData, colorOptions, setColorOptions } = useForm();

  const [isLoading, setIsLoading] = useState(colorOptions.length === 0);

  const [selectedColor, setSelectedColor] = useState(formData.color || "");
  const [acceptedTerms, setAcceptedTerms] = useState(formData.terms || false);

  useEffect(() => {
    if (colorOptions.length > 0) {
      setIsLoading(false);
      return;
    }

    const fetchColorOptions = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(COLORS_API);
        const data = await response.json();
        const sanitizedOptions = data.map((item) => ({
          value: item,
          label: capitalizeFirstLetter(item),
        }));

        setColorOptions(sanitizedOptions);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchColorOptions();
  }, [colorOptions, setColorOptions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      color: selectedColor,
      terms: acceptedTerms,
    }));
    navigate("/confirmation");
  };

  const handleTermsChange = useCallback(
    (checked) => setAcceptedTerms(!!checked),
    []
  );

  const isNextDisabled = !selectedColor || !acceptedTerms || isLoading;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <PageWrapper
        onNext={handleSubmit}
        onBack={() => navigate("/")}
        isNextDisabled={isNextDisabled}
      >
        <Title>Additional Info</Title>
        <div className="w-full mb-4">
          <Select
            value={selectedColor}
            onValueChange={setSelectedColor}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              {isLoading ? (
                <Spinner />
              ) : (
                <SelectValue placeholder="Select your favorite color" />
              )}
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 w-full justify-start">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={handleTermsChange}
          />
          <label htmlFor="terms" className="text-sm font-medium">
            I agree to{" "}
            <a
              href="#"
              onClick={(e) => e.stopPropagation()}
              className="underline text-blue-600 hover:text-blue-800"
            >
              terms and conditions.
            </a>
          </label>
        </div>
      </PageWrapper>
    </form>
  );
};
