import React, { useRef, useState, useLayoutEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../vetteFlagLogo-dark.svg";
import Footer from "../../Footer";

const UnauthPage = ({ children }) => {
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

  return (
    <div>
      <div ref={headerRef} className="">
        <Disclosure as="nav" className="">
          {() => (
            <>
              <div className="max-w-full mx-auto py-4 sm:px-6 md:px-8 lg:px-16">
                <div className="border-b border-gray-100">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                    <div className="flex items-center">
                      {/* Logo */}
                      <div className="flex-shrink-0">
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
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
      </div>

      <main
        style={{
          minHeight: `calc(100vh - (${headerDimensions.height}px + ${footerDimensions.height}px) + 36px)`,
        }}
      >
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <Footer ref={footerRef} />
    </div>
  );
};

export default UnauthPage;
