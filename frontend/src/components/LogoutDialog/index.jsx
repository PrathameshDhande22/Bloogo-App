import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Close, QuestionMark } from "@mui/icons-material";
import Prop from "prop-types";
import { useDispatch } from "react-redux";
import { removeData } from "../../Store/Reducer/DataSlice";
import { removeLogin } from "../../Store/Reducer/LoginSlice";
import { deleteToken } from "../../utils/storetoken";
import { useNavigate } from "react-router-dom";

export const LogoutDialog = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const navi = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(removeData());
    dispatch(removeLogin());
    deleteToken();
    navi("/");
  };

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        fullWidth
        aria-describedby="alert-dialog-slide-description"
        color="red"
      >
        <DialogTitle>
          <div className="flex flex-row justify-between text-xl font-bold">
            <span className="font-gara text-lg flex flex-row items-center">
              Logout <QuestionMark sx={{ color: "red", fontSize: 20 }} />
            </span>
            <span>
              <button type="button" onClick={handleClose}>
                <Close />
              </button>
            </span>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            fontSize={17}
          >
            Are U Sure you want to logout
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="flex flex-row gap-2  flex-wrap">
            <button
              className="font-spec text-lg font-bold px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-{bg} ease-in-out duration-200"
              type="button"
              onClick={logoutUser}
            >
              Yes
            </button>
            <button
              className="font-spec text-lg font-bold px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-{bg} ease-in-out duration-200"
              onClick={handleClose}
              type="button"
            >
              No
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

LogoutDialog.propTypes = {
  open: Prop.bool,
  setOpen: Prop.func,
};
