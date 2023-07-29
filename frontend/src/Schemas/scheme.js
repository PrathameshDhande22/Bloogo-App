import * as yup from "yup";

export const signup_Schema = yup.object({
  email: yup
    .string()
    .email("Enter Valid Email")
    .required("Email is required to create account"),
  password: yup
    .string()
    .min(8, "Password must contain 8 Characters")
    .max(16, "Password must contains at most 16 Characters")
    .required("Enter Valid Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, //eslint-disable-line
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Password is Required"),
});

export const login_Schema = yup.object({
  email: yup
    .string()
    .email("Enter Correct Email Id")
    .required("Email id is required to Login"),
  password: yup
    .string()
    .min(8, "Password must contain 8 Characters")
    .max(16, "Password must contains at most 16 Characters")
    .required("Enter Valid Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, //eslint-disable-line
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});
