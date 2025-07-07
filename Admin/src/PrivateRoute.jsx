import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); 
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const PrivateRouteLogin = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); 
  return isAuthenticated== null ? children : <Navigate to="/dashboard/home" replace />;
};

export  {PrivateRoute,PrivateRouteLogin};