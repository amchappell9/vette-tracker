import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import FormSelect from "../../../components/forms/FormSelect";

type ExteriorColorOption = {
  colorName: string;
  /** The years the color was produced */
  years: string[];
};

type ExteriorColorSelectProps = {
  label: string;
  name: string;
  allExteriorColorOptions: ExteriorColorOption[];
};

/**
 * A select component that only renders the exterior colors available in the selected year.
 */
const ExteriorColorSelect = ({
  label,
  name,
  allExteriorColorOptions,
}: ExteriorColorSelectProps) => {
  const {
    values: { year },
  } = useFormikContext();
  const [colorOptions, setColorOptions] = useState(allExteriorColorOptions);

  useEffect(() => {
    if (year.trim() !== "") {
      setColorOptions(getOptionsByYear(allExteriorColorOptions, year));
    }
  }, [year, allExteriorColorOptions]);

  return (
    <FormSelect
      label={label}
      name={name}
      options={colorOptions.map((val) => {
        return { label: val.colorName, value: val.colorName };
      })}
    />
  );
};

const getOptionsByYear = (options: ExteriorColorOption[], year: string) => {
  return options.filter((option) => option.years.includes(year));
};

export default ExteriorColorSelect;
