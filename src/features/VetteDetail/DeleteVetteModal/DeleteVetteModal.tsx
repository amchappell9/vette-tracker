import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { VetteObject } from "@/src/types";
import { useDeleteVette } from "../api/deleteVette";
import { getErrorMessage } from "@/src/utils/utils";
import Alert from "@/src/components/Alert/Alert";
import Button from "@/src/components/Button/Button";
import { Balancer } from "react-wrap-balancer";
import { useRouter } from "next/router";

type DeleteVetteModalProps = {
  vetteData: VetteObject;
};

/**
 * Modal that allows the user to delete a vette. Will display
 * if "?deleteConfirmation=true" is in the URL.
 * @param param0
 * @returns
 */
export default function DeleteVetteModal({ vetteData }: DeleteVetteModalProps) {
  const { isSuccess, isPending, isError, error, mutate } = useDeleteVette();
  const cancelButtonRef = useRef(null);
  const router = useRouter();

  const { deleteConfirmation } = router.query;
  const open = Boolean(deleteConfirmation);

  const setOpen = (open: boolean) => {
    if (open) {
      router.push(`/vettes/${vetteData.id}?deleteConfirmation=true`);
    } else {
      router.push(`/vettes/${vetteData.id}`, undefined, { shallow: true });
    }
  };

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
                <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
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

                  <div className="mt-1">
                    {/* Default State */}
                    {!isPending && !isError && !isSuccess && (
                      <ModalBodyText>
                        Are you sure you want to delete your
                        <strong className="font-bold">{` ${vetteData.year} Corvette ${vetteData.submodel}`}</strong>
                        ? This action cannot be undone.
                      </ModalBodyText>
                    )}

                    {/* Loading */}
                    {isPending && <ModalBodyText>Deleting...</ModalBodyText>}

                    {/* Success */}
                    {isSuccess && (
                      <ModalBodyText>
                        Your Vette has been deleted!
                      </ModalBodyText>
                    )}

                    {/* Error */}
                    {isError && (
                      <Alert alertType={"danger"}>
                        {getErrorMessage(error)}
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:mt-4 sm:flex-row-reverse">
                {/* Default State */}
                {!isPending && !isError && !isSuccess && (
                  <>
                    <Button
                      type="button"
                      buttonSize={"small"}
                      onClick={() => mutate(vetteData)}
                    >
                      Delete
                    </Button>
                    <Button
                      type="button"
                      intent={"secondary"}
                      buttonSize={"small"}
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </Button>
                  </>
                )}

                {/* Success */}
                {isSuccess && (
                  <Button
                    as="link"
                    href={"/vettes"}
                    intent={"secondary"}
                    buttonSize={"small"}
                  >
                    Go to Vettes
                  </Button>
                )}

                {/* Error */}
                {isError && (
                  <>
                    <Button
                      type="button"
                      buttonSize={"small"}
                      onClick={() => {
                        mutate(vetteData);
                      }}
                    >
                      Try Again
                    </Button>
                    <Button
                      type="button"
                      intent={"secondary"}
                      buttonSize={"small"}
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </Button>
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

const ModalBodyText = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-gray-600">
      <Balancer>{children}</Balancer>
    </p>
  );
};
