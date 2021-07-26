import React from "react";

const BUTTON_SIZES = {
  NORMAL: "normal",
  LARGE: "large",
  FULL: "full",
};

const BUTTON_VARIANTS = {
  RED: "red",
  SECONDARY: "secondary",
};

const getSizeClasses = (size) => {
  let sizeClasses = "";

  switch (size) {
    case BUTTON_SIZES.LARGE:
      sizeClasses = "px-12 py-6 font-bold text-3xl shadow-md";
      break;

    case BUTTON_SIZES.FULL:
      sizeClasses = "w-full py-3 font-bold text-xl shadow-sm";
      break;

    // Defaults to BUTTON_SIZES.NORMAL
    default:
      sizeClasses = "px-6 py-2 text-lg";
      break;
  }

  return sizeClasses;
};

const getVariantClasses = (variant) => {
  let variantClasses = "";

  switch (variant) {
    case BUTTON_VARIANTS.SECONDARY:
      variantClasses =
        "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300";
      break;

    // Defaults to BUTTON_VARIANTS.RED
    default:
      variantClasses =
        "bg-red-500 hover:bg-red-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-700";
      break;
  }

  return variantClasses;
};

const Button = ({ children, size, variant, onClick, className, ...props }) => {
  return (
    <button
      className={`${getSizeClasses(size)} ${getVariantClasses(variant)} ${
        typeof className !== "undefined" && className
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
