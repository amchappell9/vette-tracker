import { useField } from "formik";
import Input, { InputType } from "../../Input/Input";
import FormFieldErrorMessage from "../FormFieldErrorMessage/FormFieldErrorMessage";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: "password" | "tel" | "text" | undefined;
  defaultValue?: string | number | undefined;
  maskType?: InputType;
}

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
