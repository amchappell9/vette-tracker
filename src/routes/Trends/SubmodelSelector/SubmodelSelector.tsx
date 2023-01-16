import { useId } from "react";
import submodels from "../../../constants/submodels";
import { RadioGroup } from "@headlessui/react";
import { cva } from "class-variance-authority";

interface SubmodelSelectorProps {
  selectedSubmodel: string;
  onChange: (submodel: string) => void;
}

const SubmodelSelector = ({
  selectedSubmodel,
  onChange,
}: SubmodelSelectorProps) => {
  return (
    <div>
      {/* Show Radio buttons on md and higher */}
      <div className="hidden md:block">
        <SubmodelSelectorRadioButtons
          selectedSubmodel={selectedSubmodel}
          onChange={onChange}
        />
      </div>

      {/* Show dropdown on mobile */}
      <div className="md:hidden">
        <SubmodelSelectorDropdown
          selectedSubmodel={selectedSubmodel}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

const selectorOption = cva(
  "block font-bold py-2 cursor-pointer -mx-4 px-4 rounded-md mb-1 text-lg transition-colors",
  {
    variants: {
      intent: {
        active: "text-gray-800 bg-gray-200",
        inactive: "text-gray-700 hover:bg-gray-100",
      },
    },
    defaultVariants: {
      intent: "inactive",
    },
  }
);

interface SubmodelSelectorRadioButtonsProps extends SubmodelSelectorProps {}

const SubmodelSelectorRadioButtons = ({
  selectedSubmodel,
  onChange,
}: SubmodelSelectorRadioButtonsProps) => {
  return (
    <RadioGroup
      value={selectedSubmodel}
      onChange={onChange}
      className="px-12 py-8"
    >
      <RadioGroup.Label className="mb-2 inline-block text-xs font-bold uppercase text-gray-500">
        Submodel
      </RadioGroup.Label>
      {submodels.map((submodel) => {
        return (
          <RadioGroup.Option value={submodel.title} key={submodel.title}>
            {({ checked }) => (
              <div
                className={selectorOption({
                  intent: checked ? "active" : "inactive",
                })}
              >
                {submodel.title}
              </div>
            )}
          </RadioGroup.Option>
        );
      })}
    </RadioGroup>
  );
};

interface SubmodelSelectorDropdownProps extends SubmodelSelectorProps {}

const SubmodelSelectorDropdown = ({
  selectedSubmodel,
  onChange,
}: SubmodelSelectorDropdownProps) => {
  const id = useId();

  return (
    <div className="p-4">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-bold text-gray-600"
      >
        Submodel
      </label>
      <select
        id={id}
        name={id}
        className="block w-full rounded border border-gray-300 py-2 pl-4 pr-8 text-lg"
        onChange={(e) => onChange(e.target.value)}
        value={selectedSubmodel}
      >
        {submodels.map((submodel) => {
          return <option key={submodel.title}>{submodel.title}</option>;
        })}
      </select>
    </div>
  );
};

export default SubmodelSelector;
