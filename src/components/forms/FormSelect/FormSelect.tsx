import { useField } from "formik";
import FormFieldErrorMessage from "../FormFieldErrorMessage/FormFieldErrorMessage";

interface FormSelectProps extends React.HTMLProps<HTMLSelectElement> {
  label: string;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
  className?: string;
}

const FormSelect = ({
  label,
  name,
  options,
  className,
  ...props
}: FormSelectProps) => {
  const [field, meta] = useField(name);

  let selectOptions;

  if (options) {
    selectOptions = options.map(({ value, label }) => (
      <option key={`${value}-${label}`} value={value}>
        {label}
      </option>
    ));
  } else {
    throw new Error("No options provided");
  }

  return (
    <>
      <label htmlFor={name} className="mb-1 block text-lg font-bold">
        {label}
      </label>
      <select
        {...field}
        {...props}
        id={name}
        name={name}
        className={`${className} w-full rounded-sm border border-solid border-gray-300 bg-gray-50 py-2 px-4 text-lg outline-hidden focus:ring-2 focus:ring-red-500`}
      >
        {selectOptions}
      </select>
      {meta.touched && meta.error ? (
        <FormFieldErrorMessage errorMessage={meta.error} className="mt-1" />
      ) : null}
    </>
  );
};

export default FormSelect;
