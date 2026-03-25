import React, { useState, useEffect, useCallback } from "react";
import { createContext, useContext } from "react";
import { instance } from "../App";

const templateContext = createContext({ templates: [] });

export const useTemplates = () => useContext(templateContext);

const TemplatesContextProvider = ({ children }) => {
  const [templates, setTemplates] = useState([]);

  const fetchTemp = useCallback(() => {
    instance
      .get("/templates")
      .then((response) => {
        setTemplates(response.data.Templates);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  useEffect(() => {
    fetchTemp();
  }, [fetchTemp]);

  const value = {
    templates,
    fetchTemp,
  };

  return (
    <templateContext.Provider value={value}>
      {children}
    </templateContext.Provider>
  );
};

export default TemplatesContextProvider;
