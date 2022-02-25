import React from "react";
import { PlusIcon } from "@heroicons/react/outline";
import { useField } from "formik";

const SubModelRadioButton = ({
  name,
  className,
  title,
  engine,
  hp,
  torque,
  features,
}) => {
  // The type and the value are important to making the radio buttons work
  const [field] = useField({ name: name, type: "radio", value: title });

  return (
    <label
      className={`${className} flex h-full cursor-pointer flex-col rounded border border-gray-100 shadow transition-shadow hover:shadow-lg ${
        field.checked ? "ring-2 ring-red-500 ring-opacity-80 ring-offset-2" : ""
      }`}
    >
      <input
        type="radio"
        name={name}
        value={title}
        className="hidden"
        {...field}
      />
      <div className="px-4 py-3">
        <span className="text-lg font-bold text-gray-900">{title}</span>
      </div>
      <div className="flex-1 bg-gray-50 px-4 py-2">
        <span className="block text-lg text-gray-900">{engine} Engine</span>
        <span className="block text-gray-600">
          {hp} HP | {torque} LBS/FT
        </span>
        <ul className="mt-2 grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-y-2 gap-x-4">
          {features.map((feature) => (
            <li key={`${title}-${feature}`} className="col-span-1 flex">
              <div>
                <PlusIcon className="mr-1 inline h-5 w-5 align-text-bottom text-gray-400" />
              </div>
              <div className="flex-1 text-gray-900">{feature}</div>
            </li>
          ))}
        </ul>
      </div>
    </label>
  );
};

export default SubModelRadioButton;
