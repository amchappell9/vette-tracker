import React from "react";

const Footer = () => {
  return (
    // <footer className="bg-gray-700 px-16 py-8">
    //   <div className="block text-right">
    //     <span className="text-white text-xl font-bold">
    //       Made by{" "}
    //       <a href="/github" className="text-red-500">
    //         Austin Chappell
    //       </a>
    //     </span>
    //   </div>
    // </footer>
    <footer className="bg-gray-700 py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex">
        <span className="ml-auto text-white text-xl font-bold">
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
