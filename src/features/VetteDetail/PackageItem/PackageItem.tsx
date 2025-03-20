type PackageItemProps = {
  title: string;
  description: string;
};

const PackageItem = ({ title, description }: PackageItemProps) => {
  return (
    <div className="rounded-sm bg-gray-50 p-4">
      <span className="block font-bold text-gray-800">{title}</span>
      <p>{description}</p>
    </div>
  );
};

export default PackageItem;
