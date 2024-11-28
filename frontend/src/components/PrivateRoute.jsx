
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const role = localStorage.getItem("role");  // Get role from localStorage

  return (
    <Route
      {...rest}
      render={(props) =>
        role ? (  // If role exists
          <Component {...props} />
        ) : (
          <Redirect to="/login" />  // Redirect to login if no role is found
        )
      }
    />
  );
};

export default PrivateRoute;
