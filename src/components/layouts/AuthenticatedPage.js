import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { Link, NavLink } from "react-router-dom";

import { ReactComponent as Logo } from "../../vetteFlagLogo.svg";
import Footer from "../../Footer";
import navLinks from "../../constants/navLinks";

/**
 * Displays child content in a card overlapped with a dark background.
 */
function AuthenticatedPage({
  children,
  title,
  linkText,
  linkConfig,
  linkIcon,
  backLinkText,
  backLinkConfig,
}) {
  // Dynamically calculate the min height of main so that the footer is at the bottom of the page unless there's enough
  // content to push it under the fold
  const headerRef = useRef();
  const footerRef = useRef();
  const [headerDimensions, setHeaderDimensions] = useState({
    height: 0,
  });
  const [footerDimensions, setFooterDimensions] = useState({
    height: 0,
  });

  useLayoutEffect(() => {
    if (headerRef.current) {
      setHeaderDimensions({
        height: headerRef.current.offsetHeight,
      });
    }

    if (footerRef.current) {
      setFooterDimensions({
        height: headerRef.current.offsetHeight,
      });
    }
  }, []);

  // Provide children components functions to set title and link button properties

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
    <div>
      <div ref={headerRef} className="bg-gray-700 pb-32">
        <Disclosure as="nav" className="bg-gray-700">
          {({ open }) => (
            <>
              <div className="max-w-full mx-auto py-4 sm:px-6 md:px-8 lg:px-16">
                <div className="border-b border-gray-700">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                    <div className="flex items-center">
                      {/* Logo */}
                      <div className="flex-shrink-0">
                        <Link to="/">
                          <div className="flex">
                            <Logo />
                            <div className="ml-6 flex items-center">
                              <span className="text-gray-50 text-xl font-bold">
                                Vette Tracker
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>

                      {/* Large Viewport Nav items */}
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navLinks.map((link) => (
                            <NavLink
                              to={link.path}
                              className="text-gray-300 text-lg hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
                              // Since activeClassName appends to the base className instead of replacing entirely, a custom class is needed to avoid
                              // conflict with the hover styles.
                              // activeClassName="bg-red-500 text-white px-3 py-2 rounded-md font-medium hover:bg-red-500"
                              activeClassName="main-nav-active"
                            >
                              {link.linkName}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        {/* Notification Button */}
                        {/* <button className="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button> */}

                        {/* Profile dropdown */}
                        {/* <Menu as="div" className="ml-3 relative">
                          {({ open }) => (
                            <>
                              <div>
                                <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                  <span className="sr-only">
                                    Open user menu
                                  </span>
                                  <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                  />
                                </Menu.Button>
                              </div>
                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items
                                  static
                                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                  {profile.map((item) => (
                                    <Menu.Item key={item}>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700"
                                          )}
                                        >
                                          {item}
                                        </a>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </>
                          )}
                        </Menu> */}
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                <div className="px-2 py-3 space-y-1 sm:px-3">
                  {/* Mobile Menu Nav Links */}
                  {navLinks.map((link) => (
                    <NavLink
                      to={link.path}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      activeClassName="bg-red-500 text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {link.linkName}
                    </NavLink>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  {/* Mobile Menu Profile Info + Notifications */}
                  {/* <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        Tom Cook
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        tom@example.com
                      </div>
                    </div>
                    <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div> */}

                  {/* Mobile Menu Profile Links */}
                  {/* <div className="mt-3 px-2 space-y-1">
                    {profile.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item}
                      </a>
                    ))}
                  </div> */}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header
          className={
            backLinkTextState && backLinkConfigState ? "pb-4" : "pt-10 pb-4"
          }
        >
          {/* Back Link */}
          {backLinkTextState && backLinkConfigState && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-gray-300 hover:underline mb-4">
                <Link to={backLinkConfigState}>
                  <ArrowLeftIcon className="inline align-text-bottom mr-1 w-5 h-5" />
                  {backLinkTextState}
                </Link>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
            {/* Title + Button */}
            <h1 className="text-3xl font-bold text-white">{titleState}</h1>
            {linkTextState && linkConfigState && (
              <Link
                to={linkConfigState}
                className="px-4 py-2 text-white bg-red-500 rounded disabled:opacity-50"
              >
                {linkIconState}
                {linkTextState}
              </Link>
            )}
          </div>
        </header>
      </div>

      <main
        style={{
          minHeight: `calc(100vh - (${headerDimensions.height}px + ${footerDimensions.height}px) + 36px)`,
        }}
        className="-mt-32 "
      >
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="rounded bg-white w-full shadow-lg h-full">
            {childrenWithProps}
          </div>
        </div>
      </main>

      <Footer ref={footerRef} />
    </div>
  );
}

// AuthenticatedPage.propTypes = {
//   children: PropTypes.element.isRequired,
//   title: PropTypes.string,
// };

export default AuthenticatedPage;
