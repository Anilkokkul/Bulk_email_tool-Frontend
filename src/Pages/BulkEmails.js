import React from "react";
import { useTemplates } from "../Context/templates.context";
import { useFormik } from "formik";
import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BulkEmails = () => {
  const { templates } = useTemplates();
  const initialValues = {
    recipients: [],
    subject: "",
    template: "",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      onSubmit: (values, { resetForm }) => {
        instance
          .post("/bulk-email-sending", values)
          .then((Response) => {
            toast.success(Response.data.message, {
              position: "top-center",
            });
          })
          .catch((error) => {
            const errorMessage = error.response.data.message;
            toast.warn(errorMessage, {
              position: "top-center",
            });
          });

        resetForm();
      },
    });

  return (
    <>
      <div className=" d-flex justify-content-center vh-100  ">
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit} className="templateContainer">
            <div className=" d-flex justify-content-center m-3 align-content-center  ">
              <label className="label m-2">To</label>
              <input
                className=" form-control "
                placeholder="Recipients"
                type="text"
                name="recipients"
                value={values.recipients}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </div>
            {touched.recipients && errors.recipients ? (
              <p className="text-danger">{errors.recipients}</p>
            ) : null}
            <div className=" d-flex justify-content-center m-3 ">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                className=" form-control"
                placeholder="Subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </div>
            <div className="d-flex justify-content-center m-3">
              <label>Message</label>
              <textarea
                type="text"
                name="template"
                className=" form-control "
                placeholder="Type message here"
                value={values.template}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
            </div>
            <div className="text-end m-3">
              <button type="submit" className="btn btn-outline-primary btn-lg ">
                Send
              </button>
            </div>
          </form>
        </div>
        {/* <div>
          <select className="custom-select">
            <option>Saved Templates</option>
            {templates &&
              templates.map((template, index) => {
                return (
                  <option key={index} value={template.subject}>
                    {template.subject}
                  </option>
                );
              })}
          </select>
        </div> */}
      </div>
      <ToastContainer />
    </>
  );
};

export default BulkEmails;
