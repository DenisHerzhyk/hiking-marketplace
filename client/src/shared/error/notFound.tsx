import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-[150px] px-6 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>

      <p className="text-lg text-gray-500 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="px-5 py-2 bg-white border border-stone-300 text-stone-700 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
