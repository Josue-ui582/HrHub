import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-7xl font-bold text-red-500">404</h1>

      <p className="mt-4 text-2xl font-semibold text-gray-800">
        Page introuvable
      </p>

      <p className="mt-2 text-gray-600 text-center max-w-md">
        La page que vous recherchez n’existe pas ou a été déplacée.
        Vérifiez l’URL ou retournez vers une page valide.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          to="/login"
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Se connecter
        </Link>

        <Link
          to="/dashboard"
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 transition"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
