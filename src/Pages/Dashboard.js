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
    <>
      <div className="m-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
      <div className=" d-flex justify-content-center m-4">
        <div className="m-3 text-center bg-light border-black p-3 rounded-3">
          <MailingLists updateList={handleUpdateList} />
        </div>
        <div className="m-3 text-center bg-light border-black rounded-3">
          <BulkEmails
            userList={list}
            template={template}
            handleClear={handleClear}
          />
        </div>
        <div className="m-3 text-center bg-light border-black rounded-3">
          <TemplatesList handleTemplate={handleTemplate} />
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Dashboard;
