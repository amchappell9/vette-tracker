import { InputHTMLAttributes } from "react";
import NumberFormat from "react-number-format";

export const INPUT_TYPES = {
  MILES: "miles",
  DOLLAR_AMOUNT: "dollar",
};

type InputType = "miles" | "dollar";

// I need some way to pass props straight through to the <input /> without defining them, but I'm not sure how to do that yet
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  autoComplete?: string;
  className?: string;
  haserror?: boolean;
  maskType?: InputType;
}

const Input = ({
  autoComplete,
  className,
  haserror = false,
  maskType,
  ...props
}: InputProps) => {
  const classes = `${className} rounded border border-solid border-gray-300 text-lg outline-none focus:ring-2 focus:ring-red-500 ${
    haserror ? "border-red-500" : null
  }`;

  let maskOptions = {};

  if (maskType === INPUT_TYPES.MILES) {
    maskOptions = {
      thousandSeparator: true,
      thousandsGroupStyle: ",",
    };
  } else if (maskType === INPUT_TYPES.DOLLAR_AMOUNT) {
    maskOptions = {
      thousandSeparator: true,
      prefix: "$",
    };
  }

  if (maskType) {
    return <NumberFormat {...maskOptions} className={classes} />;
  } else {
    return <input autoComplete={autoComplete} className={classes} {...props} />;
  }
};

export default Input;
