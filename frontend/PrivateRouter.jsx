import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";
import Loading from "./src/components/Loading.jsx";

const PrivateRoute = ({ element }) => {
  const { authToken, loading } = useContext(AuthContext);
  if (loading) {
    return <Loading />;
  }

  // If user is authenticated, render the requested component
  // If not, redirect to the login page
  return authToken ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
