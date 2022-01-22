export default function Card({ children }) {
  return (
    <div className="w-full px-16 py-8 mt-4 bg-white rounded shadow-lg">
      {children}
    </div>
  );
}
