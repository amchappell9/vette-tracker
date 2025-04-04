import submodels, { SubmodelType } from "@/src/constants/submodels";
import { PlusIcon } from "@heroicons/react/outline";

const getSubmodelInfoByKey = (key: string): SubmodelType | undefined => {
  for (const submodel of submodels) {
    if (key === submodel.title) {
      return submodel;
    }
  }

  console.error("Unknown submodel key: ", key);
};

type SubmodelInfoProps = {
  vetteSubmodel: string;
  className: string;
};

const SubmodelInfo = ({ vetteSubmodel, className }: SubmodelInfoProps) => {
  const submodelInfo = getSubmodelInfoByKey(vetteSubmodel);

  if (submodelInfo == null) {
    return <></>;
  }

  return (
    <div className={`rounded-sm bg-gray-50 p-4 ${className}`}>
      <span className="mb-2 block text-lg font-bold text-gray-800">
        {submodelInfo.title}
      </span>
      <hr />
      <div className="mt-2">
        <span className="block text-gray-800">{`${submodelInfo.engine} Engine - ${submodelInfo.hp} HP | ${submodelInfo.torque} Lbs/Ft`}</span>
      </div>
      <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
        {submodelInfo.features.map((feature) => (
          <li key={feature} className="flex items-center gap-x-1">
            <PlusIcon className="inline h-4 w-4 translate-y-px" />
            <span className="flex-1 text-gray-900">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmodelInfo;
