import { useField } from "formik";
import { useId } from "react";
import FormFieldErrorMessage from "../FormFieldErrorMessage/FormFieldErrorMessage";

type FormCheckboxGroupProps = {
  label: string;
  name: string;
  groupClassName?: string;
  children: (name: string) => React.ReactNode;
};

const FormCheckboxGroup = ({
  label,
  name,
  groupClassName,
  children,
}: FormCheckboxGroupProps) => {
  // Needs a unique ID for the radio button group
  const id = useId();

  // I don't know how to only get the second value from the array...
  // eslint-disable-next-line
  const [field, meta] = useField(name);

  return (
    <>
      <div id={id} className="mb-1 block text-lg font-bold">
        {label}
      </div>
      <div role="group" aria-labelledby={id} className={groupClassName}>
        {children(name)}
      </div>
      {meta.touched && meta.error ? (
        <FormFieldErrorMessage errorMessage={meta.error} className="mt-2" />
      ) : null}
    </>
  );
};

export default FormCheckboxGroup;
