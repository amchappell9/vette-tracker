import React from "react";
import FeatureCard from "./FeatureCard";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-700">
      <section className="text-center pt-40 mb-20">
        <h1 className="text-white text-7xl font-bold pb-6">
          Looking for a new Vette?
        </h1>
        <div className="block">
          <span className="inline-block max-w-xl text-gray-200 text-2xl pb-6">
            <span className="text-red-500 font-bold">Vette Tracker</span> helps
            you track Vette prices over time, helping you find the best deals.
          </span>
        </div>
        <div className="block mt-6">
          <Link
            to="/sign-in"
            className="px-8 py-4 font-bold text-2xl shadow-md bg-red-500 hover:bg-red-600 text-white rounded"
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
      <section className="flex justify-between bg-white px-40 py-48">
        <FeatureCard
          title="Track Vettes"
          description="Find Vettes from local listings and add them to your list of Vettes to track."
        />
        <FeatureCard
          title="Analyze Trends"
          description="Spot pricing trends using our analytics tools!"
        />
        <FeatureCard
          title="Find Deals"
          description="Follow trends over time to find the best deals!"
        />
      </section>
    </div>
  );
};

export default Home;
