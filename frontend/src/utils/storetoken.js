/**
 * Setting the Access Token in the localStorage
 * @param {String} token
 */
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

/**
 * Deleting the access Token simply means that loging out the account.
 */
export const deleteToken = () => {
  localStorage.removeItem("token");
};
