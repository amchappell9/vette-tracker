import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import { ReactComponent as Logo } from "../../vetteFlagLogo.svg";
import navLinks from "../../constants/navLinks";
import { ArrowLeftIcon, MenuIcon } from "@heroicons/react/outline";
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

  // Dynamically calculate the min height of main so that the footer is at the bottom of the page unless there's enough
  // content to push it under the fold
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const [headerDimensions, setHeaderDimensions] = useState({
    height: 0,
  });
  const [footerDimensions, setFooterDimensions] = useState({
    height: 0,
  });

  // Set header and footer heights. Dependent on title as recalculation is needed when going from page with title to page without, and vice versa.
  useLayoutEffect(() => {
    if (headerRef.current) {
      setHeaderDimensions({
        height: headerRef.current.offsetHeight,
      });
    }

    if (footerRef.current) {
      setFooterDimensions({
        height: footerRef.current.offsetHeight,
      });
    }
  }, [titleState]);

  return (
    <>
      <MobileMenu
        isOpen={mobileMenuOpen}
        dismiss={() => setMobileMenuOpen(false)}
      />
      {/* Header */}
      <div ref={headerRef} className="bg-gray-700 pb-32 px-4 sm:px-6 md:px-8">
        <header className="max-w-7xl mx-auto py-4 pt-6 border-b border-gray-600 flex">
          {/* Logo */}
          <div className="flex-1">
            <Link to="/" className="flex items-center">
              <Logo />
              <div className="ml-6">
                <span className="text-gray-50 text-xl font-bold">
                  Vette Tracker
                </span>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex gap-[clamp(1rem,_10vw_-_5.5rem,_3rem)]">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
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
          </nav>

          {/* Mobile Menu Button */}
          <div className="sm:flex-1 flex justify-end align-baseline">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden inline-flex items-center justify-center p-2 -mr-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="pt-6">
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

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between max-w-7xl sm:mx-auto">
            {/* Title + Button */}
            <h1 className="text-3xl font-bold text-white">{titleState}</h1>
            {linkTextState && linkConfigState && (
              <Link
                to={linkConfigState}
                className="inline-flex items-center justify-center px-4 py-2 text-white bg-red-500 rounded disabled:opacity-50"
              >
                {linkIconState}
                {linkTextState}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          minHeight: `calc(100vh - (${headerDimensions.height}px + ${footerDimensions.height}px) + 7rem)`,
        }}
        className="px-4 sm:px-6 md:px-8"
      >
        <main className="max-w-7xl mx-auto -mt-32 pb-8">
          <Card>{childrenWithProps}</Card>
        </main>
      </div>

      {/* Footer */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
};

export default AuthenticatedPage;
