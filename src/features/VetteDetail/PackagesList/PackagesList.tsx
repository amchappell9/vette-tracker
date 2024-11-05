import PackageItem from "../PackageItem/PackageItem";
import packages, { PackageType } from "../../../constants/packages";

const getPackageInfoByKey = (key: string): PackageType | undefined => {
  for (const packageInfo of packages) {
    if (key === packageInfo.value) {
      return packageInfo;
    }
  }

  console.error("Unknown package key: ", key);
};

type PackagesListProps = {
  vettePackages: string[];
};

const PackagesList = ({ vettePackages }: PackagesListProps) => {
  if (vettePackages.length > 0) {
    return (
      <div className="flex flex-col gap-4">
        {vettePackages.map((vettePackage) => {
          const packageInfo = getPackageInfoByKey(vettePackage);

          if (packageInfo != null) {
            return (
              <PackageItem
                key={packageInfo.title}
                title={packageInfo.title}
                description={packageInfo.description}
              />
            );
          } else {
            return <></>;
          }
        })}
      </div>
    );
  } else {
    return <div>This vette has no packages 🙁</div>;
  }
};

export default PackagesList;
