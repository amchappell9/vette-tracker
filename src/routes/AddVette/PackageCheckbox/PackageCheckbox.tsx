import { useField } from "formik";
import { useId } from "react";

type PackageCheckboxProps = {
  className: string;
  name: string;
  title: string;
  value: string;
  description: string;
};

const PackageCheckbox = ({
  className,
  name,
  title,
  value,
  description,
}: PackageCheckboxProps) => {
  const [field] = useField({ name: name, type: "checkbox", value: value });
  const id = useId();

  return (
    <div
      className={`${className} packageCheckbox flex items-baseline p-4 focus-within:ring focus-within:ring-red-500`}
    >
      <div className="pr-4">
        <input
          {...field}
          id={id}
          type="checkbox"
          name={name}
          value={value}
          className="h-4 w-4 cursor-pointer rounded accent-red-500 focus:ring-red-500"
        />
      </div>
      <div>
        <label htmlFor={id} className="cursor-pointer">
          <span className="block text-lg font-bold text-gray-800">{title}</span>
          <span className="block text-gray-600">{description}</span>
        </label>
      </div>
    </div>
  );
};

export default PackageCheckbox;
