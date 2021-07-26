import React from "react";

const FeatureCard = ({ title, description }) => {
  return (
    <div className="w-96 bg-gray-300 py-8">
      <div className="flex justify-center">
        <div className="h-16 w-16 bg-red-500 rounded-full"></div>
      </div>
      <div className="text-center mt-4 px-4">
        <span className="font-bold text-gray-800 text-3xl">{title}</span>
      </div>
      <div className="text-center mt-2 px-4">
        <span className="text-xl text-gray-900 ">{description}</span>
      </div>
    </div>
  );
};

export default FeatureCard;
