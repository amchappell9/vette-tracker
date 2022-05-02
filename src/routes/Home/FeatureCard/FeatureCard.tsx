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

export default FeatureCard;
