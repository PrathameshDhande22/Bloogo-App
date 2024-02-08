import { useSelector } from "react-redux";
import { useTitle } from "../../Hooks/useTitle";
import userImage from "../../assets/user.png";
import { Avatar, CircularProgress, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getImageURL } from "../../utils/imageurl";
import { toast } from "react-toastify";
import { useToken } from "../../Hooks/useToken";
import { Upload } from "@mui/icons-material";
import { updateProfile } from "../../api/api";
import { DialogComponent } from "../../components/DialogComponent";
import { TbEditCircle } from "react-icons/tb";
import useProfile from "../../Hooks/useProfile";

export const Profile = () => {
  const userdata = useSelector((state) => state.udata.userData);
  const [imgsrc, setImgsrc] = useState(null);
  const navi = useNavigate();
  const [userState, setUserState] = useState({
    firstname: "",
    lastname: "",
    dob: "",
  });

  const { saveProfile } = useProfile();

  useEffect(() => {
    setUserState({
      firstname: userdata.firstname === null ? "" : userdata.firstname,
      lastname: userdata.lastname === null ? "" : userdata.lastname,
      dob: userdata.dob === null ? "" : userdata.dob,
    });
    if (userdata?.profileurl !== null) {
      setImgsrc(getImageURL(userdata.profileurl));
    } else {
      setImgsrc(userImage);
    }
  }, [userdata]);

  const [updateBlack, setupdateBlack] = useState(false);
  const [uploadFile, setuploadFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setuploadFile(null);
    setOpen(false);
  };

  const token = useToken();

  const update_name_profile = () => {
    if (
      userState.firstname.length !== 0 &&
      userState.lastname.length !== 0 &&
      userState.dob.length !== 0
    ) {
      setLoading(true);
      const fd = new FormData();
      fd.append("firstname", userState.firstname);
      fd.append("lastname", userState.lastname);
      fd.append("dob", userState.dob);
      fd.append("image", uploadFile);
      updateProfile(fd, token)
        .then(() => {
          setLoading(false);
          toast.success("User Data Updated Successfully");
          setTimeout(() => {
            saveProfile();
          }, 2500);
        })
        .catch(() => {
          setLoading(false);
          toast.error("Error While updating the profile.");
        });
    } else {
      toast.info("Enter Required Field");
    }
  };

  useTitle("Profile");
  return (
    <div className="flex flex-col justify-center items-center md:w-full my-10 mx-4">
      <div className="w-full border-4 border-indigo-600 rounded-xl px-4 py-3 md:w-1/2 shadow-2xl">
        <div className="flex flex-col gap-2 justify-center flex-wrap items-center">
          <div className="text-2xl self-start md:text-4xl font-gara font-bold pb-2">
            Profile
          </div>

          <div className="flex flex-col justify-center flex-wrap items-center gap-5">
            <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
              <Tooltip
                title="Update Profile Image"
                followCursor
                placement="left"
                arrow
              >
                <button
                  onClick={handleClickOpen}
                  type="button"
                  onMouseOver={() => setupdateBlack(true)}
                  onMouseOut={() => setupdateBlack(false)}
                  className="relative  rounded-full"
                >
                  <Avatar src={imgsrc} sx={{ height: 150, width: 150 }} />
                  <div
                    className={`w-full h-full rounded-full opacity-60 absolute top-0 z-40  bg-black ${
                      updateBlack ? "visible" : "hidden"
                    } flex justify-center items-center`}
                  >
                    <TbEditCircle color="white" fontSize={100} />
                  </div>
                </button>
              </Tooltip>

              <div className="flex flex-col gap-3">
                <TextField
                  label="First Name"
                  value={userState?.firstname}
                  id="firstnamedata"
                  size="small"
                  onChange={(e) => {
                    setUserState({ ...userState, firstname: e.target.value });
                  }}
                />
                <TextField
                  label="Last Name"
                  value={userState?.lastname}
                  id="lastnamedata"
                  size="small"
                  onChange={(e) => {
                    setUserState({ ...userState, lastname: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date Of Birth"
                  value={dayjs(userState?.dob)}
                  format="DD/MM/YYYY"
                  onChange={(value) => {
                    setUserState({
                      ...userState,
                      dob: dayjs(value).format("YYYY-MM-DD").toString(),
                    });
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex flex-row font-noto flex-wrap self-end gap-2 pt-3">
            <button
              className="bg-violet-500 hover:bg-violet-700 transition-colors rounded-md px-4 py-1 text-white"
              type="button"
              onClick={update_name_profile}
              id="btnupdate"
              disabled={isLoading}
            >
              <div className="flex items-center flex-row gap-2">
                {isLoading ? (
                  <CircularProgress
                    thickness={6}
                    size={20}
                    sx={{ color: "white" }}
                  />
                ) : null}
                <span>Save Changes</span>
              </div>
            </button>
            <button
              className="bg-slate-200 hover:bg-slate-300 transition-colors rounded-md px-4 py-1 text-black"
              type="button"
              onClick={() => {
                navi(-1);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <>
        <DialogComponent
          open={open}
          title={
            <span className="font-spec text-xl font-bold">Update Profile</span>
          }
          content={
            <div className="font-noto">
              {uploadFile === null ? (
                <span className="flex flex-col flex-wrap gap-3">
                  <span>Select Your Profile Photo: </span>
                  <div className="flex flex-wrap flex-row gap-3 items-center border-2 border-gray-400 rounded-lg p-3 md:p-10">
                    <Upload />
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      name="fileupload"
                      id=""
                      max={1}
                      onChange={(e) => {
                        setuploadFile(e.target.files[0]);
                      }}
                      className="w-[107px] file:after:bg-red-500"
                    />
                  </div>
                </span>
              ) : (
                <span className="flex md:p-20 p-2 flex-col gap-3 justify-evenly items-center">
                  <span className=" block self-start place-content-start">
                    Uploaded Profile Image :{" "}
                  </span>
                  <Avatar
                    src={URL.createObjectURL(uploadFile)}
                    sx={{ height: 150, width: 150 }}
                  />
                </span>
              )}
            </div>
          }
          actions={
            <div className="flex flex-row gap-2  flex-wrap">
              <button
                className="font-spec text-lg font-bold px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-{bg} ease-in-out duration-200"
                type="button"
                onClick={() => {
                  if (uploadFile !== null) {
                    setImgsrc(URL.createObjectURL(uploadFile));
                  }
                  setOpen(false);
                }}
              >
                Update
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
      </>
    </div>
  );
};
