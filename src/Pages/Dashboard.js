import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import { useTemplates } from "../Context/templates.context";
import BulkEmails from "./BulkEmails";

const Dashboard = () => {
  const navigate = useNavigate();
  // const { templates } = useTemplates();

  const handleLogout = () => {
    instance
      .get("/logout")
      .then((response) => {
        toast.warn(response.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
      });
  };

  return (
    <>
      <div className="m-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a href="/" className="navbar-brand">
              MailMegaPro
            </a>

            <div className="navbar-nav"></div>
            <div className="navbar-nav ms-auto  rounded-3 ">
              <button
                className=" nav-link text-light bg-danger rounded-2 p-1 "
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="m-3 text-center  bg-light border-black">
        <BulkEmails />
      </div>

      <ToastContainer />
    </>
  );
};

export default Dashboard;
