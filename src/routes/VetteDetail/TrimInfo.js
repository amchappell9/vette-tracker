import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import TRIMS from "../../constants/TRIMS";

const getTrimInfoByKey = (key) => {
  for (const trim of TRIMS) {
    if (key === trim.title) {
      return trim;
    }
  }
};

const TrimInfo = ({ vetteTrim }) => {
  const [trimInfo, setTrimInfo] = useState(getTrimInfoByKey(vetteTrim));

  useEffect(() => {
    setTrimInfo(getTrimInfoByKey(vetteTrim));
  }, [vetteTrim]);

  return (
    <div className="bg-gray-50 h-full p-4">
      <span className="block mb-2 text-lg font-bold text-gray-800">
        {trimInfo.title}
      </span>
      <hr />
      <div className="mt-2">
        {trimInfo.features.map((feature) => (
          <span key={feature} className="block mb-1">
            <PlusIcon className="inline w-4 h-4 mr-1 align-text-bottom" />
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrimInfo;
