import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";

import Alert from "../../../components/Alert";
import { VetteObject } from "../../../types/types";
import { useDeleteVette } from "../api/deleteVette";
import { getErrorMessage } from "../../../utils/utils";

type DeleteVetteModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  vetteData: VetteObject;
  onUserAcknowledgedDelete: (deleted: boolean) => void;
};

export default function DeleteVetteModal({
  open,
  setOpen,
  vetteData,
  onUserAcknowledgedDelete,
}: DeleteVetteModalProps) {
  const cancelButtonRef = useRef(null);
  const { isSuccess, isLoading, isError, error, mutate } = useDeleteVette();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Vette
                  </Dialog.Title>

                  {/* Default State */}
                  {!isLoading && !isError && !isSuccess && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete your
                        <strong className="font-bold">{` ${vetteData.year} Corvette ${vetteData.submodel}`}</strong>
                        ? This action cannot be undone.
                      </p>
                    </div>
                  )}

                  {/* Loading */}
                  {isLoading && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Deleting...</p>
                    </div>
                  )}

                  {/* Success */}
                  {isSuccess && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your Vette has been deleted!
                      </p>
                    </div>
                  )}

                  {/* Error */}
                  {isError && (
                    <div className="mt-2">
                      <Alert
                        alertType={"danger"}
                        message={getErrorMessage(error)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                {/* Default State */}
                {!isLoading && !isError && !isSuccess && (
                  <>
                    <button
                      type="button"
                      className="border-transparent inline-flex w-full justify-center rounded-md border bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => mutate(vetteData)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="focus:ring-indigo-500 mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </>
                )}

                {/* Success */}
                {isSuccess && (
                  <button
                    type="button"
                    className="focus:ring-indigo-500 mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => onUserAcknowledgedDelete(true)}
                    ref={cancelButtonRef}
                  >
                    Go to Vettes
                  </button>
                )}

                {/* Error */}
                {isError && (
                  <>
                    <button
                      type="button"
                      className="border-transparent inline-flex w-full justify-center rounded-md border bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        mutate(vetteData);
                      }}
                    >
                      Try Again
                    </button>
                    <button
                      type="button"
                      className="focus:ring-indigo-500 mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}