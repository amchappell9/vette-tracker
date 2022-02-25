import { useField } from "formik";

const PackageCheckbox = ({ className, name, title, value, description }) => {
  const [field] = useField({ name: name, type: "checkbox", value: value });

  return (
    <div className={`${className} packageCheckbox flex p-4`}>
      <div className="pr-4">
        <input type="checkbox" name={name} value={value} {...field} />
      </div>
      <div>
        <span className="block text-lg font-bold text-gray-800">{title}</span>
        <span className="block text-gray-600">{description}</span>
      </div>
    </div>
  );
};

export default PackageCheckbox;
