import { format } from "date-fns";
import { VetteObject } from "@/src/types";
import Link from "next/link";
import { getDateObject } from "@/src/utils/utils";

const getBorderStylesByIndex = (totalLength: number, index: number) => {
  let styles = "";

  if (index === 0 && totalLength !== 1) {
    styles = "border rounded-t border-b-0";
  } else if (index > 0 && index !== totalLength - 1) {
    styles = "border-b-0";
  } else if (index === totalLength - 1 && totalLength !== 1) {
    styles = "border rounded-b";
  } else if (index === 0 && totalLength === 1) {
    styles = "border rounded";
  }

  return styles;
};

type VetteItemProps = {
  vette: VetteObject;

  /** Index of the vette in the array. Used to determine if border should be rounded or not. */
  index: number;

  /** Length of the array of vettes. */
  listLength: number;
};

const VetteItem = ({ vette, index, listLength }: VetteItemProps) => {
  const formattedDate = format(getDateObject(vette.date), "MM/dd/yyyy");
  const formattedCost = parseInt(vette.cost).toLocaleString();

  return (
    <li>
      <Link
        href={`/vettes/${vette.id}`}
        className={` ${getBorderStylesByIndex(
          listLength,
          index
        )} block w-full  border border-gray-200 p-4 transition-colors hover:bg-gray-50`}
      >
        {/* Mobile List Styles */}
        <div className="flex justify-between sm:hidden">
          <div className="flex flex-col gap-y-1">
            <p className="text-lg font-bold leading-none text-gray-800">{`${vette.year} Corvette ${vette.submodel}`}</p>
            <p className="text-md leading-none text-gray-600">
              <span className="after:mx-1 after:content-['|']">{`$${formattedCost}`}</span>
              <span>{parseInt(vette.miles).toLocaleString()} Miles</span>
            </p>
          </div>
          <div className="">{">"}</div>
        </div>
        {/* Desktop List Styles */}
        <div className="hidden justify-between sm:flex">
          {/* Year, Submodel and Date */}
          <div className="flex flex-1 flex-col gap-1 ">
            <p className="text-lg font-bold leading-none text-gray-800">
              {`${vette.year} Corvette`}
              <span className="md:hidden">{` ${vette.submodel}`}</span>
            </p>

            <p className="text-md leading-none text-gray-600">{`Added ${formattedDate}`}</p>
          </div>

          {/* Cost and Miles */}
          <div className="flex flex-1 flex-col gap-y-1 sm:flex-none sm:basis-1/4">
            <p className="font-bold leading-none text-gray-700">{`$${parseInt(
              vette.cost
            ).toLocaleString()}`}</p>
            <p className="block leading-none text-gray-700">
              <strong>{parseInt(vette.miles).toLocaleString()}</strong> Miles
            </p>
          </div>

          {/* Exterior and Interior Colors */}
          <div className="hidden flex-1 flex-col gap-y-1 md:flex">
            <p className="leading-none">
              <span className="font-bold">{vette.submodel}</span> with{" "}
              <span className="font-bold">{vette.trim}</span>
            </p>
            <p className="truncate leading-none">{`${vette.exteriorColor} on ${vette.interiorColor} Interior`}</p>
          </div>
          <div className="hidden basis-40 items-center lg:flex">
            {vette.packages.map((option) => (
              <span
                key={option}
                className="mr-2 inline rounded-xl bg-red-500 px-2 py-1 text-sm text-white"
              >
                {option.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default VetteItem;
