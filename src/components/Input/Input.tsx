import { InputHTMLAttributes } from "react";
import NumberFormat from "react-number-format";

export const INPUT_TYPES = {
  MILES: "miles",
  DOLLAR_AMOUNT: "dollar",
};

type InputType = "miles" | "dollar";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  autoComplete?: string;
  className?: string;
  haserror?: boolean;
  maskType?: InputType;
  // These are just to convert the types from InputHTMLAttributes to ones
  // acceptable by NumberFormatProps
  value?: string | number;
  defaultValue?: string | number;
  type?: "text" | "tel" | "password";
}

const Input = ({
  autoComplete,
  className,
  haserror = false,
  maskType,
  value,
  defaultValue,
  type,
  ...props
}: InputProps) => {
  const classes = `${
    !!className ? className : ""
  } rounded border border-solid border-gray-300 text-lg outline-none focus:ring-2 focus:ring-red-500 ${
    haserror ? "border-red-500" : ""
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
    return (
      <NumberFormat
        {...maskOptions}
        {...props}
        className={classes}
        value={value}
        defaultValue={defaultValue}
        type={type}
      />
    );
  } else {
    return <input {...props} autoComplete={autoComplete} className={classes} />;
  }
};

export default Input;
