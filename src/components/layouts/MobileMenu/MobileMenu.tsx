import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon, CogIcon, AdjustmentsIcon } from "@heroicons/react/outline";
import Link from "next/link";

import navLinks from "../../../constants/navLinks";
import MobileMenuNavLink from "./MobileMenuNavLink";
import UserActionItem from "./UserActionItem";
import { useAuth } from "@clerk/nextjs";

type MobileMenuPros = {
  isOpen: boolean;
  dismiss: () => void;
};

const MobileMenu = ({ isOpen, dismiss }: MobileMenuPros) => {
  const { signOut } = useAuth();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={dismiss}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-xs">
                <div className="flex h-full flex-col overflow-y-scroll bg-gray-700 py-6 shadow-xl">
                  <div className="px-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-50">
                        Vette Tracker
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="focus:ring-white-500 rounded-md bg-gray-700 text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2"
                          onClick={dismiss}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-8 flex-1 px-6 sm:px-6">
                    <div className="border-b border-gray-500 pb-6">
                      <nav>
                        <ul className="flex flex-col">
                          {navLinks.map((link) => (
                            <li key={link.path}>
                              <MobileMenuNavLink href={link.path}>
                                {link.linkName}
                              </MobileMenuNavLink>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                    <div className="py-4">
                      <ul>
                        <UserActionItem
                          as={Link}
                          href="/user-profile"
                          icon={AdjustmentsIcon}
                          text="View Profile"
                        />
                        <UserActionItem
                          icon={CogIcon}
                          text="Logout"
                          onClick={() => signOut()}
                        />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileMenu;
