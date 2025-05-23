import { useEffect, useState } from "react";
import Select from "../components/select";
import Input from "../components/input";

const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const COLORS_API = "http://localhost:3001/api/colors";

export const MoreInfo = () => {
  const [selectedValue, setSelectedValue] = useState("");
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

  return (
    <div>
      <h1>Additional Info</h1>
      <main>
        <Select
          options={colorOptions}
          value={selectedValue}
          onChange={(value) => setSelectedValue(value)}
          placeholder="Choose an option"
          isLoading={isLoading}
        />
        <Input type="checkbox" id="terms" label="Accept terms and conditions" />
      </main>
    </div>
  );
};
