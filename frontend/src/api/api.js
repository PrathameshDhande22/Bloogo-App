import axios from "axios";
import apicall from ".";

/**
 * Test the app or to restart the server.
 * @returns Axios Promise
 */
export const test = () => {
  return apicall.get("/test");
};

/**
 * methods to get all blogs
 * @returns Axios Promise
 */
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

/**
 * Get the User Profile.
 * @param {String} token
 * @returns Axios Promise
 */
export const getProfile = (token) => {
  return apicall.get("/api/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * For Sending the Verification Mail
 * @param {String} token
 * @returns Axios Promise
 */
export const sendEmail = (token) => {
  return apicall.post(
    "/api/auth/send",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

/**
 * Verify the code send to the mail
 * @param {String} verifycode
 * @returns Axios Promise
 */
export const verifyEmail = (verifycode) => {
  return apicall.get(`/api/auth/verify/${verifycode}`);
};

/**
 * Uploading the profile picture of the user to the Cloudinary
 * @param {FormData} data
 * @returns Axios Promise
 */
export const uploadPhoto = (data) => {
  return axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUD_NAME
    }/image/upload`,
    data
  );
};

/**
 * Updates the User Profile
 * @param {Object} data
 * @param {String} token
 * @returns Axios Promise
 */
export const updateProfile = (data, token) => {
  return apicall.put("api/user/profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * Deletes the user Profile along with User Related Blogs.
 * @param {String} token
 * @returns Axios Promise
 */
export const deleteUserProfile = (token) => {
  return apicall.delete("/api/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Sets the new Password
 * @param {Object} data
 * @returns Axios Promise
 */
export const forgotPassword = (data) => {
  return apicall.put(
    `/api/user/forgot?email=${data.email}&password=${data.password}`
  );
};

/**
 * Changes the Password by using the current password and new Password
 * @param {FormData} data
 * @param {String} token
 * @returns Axios Promise
 */
export const changePassword = (data, token) => {
  return apicall.put("/api/user/change", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Returns a Blog Data.
 * @param {String} id
 * @returns Axios Promise
 */
export const viewBlog = (id) => {
  return apicall.get(`/api/blog/${id}`);
};

/**
 * Api Endpoint for getting all the tags
 * @returns Axios Promise
 */
export const getTags = () => {
  return apicall.get("/api/tags");
};

/**
 * Adding the tag.
 * @param {String} token
 * @param {String} tag
 * @returns Axios Promise
 */
export const addTag = (token, tag) => {
  return apicall.post(
    `/api/tag/${tag}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

/**
 * Posts the New Blog
 * @param {String} token
 * @param {FormData} data
 * @returns Axios Promise
 */
export const newBlog = (token, data) => {
  return apicall.post("/api/blog/new", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * View all the user related Blogs.
 * @param {String} token
 * @returns Axios Promise
 */
export const getUserBlogs = (token) => {
  return apicall.get("/api/blogs/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Get Author complete Details including Blogs and profile data.
 * @param {String} id
 * @returns Axios Promise
 */
export const getAuthorData = (id) => {
  return apicall.get(`/api/user/profile/${id}`);
};

/**
 * Deletes the user Blog
 * @param {String} id
 * @param {String} token
 * @returns Axios Promise
 */
export const deleteBlog = (id, token) => {
  return apicall.delete(`/api/blog/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Updates the Blog
 * @param {String} id
 * @param {String} token
 * @param {FormData} data
 * @returns Axios Promise
 */
export const updateBlog = (id, token, data) => {
  return apicall.put(`/api/blog/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * List of all blogs which are searched.
 * @param {String} query
 * @param {String} sort
 * @returns Axios Promise
 */
export const searchBlogs = (query) => {
  return apicall.get(`/api/blogs?q=${query}&sort=newest`);
};

/**
 * Searching the authors according to query.
 * @param {String} query
 * @returns Axios Promise
 */
export const searchAuthors = (query) => {
  return apicall.get(`/api/user/search?q=${query}`);
};

/**
 * Searching Tags according to Query.
 * @param {String} query
 * @returns Axios Promise
 */
export const searchTags = (query) => {
  return apicall.get(`/api/tag/search?q=${query}`);
};

/**
 * Searchs Blog according to tag.
 * @param {String} tag
 * @returns Axios Promise
 */
export const searchByTag = (tag) => {
  return apicall.get(`/api/blogs?tag=${tag}&sort=newest`);
};
