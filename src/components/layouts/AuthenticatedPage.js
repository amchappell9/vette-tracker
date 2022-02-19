import React, { useState, useEffect, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";

import { ReactComponent as Logo } from "../../vetteFlagLogo.svg";
import navLinks from "../../constants/navLinks";
import { ArrowLeftIcon, MenuIcon, CogIcon } from "@heroicons/react/outline";
import MobileMenu from "./MobileMenu";
import Footer from "../../Footer";
import Card from "../Card";

const AuthenticatedPage = ({
  children,
  title,
  linkText,
  linkConfig,
  linkIcon,
  backLinkText,
  backLinkConfig,
  handleLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* Title State + Logic */
  const [titleState, setTitleState] = useState(title || "");

  useEffect(() => {
    setTitleState(title);
  }, [title]);

  /* Link State + Logic */
  const [linkTextState, setlinkTextState] = useState(linkText || "");
  const [linkConfigState, setLinkConfigState] = useState(linkConfig || {});
  const [linkIconState, setLinkIconState] = useState(linkIcon || null);

  useEffect(() => {
    setlinkTextState(linkText);
  }, [linkText]);

  useEffect(() => {
    setLinkConfigState(linkConfig);
  }, [linkConfig]);

  useEffect(() => {
    setLinkIconState(linkIcon);
  }, [linkIcon]);

  /* Back link State + Logic  */
  const [backLinkTextState, setBackLinkTextState] = useState(
    backLinkText || ""
  );

  const [backLinkConfigState, setBackLinkConfigState] = useState(
    backLinkConfig || {}
  );

  // Do I really need a useEffect function to update each property? Feels like there
  // should be a way to condense things
  useEffect(() => {
    setBackLinkTextState(backLinkText);
  }, [backLinkText]);

  useEffect(() => {
    setBackLinkConfigState(backLinkConfig);
  }, [backLinkConfig]);

  // Pass setter functions to child component as props
  // Not sure if this maintains props that were orginally passed
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        setTitle: setTitleState,
        setlinkText: setlinkTextState,
        setLinkConfig: setLinkConfigState,
        setLinkIcon: setLinkIconState,
        setBackLinkText: setBackLinkTextState,
        setBackLinkConfig: setBackLinkConfigState,
      });
    }

    return child;
  });

  return (
    <div className="flex h-full flex-col">
      <MobileMenu
        isOpen={mobileMenuOpen}
        dismiss={() => setMobileMenuOpen(false)}
        handleLogout={handleLogout}
      />
      {/* Header */}
      <div className="bg-gray-700 px-4 pb-32 sm:px-6 md:px-8">
        <header className="mx-auto flex max-w-7xl items-center border-b border-gray-600 py-4 pt-6">
          {/* Logo */}
          <div className="flex-1">
            <Link to="/" className="flex w-max items-center">
              <Logo />
              <div className="ml-6">
                <span className="text-xl font-bold text-gray-50">
                  Vette Tracker
                </span>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="hidden gap-[clamp(1rem,_10vw_-_5.5rem,_3rem)] lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                // Since activeClassName appends to the base className instead of replacing entirely, a custom class is needed to avoid
                // conflict with the hover styles.
                // activeClassName="bg-red-500 text-white px-3 py-2 rounded-md font-medium hover:bg-red-500"
                activeClassName="main-nav-active"
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
                        onClick={handleLogout}
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
          {backLinkTextState && backLinkConfigState && (
            <div className="mx-auto mb-4 max-w-7xl">
              <Link
                to={backLinkConfigState}
                className="text-gray-300 hover:underline"
              >
                <ArrowLeftIcon className="mr-1 inline h-5 w-5 align-text-bottom" />
                {backLinkTextState}
              </Link>
            </div>
          )}

          <div className="flex max-w-7xl flex-col gap-4 sm:mx-auto sm:flex-row sm:justify-between">
            {/* Title + Button */}
            <h1 className="text-3xl font-bold text-white">{titleState}</h1>
            {linkTextState && linkConfigState && (
              <Link
                to={linkConfigState}
                className="inline-flex items-center justify-center rounded bg-red-500 px-4 py-2 text-white disabled:opacity-50"
              >
                {linkIconState}
                {linkTextState}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 px-4 sm:px-6 md:px-8">
        <main className="mx-auto -mt-32 max-w-7xl pb-8">
          <Card>{childrenWithProps}</Card>
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
