import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/feed");
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center text-center min-h-[80vh] p-5 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <h1 className="text-4xl sm:text-5xl font-bold mb-5">Welcome to DevTinder</h1>
      <p className="text-lg sm:text-xl mb-8 max-w-xl">
        Connect. Collaborate. Grow with fellow developers.
      </p>

      <div className="flex gap-4">
      
        <Link to="/login">
          <button className="btn btn-outline btn-sm sm:btn-md border-white text-white hover:bg-white hover:text-black">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
