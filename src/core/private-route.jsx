
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth"; // Assuming that useAuth is exported from auth.js

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
      <Route
        {...rest}
        element={user ? <Component /> : <Navigate to="/login" replace />}
      />
  );
};

export default PrivateRoute;
