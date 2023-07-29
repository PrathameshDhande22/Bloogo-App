import Prop from "prop-types";
import { Alert, AlertTitle } from "@mui/material";

export const ServiceError = ({ children, error, showChildren }) => {
  return (
    <>
      {error ? (
        <div className="mx-1 md:mx-5 mt-3 md:mt-0 rounded-full font-rem my-2">
          <Alert severity="error">
            <AlertTitle>
              <b className="text-lg">Service Error</b>
            </AlertTitle>
            Something Wrong at our End —{" "}
            <strong>Please Try Again Later !</strong>
          </Alert>
          {showChildren ? children : null}
        </div>
      ) : (
        children
      )}
    </>
  );
};

ServiceError.propTypes = {
  children: Prop.node,
  error: Prop.bool,
  showChildren: Prop.bool,
};
