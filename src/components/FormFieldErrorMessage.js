import React from "react";

const FormFieldErrorMessage = ({ className, errorMessage }) => {
  return (
    <div className={`${className} text-red-600 text-sm`}>{errorMessage}</div>
  );
};

export default FormFieldErrorMessage;
