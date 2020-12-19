import React from "react";

const Home = () => {
  return (
    <>
      <section className="text-center pt-40 mb-20">
        <h1 className="text-white text-8xl font-bold pb-6">
          Looking for a new Vette?
        </h1>
        <span className="inline-block max-w-3xl text-gray-200 text-3xl pb-8">
          Vette Tracker helps you track Vette prices over time, allowing you to
          find the best deals.
        </span>
        <br />
        <button className="px-12 py-6 bg-red-600 hover:bg-red-700 text-white font-bold text-3xl shadow-md">
          Get Started
        </button>
      </section>
      <section className="h-64 bg-gray-700 flex justify-between">
        <div className="home-triangle-left border-gray-200 "></div>
        <div className="home-triangle-right border-red-500 inline"></div>
      </section>
      <section className="h-32 bg-white -mt-32"></section>
      <section className="bg-white h-96"></section>
    </>
  );
};

export default Home;
