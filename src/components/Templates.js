import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTemplates } from "../Context/templates.context";
import { instance } from "../App";
import CreateTemplate from "./CreateTemplate";

const TemplatesList = ({ handleTemplate }) => {
  const { templates, fetchTemp } = useTemplates();
  console.log(templates);

  const handleDelete = (id) => {
    instance
      .delete(`/deleteTemplate/${id}`)
      .then((response) => {
        fetchTemp();
        toast.warn(response.data.message, {
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
    <>
      <h4 className="mt-3">Saved Templates</h4>
      <div className="btn btn-success container-fluid w-75 p-0 ">
        <CreateTemplate />
      </div>
      <div className="Templates">
        {templates.map((template) => {
          return (
            <Card
              className="m-3 p-0 text-start"
              style={{ width: "18rem" }}
              key={template._id}
            >
              <Card.Body>
                <Card.Title>{template.subject}</Card.Title>
                <Card.Text className="templateContent">
                  {template.body}
                </Card.Text>
                <Button
                  className="ms-2"
                  variant="primary"
                  onClick={() => handleTemplate(template)}
                >
                  Select
                </Button>
                <Button
                  className="ms-2"
                  variant="danger"
                  onClick={() => handleDelete(template._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <ToastContainer />
    </>
  );
};

export default TemplatesList;
