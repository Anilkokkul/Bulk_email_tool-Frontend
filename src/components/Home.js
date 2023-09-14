import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="text-center m-0">
        <div className="m-4">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a href="/" className="navbar-brand">
                MailMegaPro
              </a>
              <div className="navbar-nav"></div>
              <div className="navbar-nav ms-auto  rounded-3 ">
                <Link
                  to="/login"
                  className="nav-link text-light bg-success rounded-2 p-1"
                >
                  Login
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Home;
