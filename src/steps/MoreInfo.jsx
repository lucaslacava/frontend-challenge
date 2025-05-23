import { useEffect, useState } from "react";
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

const COLORS_API = "http://localhost:3001/api/colors";

export const MoreInfo = () => {
  const { formData, setFormData } = useForm();
  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState(
    formData.favoriteColor || ""
  );
  const [acceptedTerms, setAcceptedTerms] = useState(
    formData.acceptedTerms || false
  );
  const [colorOptions, setColorOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchColorOptions = async () => {
      try {
        const response = await fetch(COLORS_API);
        const data = await response.json();
        const sanitizedOptions = data.map((item) => ({
          value: item,
          label: capitalizeFirstLetter(item),
        }));

        setColorOptions(sanitizedOptions);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchColorOptions();
  }, []);

  const handleNextClick = () => {
    setFormData((prev) => ({
      ...prev,
      color: selectedValue,
      terms: acceptedTerms,
    }));
    navigate("/confirmation");
  };

  return (
    <>
      <PageWrapper onNext={handleNextClick} onBack={() => navigate("/")}>
        <Title>Additional Info</Title>
        <div className="w-full mb-4">
          <Select
            value={selectedValue}
            onValueChange={setSelectedValue}
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
            onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to{" "}
            <a
              href="#"
              onClick={(e) => e.stopPropagation()}
              className="underline text-blue-600 hover:text-blue-800"
            >
              terms and conditions
            </a>
          </label>
        </div>
      </PageWrapper>
    </>
  );
};
