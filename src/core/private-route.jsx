
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth"; // Assuming that useAuth is exported from auth.js
import { MARKETPLACE_TOKEN } from "../constants/keys";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
      <Route
        {...rest}
        element={localStorage.getItem(MARKETPLACE_TOKEN) ? <Component /> : <Navigate to="/login" replace />}
      />
  );
};

export default PrivateRoute;
