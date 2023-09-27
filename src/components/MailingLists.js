import React from "react";
import { useState, useEffect } from "react";
import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const MailingLists = (props) => {
  const [mailingLists, setMailingLists] = useState([]);
  const [name, setName] = useState("");
  const [emails, setEmails] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get("/mailing-list")
      .then((response) => {
        setMailingLists(response.data.Mailing_List);
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        toast.warn(errorMessage, {
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      });
  }, []);

  const handleDelete = (id) => {
    instance
      .delete(`/mailing-list/${id}`)
      .then((response) => {
        console.log(response);
        const updatedMailingLists = mailingLists.filter(
          (list) => list._id !== id
        );
        setMailingLists(updatedMailingLists);
        toast.info(response.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
      })
      .catch((error) => {
        console.log("Error deleting mailing list:", error);
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
      });
  };

  const createMailingList = () => {
    instance
      .post("/mailing-list", { name, emails: emails.split(",") })
      .then((response) => {
        setMailingLists([...mailingLists, response.data.Mailing_List]);
        setName("");
        setEmails("");
        toast.info(response.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
      });
  };

  return (
    <div>
      <h2>Campaigns</h2>
      <div>
        <input
          className=" form-control mb-2 "
          type="text"
          placeholder="Create new campaign"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className=" form-control"
          type="text"
          placeholder="Emails (comma-separated)"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
        />
        <button onClick={createMailingList} className="btn btn-success m-3 ">
          Create
        </button>
      </div>
      <h3>Campaign Lists</h3>
      <ul className="list-group">
        {mailingLists &&
          mailingLists.map((list) => (
            <li key={list._id} className="list-group-item ">
              <b>{list.name}</b> - {list.emails.join(",")}
              <div>
                <button
                  onClick={() => props.updateList(list)}
                  className="btn btn-primary  btn-sm m-1"
                >
                  Select
                </button>
                <button
                  onClick={() => handleDelete(list._id)}
                  className="btn btn-danger btn-sm m-1"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default MailingLists;
