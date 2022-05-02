import NumberFormat from "react-number-format";

export const INPUT_TYPES = {
  MILES: "miles",
  DOLLAR_AMOUNT: "dollar",
};

type InputType = "miles" | "dollar";

// I need some way to pass props straight through to the <input /> without defining them, but I'm not sure how to do that yet
type InputProps = {
  id?: string;
  type?: string;
  autoComplete?: string;
  className?: string;
  haserror?: boolean;
  maskType?: InputType;
};

const Input = ({
  id,
  type,
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
    return (
      <NumberFormat id={id} {...maskOptions} className={classes} {...props} />
    );
  } else {
    return (
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        className={classes}
        {...props}
      />
    );
  }
};

export default Input;
