import FormSelect from "@/src/components/forms/FormSelect/FormSelect";
import { ExteriorColorOption } from "@/src/constants/exteriorColors";

type ExteriorColorSelectProps = {
  label: string;
  name: string;
  year: string;
  exteriorColors: ExteriorColorOption[];
};

/**
 * A select component that only renders the exterior colors available in the selected year.
 */
const ExteriorColorSelect = ({
  label,
  name,
  year,
  exteriorColors,
}: ExteriorColorSelectProps) => {
  const colorOptions = getOptionsByYear(exteriorColors, year);

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
