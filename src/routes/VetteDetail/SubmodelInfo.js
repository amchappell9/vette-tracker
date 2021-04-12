import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import SUBMODELS from "../../constants/SUBMODELS";

const getSubmodelInfoByKey = (key) => {
  for (const submodel of SUBMODELS) {
    if (key === submodel.title) {
      return submodel;
    }
  }
};

const SubmodelInfo = ({ vetteSubmodel }) => {
  const [submodelInfo, setsubmodelInfo] = useState(
    getSubmodelInfoByKey(vetteSubmodel)
  );

  useEffect(() => {
    setsubmodelInfo(getSubmodelInfoByKey(vetteSubmodel));
  }, [vetteSubmodel]);

  return (
    <div className="bg-gray-50 h-full p-4">
      <span className="block mb-2 text-lg font-bold text-gray-800">
        {submodelInfo.title}
      </span>
      <hr />
      <div className="mt-2">
        <span className="block text-gray-800">{`${submodelInfo.engine} Engine - ${submodelInfo.hp} HP | ${submodelInfo.torque} Lbs/Ft`}</span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {submodelInfo.features.map((feature) => (
          <div key={feature}>
            <span className="text-gray-900">
              <PlusIcon className="inline w-4 h-4 align-text-bottom" />
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmodelInfo;
