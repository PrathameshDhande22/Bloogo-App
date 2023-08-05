import { GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/api";
import { useToken } from "../../Hooks/useToken";
import { setData } from "../../Store/Reducer/DataSlice";
import { LogoutDialog } from "../LogoutDialog";
import isProfileComplete from "../../utils/isProfileComplete";
import "react-tooltip/dist/react-tooltip.css";
import {
  Avatar,
  Badge,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Popover,
} from "@mui/material";
import { BsChevronDown } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { getImageURL } from "../../utils/imageurl";
import { MdManageAccounts, MdDelete, MdChangeCircle } from "react-icons/md";
import { DeleteAccount } from "../DeleteAccount";

export const Profile = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.udata.userData);
  const token = useToken();
  const [imgsrc, setImgsrc] = useState(null);

  useEffect(() => {
    const setprofile = (newdata) => {
      dispatch(setData(newdata));
    };
    getProfile(token)
      .then((res) => {
        setprofile(res.data);
        if (res.data?.profileurl !== null) {
          setImgsrc(getImageURL(res.data?.profileurl));
        }
      })
      .catch(() => {
        navi("/");
      });
  }, [token, dispatch, navi]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const opened = Boolean(anchorEl);
  const id = opened ? "simple-popover" : undefined;
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-describedby={id}
        className=" hover:bg-slate-200 active:bg-slate-400 px-2 py-2 rounded-xl flex flex-row justify-center items-center gap-2"
      >
        <Avatar alt="User's Profile Image" src={imgsrc} />
        <BsChevronDown fontSize={16} />
      </button>
      <Popover
        id={id}
        open={opened}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "#f5f7fc",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{ height: 40, bgcolor: "#f5f7fc" }}
            >
              <span className="font-spec text-sm select-none">
                Manage Bloogo
              </span>
            </ListSubheader>
          }
        >
          <ListItemButton
            divider
            sx={{ height: 40 }}
            onClick={() => {
              handleClose();
              navi("/blog/new");
            }}
          >
            <ListItemIcon>
              <FiEdit fontSize={18} />
            </ListItemIcon>
            <ListItemText>
              <span className="font-noto text-sm">Write a Blog</span>
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            sx={{ height: 40 }}
            onClick={() => {
              handleClose();
              navi("/profile");
            }}
          >
            <ListItemIcon>
              <MdManageAccounts fontSize={18} />
            </ListItemIcon>
            <ListItemText>
              {isProfileComplete(data?.firstname, data?.lastname, data?.dob) ? (
                <span className="font-noto text-sm">Profile</span>
              ) : (
                <Badge variant="dot" color="warning">
                  <span className="font-noto text-sm pe-2">Profile</span>
                </Badge>
              )}
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            sx={{ height: 40 }}
            onClick={() => {
              handleClose();
              handleDeleteOpen();
            }}
          >
            <ListItemIcon>
              <MdDelete fontSize={18} />
            </ListItemIcon>
            <ListItemText>
              <span className="font-noto text-sm">Delete Account</span>
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            sx={{ height: 40 }}
            onClick={() => {
              navi("/change");
              handleClose();
            }}
          >
            <ListItemIcon>
              <MdChangeCircle fontSize={18} />
            </ListItemIcon>
            <ListItemText>
              <span className="font-noto text-sm">Change Password</span>
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            sx={{ height: 40 }}
            onClick={() => {
              handleClose();
              handleClickOpen();
            }}
          >
            <ListItemIcon>
              <GrLogout fontSize={18} />
            </ListItemIcon>
            <ListItemText>
              <span className="font-noto text-sm">Logout</span>
            </ListItemText>
          </ListItemButton>
        </List>
      </Popover>
      <LogoutDialog open={open} setOpen={setOpen} />
      <DeleteAccount key={1} open={openDelete} setOpen={setOpenDelete} />
    </>
  );
};
