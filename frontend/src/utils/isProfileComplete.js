/**
 * Checks whether the profile is complete or not
 * @param {String} firstname
 * @param {String} lastname
 * @param {String} dob
 * @returns {Boolean} true **If Profile is Complete** else false
 */
const isProfileComplete = (firstname, lastname, dob) => {
  if (firstname === null || lastname === null || dob === null) {
    return false;
  }
  return true;
};

export default isProfileComplete;
