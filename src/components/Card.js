export default function Card({ children }) {
  return (
    <div className="rounded bg-white w-full shadow-lg mt-4 px-16 py-8">
      {children}
    </div>
  );
}
