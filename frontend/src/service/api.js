import apicall from "../api";

export const test = () => {
  return apicall.get("/test");
};

export const getBlogs = () => {
  return apicall.get("/api/blogs?sort=newest");
};

/**
 * Register the User
 * @param {Object} data
 * @returns Axios Promise
 */
export const registerUser = (data) => {
  return apicall.post("/api/auth/register", data);
};

/**
 * Login User to get the access Token
 * @param {FormData} formdata
 * @returns Axios Promise
 */
export const loginUser = (formdata) => {
  return apicall.post("/api/auth/login", formdata);
};

/**
 * Verify the user
 * @param {String} token
 * @returns Axios Promise
 */
export const verifyUser = (token) => {
  return apicall.get("/api/auth/authenticate", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
