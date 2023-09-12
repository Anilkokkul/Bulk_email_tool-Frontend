import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="text-center m-3">
        <Link to={"/login"} className="btn btn-outline-danger">
          Go to Login page
        </Link>
      </div>
    </>
  );
};

export default Home;
