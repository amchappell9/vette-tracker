import { useState } from "react";
import { Redirect } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/outline";
import * as dayjs from "dayjs";
import Alert, { ALERT_TYPES } from "../../components/Alert";
import PackagesList from "./PackagesList";
import SubmodelInfo from "./SubmodelInfo";
import TrimInfo from "./TrimInfo";
import DeleteVetteModal from "./DeleteVetteModal";

export default function VetteDetailCard({ vetteData, wasUpdated }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vetteDeleted, setVetteDeleted] = useState(false);

  return (
    <div>
      {/* Once vette is deleted redirect to vette list */}
      {vetteDeleted && (
        <Redirect
          to={{
            pathname: `/vettes`,
            state: { vetteDeleted: true },
          }}
        />
      )}

      {/* Show alert if vette was updated */}
      {wasUpdated && (
        <Alert
          alertType={ALERT_TYPES.SUCCESS}
          message="Your Vette was successfully updated!"
          className="mb-4"
        />
      )}

      <div className="flex flex-col gap-y-4 sm:flex-row sm:justify-between sm:gap-y-0">
        <div className="text-gray-500">
          <span>
            Added on {dayjs(vetteData.date, "MM-DD-YYYY").format("MM/DD/YYYY")}
          </span>
          {vetteData.link && (
            <>
              <span className="px-2">|</span>
              <a
                href={vetteData.link}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Listing Link
              </a>
            </>
          )}
        </div>
        <div>
          <button
            onClick={() => !showDeleteModal && setShowDeleteModal(true)}
            className="group text-gray-700 underline transition hover:text-red-600"
          >
            <TrashIcon className="mr-1 inline h-5 w-5 align-text-bottom text-gray-500 transition group-hover:text-red-500" />
            Delete Listing
          </button>
        </div>
      </div>

      {/* Main Info */}
      <div className="mt-6 flex flex-col items-center gap-y-4 rounded bg-gray-50 px-8 py-4 sm:flex-row sm:justify-between sm:gap-y-0 md:px-12">
        <div className="text-xl font-bold">
          <span>{`${vetteData.year} Corvette ${vetteData.submodel}`}</span>
        </div>
        <div className="text-xl font-bold">
          <span>{`$${parseInt(vetteData.cost).toLocaleString()}`}</span>
        </div>
        <div className="text-xl font-bold">
          <span>{`${parseInt(vetteData.miles).toLocaleString()} Miles`}</span>
        </div>
      </div>

      {/* Secondary Info */}
      <div className="my-6 grid grid-cols-1 gap-4 sm:my-8 sm:grid-cols-3 sm:gap-16">
        <div className="col-span-1 text-center sm:text-left">
          <span className="block text-gray-600">Transmission</span>
          <span className="block text-lg font-bold text-gray-800">
            {vetteData.transmissionType}
          </span>
        </div>
        <div className="col-span-1 text-center sm:text-left">
          <span className="block text-gray-600">Exterior Color</span>
          <span className="block text-lg font-bold text-gray-800">
            {vetteData.exteriorColor}
          </span>
        </div>
        <div className="col-span-1 text-center sm:text-left">
          <span className="block text-gray-600">Interior Color</span>
          <span className="block text-lg font-bold text-gray-800">
            {vetteData.interiorColor}
          </span>
        </div>
      </div>

      {/* Submodel and Trim Info */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="col-span-1 flex h-full flex-col">
          <div className="mb-1 block text-gray-600">Submodel</div>
          <SubmodelInfo vetteSubmodel={vetteData.submodel} className="flex-1" />
        </div>
        <div className="col-span-1 flex h-full flex-col">
          <div className="mb-1 block text-gray-600">Trim</div>
          <TrimInfo vetteTrim={vetteData.trim} className="flex-1" />
        </div>
      </div>

      {/* Packages */}
      <div className="mt-4 flex flex-col gap-1">
        <span className="block text-gray-600">Packages</span>
        <PackagesList vettePackages={vetteData.packages} />
      </div>

      <DeleteVetteModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        vetteData={vetteData}
        setVetteDeleted={setVetteDeleted}
      />
    </div>
  );
}
