import { Navigate } from "react-router-dom";
import { isTokenValid } from "./utils/auth";


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return isTokenValid(token) ? children : <Navigate to="/" replace />;
};

const PrivateRouteLogin = ({ children }) => {
  const token = localStorage.getItem("token");
  return isTokenValid(token) ? <Navigate to="/dashboard/home" replace /> : children;
};

export { PrivateRoute, PrivateRouteLogin };
