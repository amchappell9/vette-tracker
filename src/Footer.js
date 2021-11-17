import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-700 px-16 py-8">
      <div className="block text-right">
        <span className="text-white text-xl font-bold">
          Made by{" "}
          <a href="/github" className="text-red-500">
            Austin Chappell
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
