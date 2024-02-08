import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTitle } from "../../Hooks/useTitle";
import { useToken } from "../../Hooks/useToken";
import { useFormik } from "formik";
import { change_Schema } from "../../Schemas/scheme";
import { changePassword } from "../../api/api";
import { toast } from "react-toastify";
import { PleaseWait } from "../../components/PleaseWait";

export const ChangePassword = () => {
  useTitle("Change Password");
  const [showCurrent, setCurrent] = useState(false);
  const [showNew, setNew] = useState(false);
  const [showRe, setRe] = useState(false);
  const [isChanging, setChanging] = useState(false);

  const handlestate = (fun, state) => {
    fun(!state);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navi = useNavigate();
  const token = useToken();
  const formik = useFormik({
    initialValues: {
      oldpassword: "",
      newpassword: "",
      repassword: "",
    },
    validationSchema: change_Schema,
    onSubmit: (value) => {
      const formdata = new FormData();
      setChanging(true);
      formdata.append("password", value.newpassword);
      formdata.append("current", value.oldpassword);
      changePassword(formdata, token)
        .then((res) => {
          setChanging(false);
          if (res.status === 200) {
            toast.success("Password Changed Successfully.");
            navi(-1);
          }
        })
        .catch((res) => {
          setChanging(false);
          if (res?.response?.status === 406) {
            toast.error("Old Password and New Password are Same");
          } else if (res?.response?.status === 401) {
            toast.error(
              <>
                Current Password is Wrong <br />
                <b>Click on Forgot Password</b>
              </>
            );
          } else {
            toast.error("Something wrong at our End");
          }
        });
    },
  });
  return (
    <>
      <div className="my-4 w-full flex flex-col justify-center items-center">
        <div className="w-[95%] sm:w-96 mx-2 rounded-xl px-2 py-10  border-2 border-indigo-500">
          <form
            className="px-3 flex flex-col flex-wrap gap-6 justify-center items-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="font-lum sm:text-xl px-5 border-b-2 border-indigo-800">
              Change Password
            </div>
            <div className="flex flex-wrap flex-col items-center justify-center gap-4">
              <TextField
                fullWidth
                id="cpass"
                type={showCurrent ? "text" : "password"}
                label="Current Password"
                name="oldpassword"
                error={
                  formik.touched.oldpassword &&
                  Boolean(formik.errors.oldpassword)
                }
                onBlur={formik.handleBlur}
                value={formik.values.oldpassword}
                helperText={formik.errors.oldpassword}
                onChange={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Password />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          handlestate(setCurrent, showCurrent);
                        }}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showCurrent ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              <TextField
                id="npass"
                fullWidth
                onBlur={formik.handleBlur}
                type={showNew ? "text" : "password"}
                label="New Password"
                name="newpassword"
                error={
                  formik.touched.newpassword &&
                  Boolean(formik.errors.newpassword)
                }
                value={formik.values.newpassword}
                helperText={formik.errors.newpassword}
                onChange={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Password />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          handlestate(setNew, showNew);
                        }}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showNew ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              <TextField
                id="repass"
                fullWidth
                onBlur={formik.handleBlur}
                type={showRe ? "text" : "password"}
                label="Re-enter Password"
                name="repassword"
                error={
                  formik.touched.repassword && Boolean(formik.errors.repassword)
                }
                value={formik.values.repassword}
                helperText={formik.errors.repassword}
                onChange={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Password />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          handlestate(setRe, showRe);
                        }}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showRe ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </div>
            <div className="flex flex-row justify-center items-center gap-2 flex-wrap">
              {isChanging ? (
                <PleaseWait />
              ) : (
                <button
                  type="submit"
                  name="submit"
                  className="border-2 border-indigo-500 px-11 mt-2 rounded-lg py-2 font-meri text-sm hover:bg-indigo-500 hover:text-white transition-{bg} ease-in duration-150"
                >
                  Change
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  navi(-1);
                }}
                className="px-11 mt-2 rounded-lg py-2 font-meri text-sm hover:bg-slate-300 bg-slate-100  transition-{bg} ease-in duration-150"
              >
                Cancel
              </button>
            </div>
            <div className="mt-3 font-ysb flex flex-col justify-center items-center text-base">
              <span>{"Don't Know the Password ?"}</span>{" "}
              <Link to={"/forgot"}>
                <span className="text-indigo-500 font-bold py-0 hover:border-b-2 border-indigo-500">
                  Forgot Password
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
