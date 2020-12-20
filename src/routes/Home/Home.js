import React from "react";
import FeatureCard from "./FeatureCard";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="text-center pt-40 mb-20">
        <h1 className="text-white text-8xl font-bold pb-6">
          Looking for a new Vette?
        </h1>
        <div className="block">
          <span className="inline-block max-w-3xl text-gray-200 text-3xl pb-8">
            <span className="text-red-500 font-bold">Vette Tracker</span> helps
            you track Vette prices over time, allowing you to find the best
            deals.
          </span>
        </div>
        <div className="block mt-4">
          <Link
            to="/sign-in"
            className="px-12 py-6 font-bold text-3xl shadow-md bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Get Started
          </Link>
        </div>
      </section>
      <section className="h-64 bg-gray-700 flex justify-between overflow-x-hidden">
        <div className="home-triangle-left border-gray-400 "></div>
        <div className="home-triangle-right border-red-500 inline"></div>
      </section>
      <section className="h-32 bg-white -mt-32"></section>
      <section className="flex justify-between bg-white px-96 py-32">
        <FeatureCard
          title="Helps You Do This"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac nisl eget quam pellentesque imperdiet sed eget magna. "
        />
        <FeatureCard
          title="And This"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac nisl eget quam pellentesque imperdiet sed eget magna. "
        />
        <FeatureCard
          title="And This Too!"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac nisl eget quam pellentesque imperdiet sed eget magna. "
        />
      </section>
    </>
  );
};

export default Home;
