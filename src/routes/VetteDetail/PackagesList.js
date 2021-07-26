import React from "react";
import PackageItem from "./PackagesItem";
import PACKAGES from "../../constants/PACKAGES";

const getPackageInfoByKey = (key) => {
  for (const packageInfo of PACKAGES) {
    if (key === packageInfo.value) {
      return packageInfo;
    }
  }
};

const PackagesList = ({ vettePackages }) => {
  if (vettePackages.length > 0) {
    return vettePackages.map((vettePackage) => {
      const packageInfo = getPackageInfoByKey(vettePackage);
      return (
        <PackageItem
          key={packageInfo.title}
          title={packageInfo.title}
          description={packageInfo.description}
        />
      );
    });
  } else {
    return <div>This vette has no packages (make this nice looking)</div>;
  }
};

export default PackagesList;
