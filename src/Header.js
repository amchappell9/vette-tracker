import React from "react";
// import logo from './vette-logo.jpg';
import { NavLink, Link, useLocation } from "react-router-dom";

/**
 * This is a pain in the ass and needs to be refactored
 * @param {*} path
 * @returns
 */
const getStylesByPath = (path) => {
  let styles = "";
  let pathname = path;

  if (pathname.indexOf("/vettes/") !== -1) {
    pathname = "/vettes/";
  }

  switch (pathname) {
    case "/vettes":
    case "/add-vette":
    case "/vettes/":
      styles = "pt-6 pb-48 px-16";
      break;

    default:
      styles = "px-16 py-4";
      break;
  }

  return styles;
};

const shouldShowNav = (path) => {
  switch (path) {
    case "/":
    case "/sign-in":
    case "/sign-up":
      return false;

    default:
      return true;
  }
};

const navLinks = [
  { linkName: "Vettes", path: "/vettes" },
  { linkName: "Trends", path: "/trends" },
  { linkName: "Resources", path: "/resources" },
];

const Header = ({ isAuthenticated, handleLogout }) => {
  let location = useLocation();
  let showNavigation = shouldShowNav(location.pathname);
  const headerStyles = getStylesByPath(location.pathname);

  if (showNavigation) {
    return (
      <header
        className={`${headerStyles} grid grid-cols-12 gap-4 bg-gray-700 pb`}
      >
        <div>
          <Link to="/" className="block h-16 w-24 bg-red-500"></Link>
        </div>
        <nav className="col-span-3 pt-3 pl-6">
          <ul>
            {navLinks.map((link) => (
              <li className="inline" key={link.path}>
                <NavLink
                  to={link.path}
                  className="px-4 py-2 mr-4 text-xl text-gray-50 hover:bg-gray-800 hover:rounded"
                  activeClassName="bg-gray-800 rounded"
                >
                  {link.linkName}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <hr className="border-gray-600 col-span-12" />
      </header>
    );
  } else {
    return (
      <header className="px-16 py-4">
        <div>
          <Link to="/" className="block h-16 w-24 bg-red-500"></Link>
        </div>
      </header>
    );
  }
};

export default Header;
