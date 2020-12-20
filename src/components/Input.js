import React from "react";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`${className} text-lg bg-gray-50 border border-gray-200 border-solid outline-none focus:ring-2 focus:ring-red-500 rounded`}
      {...props}
    />
  );
};

export default Input;
