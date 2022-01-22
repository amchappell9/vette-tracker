import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";

import navLinks from "../../constants/navLinks";

const MobileMenu = ({ isOpen, dismiss }) => {
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

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
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
                <div className="h-full flex flex-col py-6 bg-gray-700 shadow-xl overflow-y-scroll">
                  <div className="px-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-50">
                        Vette Tracker
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-gray-700 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500"
                          onClick={dismiss}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 relative flex-1 px-6 sm:px-6">
                    <nav className="flex flex-col gap-4">
                      {navLinks.map((link) => (
                        <NavLink
                          key={link.path}
                          to={link.path}
                          className="text-gray-50 rounded-md py-2 px-2 -my-2 -ml-2  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500"
                          // Since activeClassName appends to the base className instead of replacing entirely, a custom class is needed to avoid
                          // conflict with the hover styles.
                          // activeClassName="bg-red-500 text-white px-3 py-2 rounded-md font-medium hover:bg-red-500"
                          activeClassName="mobile-nav-active"
                        >
                          {link.linkName}
                        </NavLink>
                      ))}
                    </nav>
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