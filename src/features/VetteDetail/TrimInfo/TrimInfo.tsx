import trims, { TrimsType } from "@/src/constants/trims";
import { PlusIcon } from "@heroicons/react/outline";

const getTrimInfoByKey = (key: string): TrimsType | undefined => {
  for (const trim of trims) {
    if (key === trim.title) {
      return trim;
    }
  }

  console.error("Unknown trim key: ", key);
};

type TrimInfoProps = {
  vetteTrim: string;
  className: string;
};

const TrimInfo = ({ vetteTrim, className }: TrimInfoProps) => {
  const trimInfo = getTrimInfoByKey(vetteTrim);

  if (trimInfo == null) {
    return <></>;
  }

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
