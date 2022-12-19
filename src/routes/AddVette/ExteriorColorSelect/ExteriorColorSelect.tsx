import FormSelect from "../../../components/forms/FormSelect";
import exteriorColors from "../../../constants/exteriorColors";

type ExteriorColorOption = {
  colorName: string;
  /** The years the color was produced */
  years: string[];
};

type ExteriorColorSelectProps = {
  label: string;
  name: string;
  year: string;
};

/**
 * A select component that only renders the exterior colors available in the selected year.
 */
const ExteriorColorSelect = ({
  label,
  name,
  year,
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
