import { useId } from "react";
import { motion } from "framer-motion";
import { cva } from "class-variance-authority";
import submodels from "@/src/constants/submodels";

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

const tabClasses = cva(
  "relative -mx-4 block rounded-md px-4 py-2 text-left text-lg font-bold",
  {
    variants: {
      intent: {
        active: "text-gray-800",
        inactive: "text-gray-700",
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
  const tablistLabelId = useId();

  return (
    <div className="px-12 py-8">
      <div
        id={tablistLabelId}
        className="mb-2 inline-block text-xs font-bold uppercase text-gray-500"
      >
        Submodel
      </div>
      <div
        className="flex flex-col gap-2"
        role="tablist"
        aria-labelledby={tablistLabelId}
      >
        {submodels.map((submodel) => {
          const isActive = selectedSubmodel === submodel.title;

          return (
            <button
              role="tab"
              key={submodel.title}
              onClick={() => onChange(submodel.title)}
              className={tabClasses({
                intent: isActive ? "active" : "inactive",
              })}
              aria-selected={isActive}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-md bg-gray-200"
                />
              )}
              <span className="relative z-10">{submodel.title}</span>
            </button>
          );
        })}
      </div>
    </div>
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
