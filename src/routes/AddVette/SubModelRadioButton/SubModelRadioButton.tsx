import { PlusIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { RadioGroup } from "@headlessui/react";

type SubModelRadioButtonProps = {
  name: string;
  className: string;
  title: string;
  engine: string;
  hp: string;
  torque: string;
  features: string[];
};

const SubModelRadioButton = ({
  name,
  className,
  title,
  engine,
  hp,
  torque,
  features,
}: SubModelRadioButtonProps) => {
  return (
    <RadioGroup.Option
      key={name}
      value={title}
      className={({ active, checked }) =>
        `${className}  flex h-full cursor-pointer flex-col rounded border border-gray-100 shadow outline-none transition duration-300 hover:-translate-y-0.5 hover:shadow-lg  focus:-translate-y-0.5 focus:shadow-lg  ${
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
          <div className="flex-1 bg-gray-50 px-4 pt-2 pb-6">
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
        </>
      )}
    </RadioGroup.Option>
  );
};

export default SubModelRadioButton;
