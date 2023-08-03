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
import { deleteUserProfile } from "../../api/api";
import { useToken } from "../../Hooks/useToken";

export const DeleteAccount = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const navi = useNavigate();
  const dispatch = useDispatch();

  const token = useToken();
  const DeleteUser = () => {
    deleteUserProfile(token)
      .then(() => {
        deleteToken();
        dispatch(removeData());
        dispatch(removeLogin());
        navi("/");
      })
      .catch(() => {
        null;
      });
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
              Delete <QuestionMark sx={{ color: "red", fontSize: 20 }} />
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
            fontFamily={"cursive"}
            fontSize={17}
          >
            <span className="block font-gara font-semibold">
              <span> Are U Sure you want to Delete Your Account</span>
              <br />
              <span>
                This will delete your account as well as Blogs that you Posted.
              </span>
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="flex flex-row gap-2  flex-wrap">
            <button
              className="font-spec text-lg font-bold px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-{bg} ease-in-out duration-200"
              type="button"
              onClick={DeleteUser}
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

DeleteAccount.propTypes = {
  open: Prop.bool,
  setOpen: Prop.func,
};
