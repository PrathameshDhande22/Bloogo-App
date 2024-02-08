import { createContext } from "react";
import PropTypes from "prop-types";
import { getProfile } from "../../api/api";
import { useToken } from "../../Hooks/useToken";
import { setData } from "../../Store/Reducer/DataSlice";
import { useDispatch } from "react-redux";

export const ProfileData = createContext();

const ProfileContext = ({ children }) => {
  const dispatch = useDispatch();
  const token = useToken();

  const saveProfile = () => {
    getProfile(token)
      .then((res) => {
        dispatch(setData(res.data));
      })
      .catch(() => {});
  };
  return (
    <ProfileData.Provider value={{ saveProfile }}>
      {children}
    </ProfileData.Provider>
  );
};
export default ProfileContext;

ProfileContext.propTypes = {
  children: PropTypes.node,
};
