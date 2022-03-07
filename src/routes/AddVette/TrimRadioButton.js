import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";

const TrimRadioButton = ({ name, className, title, features }) => {
  return (
    <RadioGroup.Option
      key={name}
      value={title}
      className={({ active, checked }) =>
        `${className} flex cursor-pointer flex-col overflow-y-hidden rounded border-gray-100 shadow outline-none transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
          active ? "ring-2 ring-red-500 ring-opacity-80 ring-offset-2" : ""
        }
         ${checked ? "ring-2 ring-red-500 ring-opacity-80 ring-offset-2" : ""} `
      }
    >
      {({ checked }) => (
        <>
          <div className="flex items-center justify-between px-4 py-3">
            <RadioGroup.Label className="text-lg font-bold text-gray-900">
              {title}
            </RadioGroup.Label>
            {checked && <CheckCircleIcon className="h-8 w-8 text-red-500" />}
          </div>
          <div className="flex-1 bg-gray-50 px-4 py-2">
            <ul className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-1">
              {features.map((feature) => (
                <li key={`${title}-${feature}`} className="mb-1 flex">
                  <div>-</div>
                  <div className="ml-2 flex-1">{feature}</div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </RadioGroup.Option>
  );
};

export default TrimRadioButton;
