import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../axios";
 
const PublicRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
 
  useEffect(() => {
    api.get("/auth/me")
      .then(() => {
        setAuthenticated(true); // already logged in
      })
      .catch(() => {
        setAuthenticated(false); // not logged in
      })
      .finally(() => setChecking(false));
  }, []);
 
  if (checking) return <div className="text-white text-center mt-10">Checking session...</div>;
 
  return authenticated ? <Navigate to="/people" /> : children;
};
 
export default PublicRoute;
 
 