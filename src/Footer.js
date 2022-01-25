import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-700 py-8 px-4 sm:px-6 md:px-8">
      <div className="mx-auto flex max-w-7xl">
        <span className="ml-auto text-xl font-bold text-white">
          Made by{" "}
          <a href="https://github.com/amchappell9" className="text-red-500">
            Austin Chappell{" "}
          </a>{" "}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
