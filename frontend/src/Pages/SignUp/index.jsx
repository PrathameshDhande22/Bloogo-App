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
import { signup_Schema } from "../../Schemas/scheme";
import { registerUser } from "../../api/api";
import { toast } from "react-toastify";
import { PleaseWait } from "../../components/PleaseWait";

export const SignUp = () => {
  useTitle("Sign Up");
  const navi = useNavigate();
  const [isSigning, setSigning] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repassword: "",
    },
    validationSchema: signup_Schema,
    onSubmit: (value) => {
      setSigning(true);
      registerUser({ email: value.email, password: value.password })
        .then((res) => {
          setSigning(false);
          if (res.status === 200) {
            toast.success(
              "Registration Successfull now login to Explore our Services"
            );
            setTimeout(() => {
              navi("/login");
            }, 3000);
          }
        })
        .catch((res) => {
          setSigning(false);
          if (res?.response?.status === 406) {
            toast.error("Email ID already Exists");
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

  return (
    <>
      <LoginSignBackground>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="font-raj font-bold md:text-2xl text-xl py-1 px-6 border-b-2 border-indigo-400 uppercase animate__animated animate__rubberBand animate__delay-1s animate__repeat-2 animate__slow select-none">
            Sign Up
          </div>
          <div className="w-full flex flex-col items-center">
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyItems: "center",
                width: "100%",
                marginBottom: 0.1,
              }}
            >
              <AccountCircle
                sx={{ color: "action.active", marginRight: 1, fontSize: 30 }}
              />
              <TextField
                id="email"
                label="Email"
                variant="standard"
                sx={{ width: "100%" }}
                value={formik.values.email}
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel
                htmlFor="passwordfirst"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                Enter Password
              </InputLabel>
              <Input
                id="passwordfirst"
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
                      {showPassword ? <Visibility /> : <VisibilityOff />}
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
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel
                htmlFor="passwordsecond"
                error={
                  formik.touched.repassword && Boolean(formik.errors.repassword)
                }
              >
                Re-enter Password
              </InputLabel>
              <Input
                id="passwordsecond"
                type={showPassword ? "text" : "password"}
                name="repassword"
                onChange={formik.handleChange}
                value={formik.values.repassword}
                error={
                  formik.touched.repassword && Boolean(formik.errors.repassword)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.repassword ? (
                <span className="text-red-600 text-xs font-serif mt-1">
                  {formik.errors.repassword}
                </span>
              ) : null}
            </FormControl>
            {isSigning ? (
              <PleaseWait />
            ) : (
              <button
                name="submit"
                type="submit"
                className="border-2 border-indigo-500 px-11 mt-2 rounded-lg py-2 font-meri text-sm hover:bg-indigo-500 hover:text-white transition-{bg} ease-in duration-150"
              >
                Sign Up
              </button>
            )}
          </div>
        </form>
        <div className="mt-3 font-ysb text-center text-base">
          <span>Already Have an Account</span>{" "}
          <Link to={"/login"}>
            <span className="text-indigo-500 font-bold py-0 hover:border-b-2 border-indigo-500">
              Login
            </span>
          </Link>
        </div>
      </LoginSignBackground>
    </>
  );
};
