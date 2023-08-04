import Prop from "prop-types";
import { useSelector } from "react-redux";
import isProfileComplete from "../../utils/isProfileComplete";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { MdIncompleteCircle } from "react-icons/md";
import { Close } from "@mui/icons-material";
import { DialogComponent } from "../DialogComponent";

export const CheckAccess = ({ children }) => {
  const data = useSelector((state) => state.udata.userData);

  const navi = useNavigate();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    navi(-1);
  };

  if (
    isProfileComplete(data?.firstname, data?.lastname, data?.dob) &&
    data?.isverified
  ) {
    return children;
  } else {
    return (
      <DialogComponent
        open={open}
        title={
          <div className="flex flex-row justify-between text-xl font-bold">
            <span className="font-noto gap-1 text-lg flex flex-row items-center">
              InComplete <MdIncompleteCircle />
            </span>
            <span>
              <button type="button" onClick={handleClose}>
                <Close />
              </button>
            </span>
          </div>
        }
        content={
          <>
            Your Profile is Incomplete. Complete Your Profile Or Email
            Verification is Pending.
          </>
        }
        actions={
          <div className="flex flex-row gap-2  flex-wrap">
            <button
              className="font-spec text-lg font-bold px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-{bg} ease-in-out duration-200"
              type="button"
              onClick={() => {
                navi("/profile");
              }}
            >
              Complete My Profile
            </button>
            <button
              className="font-spec text-lg font-bold px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-{bg} ease-in-out duration-200"
              onClick={handleClose}
              type="button"
            >
              Cancel
            </button>
          </div>
        }
        setFunction={setOpen}
      />
    );
  }
};

CheckAccess.propTypes = {
  children: Prop.node,
};
