import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon, PencilIcon } from "@heroicons/react/outline";
import SubmodelInfo from "./SubmodelInfo";
import TrimInfo from "./TrimInfo";
import PackagesList from "./PackagesList";

const fakeVetteData = {
  year: "2014",
  miles: "500",
  cost: "45000",
  transmissionType: "Manual",
  exteriorColor: "Artic White",
  interiorColor: "Red",
  submodel: "Z51",
  trim: "2LT",
  packages: ["MRC", "NPP", "PDR"],
};

const VetteDetail = () => {
  let { id } = useParams();
  let location = useLocation();

  const [vetteData, setVetteData] = useState(null);
  const [isConfirmationView, setIsConfirmationView] = useState(
    location.state && location.state.isConfirmationView ? true : false
  );

  // Get Vette Detail by ID
  useEffect(() => {
    setTimeout(() => setVetteData(fakeVetteData), 750);
  }, [id]);

  // See which version needs to be displayed
  useEffect(() => {
    setIsConfirmationView(
      location.state && location.state.isConfirmationView ? true : false
    );
  }, [location]);

  return (
    <div className="min-main-height flex justify-center">
      <div className="max-w-4xl w-full -mt-44 mb-8">
        <div className="text-gray-300 hover:underline mb-8">
          <Link to="/vettes">
            <ArrowLeftIcon className="inline align-text-bottom mr-1 w-5 h-5" />
            Back to All Vettes
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">
            {vetteData
              ? `${vetteData.year} Corvette ${vetteData.submodel}`
              : "Vette Information"}
          </h1>
          <div className="text-right">
            {isConfirmationView ? (
              <Link
                to="/add-vette"
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
                <PlusIcon className="inline w-5 h-5 mr-1 align-text-bottom" />
                Add Another Vette
              </Link>
            ) : (
              <Link
                to={{ pathname: "/add-vette", state: { vetteToEdit: id } }}
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
                <PencilIcon className="inline w-5 h-5 mr-1 align-text-bottom" />
                Edit Vette
              </Link>
            )}
          </div>
        </div>
        <div className="rounded bg-white w-full shadow-lg mt-4">
          {vetteData ? (
            <div className="px-16 pt-6 pb-8">
              <div className="flex justify-between">
                <div className="text-gray-500">
                  <span>Added on 12/28/1994</span>
                  <span className="px-2">|</span>
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Listing Link
                  </a>
                </div>
                <div>
                  <button className="underline">Delete Listing</button>
                </div>
              </div>
              {/* Main Info */}
              <div className="bg-gray-50 mt-6 px-4 py-6 flex justify-between">
                <div className="font-bold text-xl">
                  <span>2014 Corvette Z51</span>
                </div>
                <div className="font-bold text-xl">
                  <span>$41,500</span>
                </div>
                <div className="font-bold text-xl">
                  <span>14,258 Miles</span>
                </div>
              </div>
              {/* Secondary Info */}
              <div className="mt-6 grid grid-cols-3 gap-16">
                <div className="col-span-1">
                  <span className="block text-gray-600">Transmission</span>
                  <span className="block text-gray-800 text-lg font-bold">
                    Manual
                  </span>
                </div>
                <div className="col-span-1">
                  <span className="block text-gray-600">Exterior Color</span>
                  <span className="block text-gray-800 text-lg font-bold">
                    Artic White
                  </span>
                </div>
                <div className="col-span-1">
                  <span className="block text-gray-600">Interior Color</span>
                  <span className="block text-gray-800 text-lg font-bold">
                    Red
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
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VetteDetail;
