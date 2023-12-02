import React, { useEffect, useState } from "react";
// import { useTemplates } from "../Context/templates.context";
import { useFormik } from "formik";
import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// eslint-disable-next-line no-unused-vars
import ReactQuill from "react-quill";

const BulkEmails = (props) => {
  // const { templates } = useTemplates();
  const [list, setlist] = useState(props.userList.emails);
  const [template, setTemplate] = useState(props.template);

  const initialValues = {
    recipients: list || [],
    subject: template.subject || "",
    template: template.body || "",
  };
  useEffect(() => {
    setlist(props.userList.emails);
    setTemplate(props.template);
  }, [props]);

  // useEffect(() => {
  //   setlist(initialValues.recipients);
  // }, [initialValues.recipients]);

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    enableReinitialize: true,
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
      setlist([]);
      setTemplate({});
      props.handleClear();
    },
  });
  return (
    <>
      <div className=" d-flex justify-content-center vh-100">
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit} className="templateContainer ">
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

            <div className=" d-flex justify-content-center m-3 ">
              <label className="label m-2">Subject</label>
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
            <div className="d-flex justify-content-center m-3 quill">
              <label className="label m-2">Message</label>
              <div className="w-100 ">
                <ReactQuill
                  theme="snow"
                  value={values.template}
                  onChange={(content) =>
                    handleChange({
                      target: { name: "template", value: content },
                    })
                  }
                  onBlur={(content) =>
                    handleChange({
                      target: { name: "template", value: content },
                    })
                  }
                />
              </div>
            </div>
            <div className="text-end bottom-0">
              <button type="submit" className="btn btn-outline-primary btn-lg ">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default BulkEmails;
