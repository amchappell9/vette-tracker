import NumberFormat from "react-number-format";

export const INPUT_TYPES = {
  MILES: "miles",
  DOLLAR_AMOUNT: "dollar",
};

const Input = ({ className, haserror, maskType, ...props }) => {
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
    return <NumberFormat {...maskOptions} className={classes} {...props} />;
  } else {
    return <input className={classes} {...props} />;
  }
};

export default Input;
