type FormFieldErrorMessageProps = {
  className: string;
  errorMessage: string;
};

const FormFieldErrorMessage = ({
  className,
  errorMessage,
}: FormFieldErrorMessageProps) => {
  return (
    <div className={`${className} text-sm text-red-600`}>{errorMessage}</div>
  );
};

export default FormFieldErrorMessage;
