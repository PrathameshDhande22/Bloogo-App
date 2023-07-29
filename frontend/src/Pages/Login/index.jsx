import { useTitle } from "../../Hooks/useTitle";
import { LoginSignBackground } from "../../components/LoginSignBackground";
import {
  Box,
  TextField,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { AccountCircle, VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { login_Schema } from "../../Schemas/scheme";
import { loginUser } from "../../service/api";
import { ToastContainer, toast } from "react-toastify";
import { saveToken } from "../../utils/storetoken";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Store/Reducer/LoginSlice";

export const Login = () => {
  useTitle("Login");
  const navi = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: login_Schema,
    onSubmit: (value) => {
      const fd = new FormData();
      fd.append("email", value.email);
      fd.append("password", value.password);

      loginUser(fd)
        .then((res) => {
          saveToken(res.data?.Access_Token);
          handleLogin();
          toast.success("Login Successful.");
          setTimeout(() => {
            /* TODO: Redirect to Profile Page */
            navi("/");
          }, 4000);
        })
        .catch((res) => {
          if (res?.response?.status === 401) {
            toast.error("Invalid Password !");
          } else if (res?.response?.status === 404) {
            toast.warn("Email ID not Found Register First.");
          } else if (res?.response?.status === 422) {
            toast.error("One or more Field is Wrong");
          } else {
            toast.error("Something Wrong at Our End, Try Again Later");
          }
        });
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    dispatch(setLogin());
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <LoginSignBackground>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="font-raj font-bold md:text-2xl text-xl py-1 px-6 border-b-2 border-indigo-400 uppercase animate__animated animate__rubberBand animate__delay-1s animate__repeat-2 animate__slow select-none">
            Login
          </div>
          <div className="w-full flex flex-col items-center gap-3">
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyItems: "center",
                width: "100%",
              }}
            >
              <AccountCircle
                sx={{ color: "action.active", marginRight: 1, fontSize: 30 }}
              />
              <TextField
                id="emailinput"
                label="Email"
                variant="standard"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ width: "100%" }}
              />
            </Box>
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel htmlFor="password">Enter Password</InputLabel>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.password ? (
                <span className="text-red-600 text-xs font-serif mt-1">
                  {formik.errors.password}
                </span>
              ) : null}
            </FormControl>
            <Link
              to={"/forgot"}
              className="self-end font-ysb font-semibold -mt-5"
            >
              <span className="text-indigo-600 hover:border-b-2 border-b-indigo-500">
                Forgot Password ?
              </span>
            </Link>
            <button
              type="submit"
              name="submit"
              className="border-2 border-indigo-500 px-11 mt-2 rounded-lg py-2 font-meri text-sm hover:bg-indigo-500 hover:text-white transition-{bg} ease-in duration-150"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-3 font-ysb flex flex-col justify-center items-center text-base">
          <span>{"Don't Have an Account"}</span>{" "}
          <Link to={"/signup"}>
            <span className="text-indigo-500 font-bold py-0 hover:border-b-2 border-indigo-500">
              Create Account
            </span>
          </Link>
        </div>
      </LoginSignBackground>
    </>
  );
};
