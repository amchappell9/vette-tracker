import { useField } from "formik";
import Input from "../../Input";
import FormFieldErrorMessage from "../FormFieldErrorMessage";

type FormInputProps = {
  label: string;
  name: string;
};

const FormInput = ({ label, name, ...props }: FormInputProps) => {
  const [field, meta] = useField(name);

  return (
    <>
      <label htmlFor={name} className="mb-1 block text-lg font-bold">
        {label}
      </label>
      <Input
        {...field}
        {...props}
        name={name}
        className="w-full bg-gray-50 py-2 px-4 text-lg"
      />
      {meta.touched && meta.error ? (
        <FormFieldErrorMessage errorMessage={meta.error} className="mt-1" />
      ) : null}
    </>
  );
};

export default FormInput;
