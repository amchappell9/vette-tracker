import Logo from "../Logo/Logo";

const Loading = () => {
  return (
    <div className="flex h-full items-center justify-center ">
      <div className="p-24">
        <Logo variant="icon" className="h-24" />
      </div>
    </div>
  );
};

export default Loading;
