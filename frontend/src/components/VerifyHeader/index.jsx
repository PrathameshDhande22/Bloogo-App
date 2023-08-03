import { Alert, AlertTitle } from "@mui/material";
import { FaExclamation } from "react-icons/fa";
import { Link } from "react-router-dom";

export const VerifyHeader = () => {
  return (
    <div className="sm:mx-3 mx-1 my-2">
      <Alert
        variant="filled"
        sx={{
          backgroundColor: "#e0e7ff",
          color: "black",
          borderColor: "#4b54c5",
          borderWidth: 2,
        }}
        severity="warning"
        icon={<FaExclamation color="#4b54c5" />}
      >
        <AlertTitle color="#4b54c5" sx={{ fontWeight: "700" }}>
          <span className="font-meri capitalize">Verify Email ID</span>
        </AlertTitle>
        <span className="font-noto">
          Verify Your Email by Clicking On this Link 👉
          <Link
            to={"/send"}
            className="text-blue-900 hover:border-b-2 border-indigo-800"
          >
            <span className="p-2">Click Here</span>
          </Link>
        </span>
      </Alert>
    </div>
  );
};
