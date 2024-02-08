import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Input,
} from "@mui/material";
import { useTitle } from "../../Hooks/useTitle";
import { LoginSignBackground } from "../../components/LoginSignBackground";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useFormik } from "formik";
import { forgot_Schema } from "../../Schemas/scheme";
import { forgotPassword } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Forgot = () => {
  useTitle("Forgot Password");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navi = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: forgot_Schema,
    onSubmit: (value) => {
      forgotPassword({ email: value.email, password: value.password })
        .then(() => {
          toast.success("Password Changed Successfully.");
          navi("/");
        })
        .catch((res) => {
          if (res?.response?.status === 404) {
            toast.error("Email ID Doesn't Exists");
          } else if (res?.response?.status === 422) {
            toast.error("Email ID is Wrong.");
          } else {
            toast.error("Something Wrong at Our End.");
          }
        });
    },
  });
  return (
    <>
      <LoginSignBackground>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="font-raj font-bold md:text-2xl text-xl py-1 px-6 border-b-2 border-indigo-400 uppercase animate__animated animate__rubberBand animate__delay-1s animate__repeat-2 animate__slow select-none">
            Forgot Password
          </div>
          <div className="w-full flex flex-col items-center gap-3 mt-3">
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
              <InputLabel htmlFor="password">Enter New Password</InputLabel>
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
            <button
              type="submit"
              name="submit"
              className="border-2 border-indigo-500 px-11 mt-2 rounded-lg py-2 font-meri text-sm hover:bg-indigo-500 hover:text-white transition-{bg} ease-in duration-150"
            >
              Submit
            </button>
          </div>
        </form>
      </LoginSignBackground>
    </>
  );
};
