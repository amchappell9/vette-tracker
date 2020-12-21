import React from "react";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`${className} text-lg border border-gray-300 border-solid outline-none focus:ring-2 focus:ring-red-500 rounded`}
      {...props}
    />
  );
};

export default Input;
