import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import navLinks from "@/constants/navLinks";
import { ArrowLeftIcon, MenuIcon, CogIcon } from "@heroicons/react/outline";
import MobileMenu from "../MobileMenu";
import Footer from "@/components/Footer";
import Card from "../../Card";
import Logo from "../../Logo/Logo";
import { CardPaddingVariants } from "../../Card/Card";
import Link from "next/link";
import NavLink from "@/components/NavLink";

/**
 * The type of arguments that a Link's 'to' prop takes. Weirdly I couldn't find an
 * official definition anywhere. I think this one has a problem with the state as
 * autocomplete isn't working
 */
type LinkConfig<StateObj> =
  | string
  | {
      pathname?: string;
      search?: string;
      hash?: string;
      state?: StateObj;
    };

/**
 * Type used in setting of Header Info. Title is always required. LinkText,
 * linkConfig, and LinkIcon are required together. BackLinkText and BackLinkConfig are
 * required together.
 */
export type HeaderInfoObject<StateObj = {}> =
  | {
      title: string;
      linkText?: never;
      linkConfig?: never;
      linkIcon?: never;
      backLinkText?: never;
      backLinkConfig?: never;
    }
  | {
      title: string;
      linkText: string;
      linkConfig: LinkConfig<StateObj>;
      linkIcon: React.ReactNode;
      backLinkText?: never;
      backLinkConfig?: never;
    }
  | {
      title: string;
      linkText?: never;
      linkConfig?: never;
      linkIcon?: never;
      backLinkText: string;
      backLinkConfig: string;
    }
  | {
      title: string;
      linkText: string;
      linkConfig: LinkConfig<StateObj>;
      linkIcon: React.ReactNode;
      backLinkText: string;
      backLinkConfig: string;
    };

type AuthenticatedPageProps = {
  children: React.ReactNode;
  cardPadding?: CardPaddingVariants;
};

const AuthenticatedPage = ({
  children,
  cardPadding,
}: AuthenticatedPageProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerInfo, setHeaderInfo] = useState<HeaderInfoObject>({ title: "" });

  // Pass the setHeader function to child component as a prop so that any children component can update the header
  // Not sure if this maintains props that were orginally passed
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, { setHeaderInfo });
    }

    return child;
  });

  return (
    <div className="flex h-full flex-col">
      <MobileMenu
        isOpen={mobileMenuOpen}
        dismiss={() => setMobileMenuOpen(false)}
      />
      {/* Header */}
      <div className="bg-gray-700 px-4 pb-32 sm:px-6 md:px-8">
        <header className="mx-auto flex max-w-7xl items-center border-b border-gray-600 py-4 pt-6">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/" className="relative">
              <Logo
                variant="inverted"
                className="h-8 w-full object-cover sm:h-10"
              />
            </Link>
          </div>

          {/* Nav */}
          <nav className="hidden gap-[clamp(1rem,_10vw_-_5.5rem,_3rem)] lg:flex">
            {navLinks.map((link) => (
              <NavLink
                href={link.path}
                key={link.path}
                className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                activeClassName="bg-red-500 text-white px-3 py-2 rounded-md font-medium hover:bg-red-500"
              >
                {link.linkName}
              </NavLink>
            ))}
          </nav>

          {/* Logout / Mobile Menu Button */}
          <div className="flex justify-end gap-4 sm:flex-1">
            {/* Desktop Logout Button */}
            <Menu as="div" className="relative ml-3 hidden lg:block">
              <div>
                <Menu.Button className="flex h-10 w-10 max-w-xs items-center justify-center rounded-full bg-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <CogIcon className="h-6 w-6 text-gray-400" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="ring-black absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`block w-full rounded-md border-2 border-white px-4 py-1 ${
                          active
                            ? "border-2 border-gray-900 bg-gray-500 text-white"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="block -translate-y-px">Logout</span>
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 lg:hidden"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="pt-6">
          {/* Back Link */}
          {headerInfo &&
            headerInfo.backLinkText &&
            headerInfo.backLinkConfig && (
              <div className="mx-auto mb-4 max-w-7xl">
                {/* <Link
                  to={headerInfo.backLinkConfig}
                  className="text-gray-300 hover:underline"
                >
                  <ArrowLeftIcon className="mr-1 inline h-5 w-5 align-text-bottom" />
                  {headerInfo.backLinkText}
                </Link> */}
              </div>
            )}

          <div className="flex max-w-7xl flex-col gap-4 sm:mx-auto sm:flex-row sm:justify-between">
            {/* Title + Button */}
            <h1 className="text-3xl font-bold text-white">
              {headerInfo.title}
            </h1>
            {headerInfo.linkText && headerInfo.linkConfig && (
              // <Link
              //   to={headerInfo.linkConfig}
              //   className="inline-flex items-center justify-center rounded bg-red-500 px-4 py-2 text-white shadow-md transition-colors hover:bg-red-600 disabled:opacity-50"
              // >
              //   {headerInfo.linkIcon}
              //   {headerInfo.linkText}
              // </Link>
              <></>
            )}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 px-4 sm:px-6 md:px-8">
        <main className="mx-auto -mt-32 max-w-7xl pb-8">
          <Card padding={cardPadding}>{childrenWithProps}</Card>
        </main>
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthenticatedPage;
