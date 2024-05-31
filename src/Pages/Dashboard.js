import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import MailingLists from "../components/MailingLists";
import { useState } from "react";
// import { useTemplates } from "../Context/templates.context";
import BulkEmails from "./BulkEmails";
import TemplatesList from "../components/Templates";

const Dashboard = () => {
  const navigate = useNavigate();
  // const { templates } = useTemplates();
  const [list, setList] = useState([]);
  const [template, setTemplate] = useState({});

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

  const handleUpdateList = (list) => {
    setList(list);
  };
  const handleClear = () => {
    setList([]);
    setTemplate({});
  };

  const handleTemplate = (template) => {
    setTemplate(template);
  };

  return (
    <div className="p-3">
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3 rounded">
          <div className="container-fluid">
            <a href="/" className="navbar-brand fw-bolder">
              MailMegaPro
            </a>

            <div className="navbar-nav"></div>
            <div className="navbar-nav ms-auto rounded-3 ">
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
      <div className="d-md-flex justify-content-center gap-3 px-3">
        <div className=" text-center bg-light border-black p-3 rounded-3 col-xl-3  col-md-4">
          <MailingLists updateList={handleUpdateList} />
        </div>
        <div className=" text-center bg-light border-black rounded-3 col-xl-6 col-md-6">
          <BulkEmails
            userList={list}
            template={template}
            handleClear={handleClear}
          />
        </div>
        <div className="text-center bg-light border-black rounded-3 col-xl-3 col-md-4">
          <TemplatesList handleTemplate={handleTemplate} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
