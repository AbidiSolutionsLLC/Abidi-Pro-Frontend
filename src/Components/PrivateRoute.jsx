import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../axios";
 
const PrivateRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);
 
  useEffect(() => {
    api.get("/auth/me")
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false));
  }, []);
 
  if (authorized === null) return <div className="text-white text-center mt-10">Checking session...</div>;
  return authorized ? children : <Navigate to="/auth/login" />;
};
 
export default PrivateRoute;
 