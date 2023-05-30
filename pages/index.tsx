import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import Logo from "@/components/Logo/Logo";

export default function Home() {
  return (
    <div className="bg-gray-700">
      <Head>
        <title>Vette Tracker</title>
      </Head>
      <header>
        <div className="mx-auto max-w-full py-6 sm:px-6 md:px-8 lg:px-16">
          <div className="flex items-center justify-between px-4 sm:px-0">
            <Link href="/" className="relative">
              <Logo
                variant="inverted"
                className="h-8 w-full object-cover sm:h-10"
              />
            </Link>
          </div>
        </div>
      </header>
      <section className="mb-20 px-8 pt-20 text-center">
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
          {/* <a
            className="duration-20 inline-block rounded bg-red-500 px-8 py-4 text-2xl font-bold text-white drop-shadow-md transition hover:-translate-y-0.5 hover:drop-shadow-lg active:translate-y-px active:bg-red-600 active:drop-shadow active:duration-75"
            href="/api/auth/login"
          >
            Get Started
          </a> */}
          <Link href={"/sign-in"}>Get Started</Link>
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
}

type FeatureCardProps = {
  title: string;
  description: string;
};

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <div className="max-w-[400px] flex-1 bg-gray-300 py-8 px-2 sm:px-4">
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-red-500"></div>
      </div>
      <div className="mt-4 px-4 text-center">
        <span className="text-2xl font-bold text-gray-800 lg:text-3xl">
          {title}
        </span>
      </div>
      <div className="mt-2 px-4 text-center">
        <span className="text-lg text-gray-900 lg:text-xl ">{description}</span>
      </div>
    </div>
  );
};
