type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps): JSX.Element => {
  return (
    <div className="mt-4 w-full rounded bg-white px-8 py-8 drop-shadow-lg sm:px-16">
      {children}
    </div>
  );
};

export default Card;
