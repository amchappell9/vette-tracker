import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../vetteFlagLogo-dark.svg";
import Footer from "../../Footer";

const UnauthPage = ({ children }) => {
  return (
    <div className="flex min-h-full flex-col">
      <header>
        <div className="mx-auto max-w-full py-6 sm:px-6 md:px-8 lg:px-16">
          <div className="flex items-center justify-between px-4 sm:px-0">
            {/* Logo */}
            <Link to="/">
              <div className="flex">
                <Logo />
                <div className="ml-6 flex items-center">
                  <span className="text-grey-700 text-xl font-bold">
                    Vette Tracker
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto h-full max-w-7xl px-6 py-12 lg:px-8">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UnauthPage;
