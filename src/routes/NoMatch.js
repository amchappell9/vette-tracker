import React from "react";

const NoMatch = () => {
  return (
    <div className="min-main-height flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">Page Not Found</h1>
        <p className="text-2xl mt-4">
          The page you are looking for is not found.
        </p>
      </div>
    </div>
  );
};

export default NoMatch;
