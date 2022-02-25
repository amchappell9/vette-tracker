import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import trims from "../../constants/trims";

const getTrimInfoByKey = (key) => {
  for (const trim of trims) {
    if (key === trim.title) {
      return trim;
    }
  }
};

const TrimInfo = ({ vetteTrim, className }) => {
  const [trimInfo, setTrimInfo] = useState(getTrimInfoByKey(vetteTrim));

  useEffect(() => {
    setTrimInfo(getTrimInfoByKey(vetteTrim));
  }, [vetteTrim]);

  return (
    <div className={`rounded bg-gray-50 p-4 ${className}`}>
      <span className="mb-2 block text-lg font-bold text-gray-800">
        {trimInfo.title}
      </span>
      <hr />
      <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
        {trimInfo.features.map((feature) => (
          <li key={feature} className="mb-1 flex items-center gap-x-1">
            <PlusIcon className="inline h-4 w-4 translate-y-px" />
            <span className="flex-1">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrimInfo;
