import React from "react";

const BUTTON_SIZES = {
  NORMAL: "normal",
  LARGE: "large",
};

const BUTTON_VARIANTS = {
  RED: "red",
};

const getSizeClasses = (size) => {
  let sizeClasses = "";

  switch (size) {
    case BUTTON_SIZES.LARGE:
      sizeClasses = "px-12 py-6 font-bold text-3xl shadow-md";
      break;

    // Defaults to BUTTON_SIZES.NORMAL
    default:
      sizeClasses = "px-6 py-3 text-lg";
      break;
  }

  return sizeClasses;
};

const getVariantClasses = (variant) => {
  let variantClasses = "";

  switch (variant) {
    // case BUTTON_VARIANTS.RED:
    //   break;

    // Defaults to BUTTON_VARIANTS.RED
    default:
      variantClasses = "bg-red-600 hover:bg-red-700 text-white";
      break;
  }

  return variantClasses;
};

const Button = ({ children, size, variant, onClick }) => {
  return (
    <button
      className={`${getSizeClasses(size)} ${getVariantClasses(variant)}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
