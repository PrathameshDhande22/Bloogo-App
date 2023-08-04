import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Prop from "prop-types";

export const DialogComponent = ({
  open,
  title,
  content,
  actions,
  setFunction,
}) => {
  const handleClose = () => {
    setFunction(false);
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      fullWidth
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" fontSize={17}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

DialogComponent.propTypes = {
  open: Prop.bool,
  title: Prop.node,
  content: Prop.node,
  actions: Prop.node,
  setFunction: Prop.func,
};
