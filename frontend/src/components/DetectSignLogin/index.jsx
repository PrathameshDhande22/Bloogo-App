import Prop from "prop-types";
import { useLocation } from "react-router-dom";

export const DetectSignLogin = ({ children }) => {
  const location = useLocation();
  if (
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/forgot"
  ) {
    return null;
  } else {
    return children;
  }
};

DetectSignLogin.propTypes = {
  children: Prop.node,
};
