import FeatureCard from "../FeatureCard";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";

const Home = () => {
  return (
    <div className="bg-gray-700">
      <section className="mb-20 px-8 pt-40 text-center">
        <h1 className="pb-6 text-[clamp(_3rem,_4.8vw_+_1rem,_4.5rem)] font-bold leading-none text-white">
          Looking for a new Vette?
        </h1>
        <div className="mx-auto max-w-xl">
          <span className="inline-block pb-6 text-xl text-gray-200 sm:text-2xl">
            <span className="font-bold text-red-500">Vette Tracker</span> helps
            you track Vette prices over time, helping you find the best deals.
          </span>
        </div>
        <div className="mt-6 block">
          <Link
            to="/sign-in"
            className="inline-block rounded bg-red-500 px-8 py-4 text-2xl font-bold text-white drop-shadow-md transition duration-200 hover:-translate-y-0.5 hover:drop-shadow-lg active:translate-y-px active:bg-red-600 active:drop-shadow active:duration-75"
          >
            <span className="inline-block -translate-y-px">Get Started</span>
          </Link>
        </div>
      </section>
      <section className="flex h-64 justify-between overflow-x-hidden bg-gray-700">
        <div className="home-triangle-left border-gray-400"></div>
        <div className="home-triangle-right inline border-red-500"></div>
      </section>
      <section className="-mt-32 h-32 bg-white"></section>
      <section className="flex flex-col items-center gap-8 bg-white px-16 py-24 lg:flex-row lg:items-stretch lg:justify-between lg:py-48 xl:px-40">
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
      <Footer />
    </div>
  );
};

export default Home;
