import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff4f8] text-center p-6">
      <h1 className="text-6xl font-bold text-[#f46b44] mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-[#f99db7] text-white rounded-md shadow hover:bg-[#ff5c8b] transition-all"
      >
        Go back home
      </Link>
    </div>
  );
};
