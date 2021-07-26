import React from "react";

const Input = ({ className, haserror, ...props }) => {
  return (
    <input
      className={`${className} text-lg border border-gray-300 border-solid outline-none focus:ring-2 focus:ring-red-500 rounded ${
        haserror ? "border-red-500" : null
      }`}
      {...props}
    />
  );
};

export default Input;
