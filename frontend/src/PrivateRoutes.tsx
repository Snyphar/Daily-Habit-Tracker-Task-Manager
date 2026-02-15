import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token"); // Check if JWT exists

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login
  }

  return children; // User is authenticated
};

export default PrivateRoute;
