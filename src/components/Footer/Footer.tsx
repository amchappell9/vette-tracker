const Footer = () => {
  return (
    <footer className="bg-gray-700 px-4 py-8 sm:px-6 md:px-8">
      <div className="mx-auto flex max-w-7xl">
        <span className="ml-auto text-xl font-bold text-white">
          Made by{" "}
          <a
            href="https://github.com/amchappell9"
            className="text-red-500 transition-colors hover:text-red-600"
          >
            Austin Chappell
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
