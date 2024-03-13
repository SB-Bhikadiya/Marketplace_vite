// PrivateRoute.js
import { navigate } from "@reach/router";
import { useAuth } from "./auth";

const PrivateRoute = ({ Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
