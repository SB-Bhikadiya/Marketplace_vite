// PrivateRoute.js
import { Redirect } from "@reach/router";
import { useAuth } from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, isLoggedIn } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div
          className="spinner-grow"
          style="width: 7rem; height: 7rem;"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return isLoggedIn ? (
    <Component {...rest} />
  ) : (
    <Redirect to="/login" noThrow />
  );
};

export default PrivateRoute;
