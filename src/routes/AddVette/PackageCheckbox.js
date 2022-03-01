import { useField } from "formik";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const PackageCheckbox = ({ className, name, title, value, description }) => {
  const [field] = useField({ name: name, type: "checkbox", value: value });
  const [id] = useState(uuidv4());

  return (
    <div
      className={`${className} packageCheckbox flex items-baseline p-4 focus-within:ring focus-within:ring-red-500`}
    >
      <div className="pr-4">
        <input
          id={id}
          type="checkbox"
          name={name}
          value={value}
          {...field}
          className="h-4 w-4 rounded accent-red-500 focus:ring-red-500"
        />
      </div>
      <div>
        <label htmlFor={id}>
          <span className="block text-lg font-bold text-gray-800">{title}</span>
          <span className="block text-gray-600">{description}</span>
        </label>
      </div>
    </div>
  );
};

export default PackageCheckbox;
