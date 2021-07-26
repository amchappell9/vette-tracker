import { useState } from "react";
import { Redirect } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/outline";
import * as dayjs from "dayjs";
import Alert, { ALERT_TYPES } from "../../components/Alert";
import Card from "../../components/Card";
import PackagesList from "./PackagesList";
import SubmodelInfo from "./SubmodelInfo";
import TrimInfo from "./TrimInfo";
import DeleteVetteModal from "./DeleteVetteModal";

export default function VetteDetailCard({ vetteData, wasUpdated }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vetteDeleted, setVetteDeleted] = useState(false);

  return (
    <Card>
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

      <div className="flex justify-between">
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
            className="underline group text-gray-700 hover:text-red-600 transition"
          >
            <TrashIcon className="inline align-text-bottom text-gray-500 group-hover:text-red-500 transition h-5 w-5 mr-1" />
            Delete Listing
          </button>
        </div>
      </div>
      {/* Main Info */}
      <div className="bg-gray-50 rounded mt-6 px-12 py-4 flex justify-between">
        <div className="font-bold text-xl">
          <span>{`${vetteData.year} Corvette ${vetteData.submodel}`}</span>
        </div>
        <div className="font-bold text-xl">
          <span>{`$${parseInt(vetteData.cost).toLocaleString()}`}</span>
        </div>
        <div className="font-bold text-xl">
          <span>{`${parseInt(vetteData.miles).toLocaleString()} Miles`}</span>
        </div>
      </div>
      {/* Secondary Info */}
      <div className="mt-6 grid grid-cols-3 gap-16">
        <div className="col-span-1">
          <span className="block text-gray-600">Transmission</span>
          <span className="block text-gray-800 text-lg font-bold">
            {vetteData.transmissionType}
          </span>
        </div>
        <div className="col-span-1">
          <span className="block text-gray-600">Exterior Color</span>
          <span className="block text-gray-800 text-lg font-bold">
            {vetteData.exteriorColor}
          </span>
        </div>
        <div className="col-span-1">
          <span className="block text-gray-600">Interior Color</span>
          <span className="block text-gray-800 text-lg font-bold">
            {vetteData.interiorColor}
          </span>
        </div>
      </div>
      {/* Submodel and Trim Info */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="col-span-1">
          <span className="block text-gray-600 mb-1">Submodel</span>
          <SubmodelInfo vetteSubmodel={vetteData.submodel} />
        </div>
        <div className="col-span-1">
          <span className="block text-gray-600 mb-1">Trim</span>
          <TrimInfo vetteTrim={vetteData.trim} />
        </div>
      </div>
      {/* Packages */}
      <div className="mt-12">
        <span className="block text-gray-600">Packages</span>
        <PackagesList vettePackages={vetteData.packages} />
      </div>
      <DeleteVetteModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        vetteData={vetteData}
        setVetteDeleted={setVetteDeleted}
      />
    </Card>
  );
}
