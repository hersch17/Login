import React from "react";
import StudentInfo from "../pages/Scanner";
import { Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = sessionStorage.getItem("login");
  return (
    // prettier-ignore
    auth ? <StudentInfo/> : <Navigate to="/"/>
  );
};

export default PrivateRoutes;
