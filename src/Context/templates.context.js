import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { instance } from "../App";

const templateContext = createContext({ templates: [] });

export const useTemplates = () => useContext(templateContext);

const TemplatesContextProvider = ({ children }) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    instance
      .get("/templates")
      .then((response) => {
        setTemplates(response.data.Templates);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const value = {
    templates,
  };

  return (
    <templateContext.Provider value={value}>
      {children}
    </templateContext.Provider>
  );
};

export default TemplatesContextProvider;
