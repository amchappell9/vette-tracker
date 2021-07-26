export default function Card({ children }) {
  return (
    <div className="rounded bg-white w-full shadow-lg mt-4 px-16 pt-6 pb-8">
      {children}
    </div>
  );
}
