import { useField } from "formik";
import { RadioGroup } from "@headlessui/react";
import FormFieldErrorMessage from "../FormFieldErrorMessage/FormFieldErrorMessage";

type FormRadioGroupProps = {
  name: string;
  label: string;
  radioGroupClassName: string;
  labelClassName: string;
  children: (name: string) => React.ReactNode;
};

const FormRadioGroup = ({
  name,
  label,
  radioGroupClassName,
  labelClassName,
  children,
}: FormRadioGroupProps) => {
  //  eslint-disable-next-line
  const [field, meta, helpers] = useField({
    name: name,
    type: "radio",
  });

  return (
    <>
      <RadioGroup value={meta.value} onChange={helpers.setValue}>
        <RadioGroup.Label className={labelClassName}>{label}</RadioGroup.Label>
        <div className={radioGroupClassName}>{children(name)}</div>
      </RadioGroup>
      {meta.touched && meta.error ? (
        <FormFieldErrorMessage errorMessage={meta.error} className="mt-2" />
      ) : null}
    </>
  );
};

export default FormRadioGroup;
