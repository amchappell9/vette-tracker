import React from "react";
import PropTypes from "prop-types";

function Page({ children, title }) {
  return (
    <div className="min-main-height flex justify-center">
      <div className="max-w-4xl w-full -mt-32 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">{title}</h1>
          <div className="text-right">
            {/* <Link
              to="/add-vette"
              className="px-4 py-2 text-white bg-red-500 rounded"
            >
              <PlusIcon className="inline w-5 h-5 mr-1 align-text-bottom" />
              Add Vette
            </Link> */}
            {/* Need to figure out how to dynamically add links */}
          </div>
        </div>
        <div className="rounded bg-white w-full shadow-lg mt-4">{children}</div>
      </div>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};

export default Page;
