import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

export const BUTTON_STATES = {
  DEFAULT: "default",
  DOTS: "dots",
  PREV: "previous",
  NEXT: "next",
} as const;

type ButtonState = (typeof BUTTON_STATES)[keyof typeof BUTTON_STATES];

const getButtonTextByState = (state: ButtonState, number?: number) => {
  switch (state) {
    case BUTTON_STATES.PREV:
      return (
        <>
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </>
      );
    case BUTTON_STATES.NEXT:
      return (
        <>
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </>
      );
    case BUTTON_STATES.DOTS:
      return <span className="text-gray-500">...</span>;
    case BUTTON_STATES.DEFAULT:
    default:
      return number;
  }
};

const getClassNameByState = (state: ButtonState, active: boolean) => {
  if (state === BUTTON_STATES.PREV) {
    return "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50";
  } else if (state === BUTTON_STATES.NEXT) {
    return "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50";
  } else if (active) {
    return "z-10 bg-red-50 border-red-500 text-red-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
  } else {
    return "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
  }
};

type PaginationButtonProps = {
  active?: boolean;
  onChange?: () => void;
  state?: ButtonState;
  number?: number;
  disabled?: boolean;
};

const PaginationButton = ({
  active = false,
  onChange,
  state = BUTTON_STATES.DEFAULT,
  number,
  disabled = false,
}: PaginationButtonProps) => {
  return (
    <button
      aria-current={active ? "page" : undefined}
      disabled={disabled}
      aria-disabled={disabled}
      className={`${getClassNameByState(
        state,
        active
      )} transition-colors focus:border-red-500 focus:outline-hidden disabled:opacity-40 disabled:hover:bg-white`}
      onClick={() => {
        if (!disabled && typeof onChange === "function") onChange();
      }}
    >
      {getButtonTextByState(state, number)}
    </button>
  );
};

export default PaginationButton;
