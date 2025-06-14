import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
        <p className="text-xl font-medium text-gray-700 mb-2">
          Oops! Page not found.
        </p>
        <p className="text-gray-600 mb-6">
          The page <code>{location.pathname}</code> does not exist.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
