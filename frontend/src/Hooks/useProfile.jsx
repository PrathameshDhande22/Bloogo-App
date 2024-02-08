import { useContext } from "react";
import { ProfileData } from "../components/ProfileContext";

const useProfile = () => {
  const profiledata = useContext(ProfileData);
  return profiledata;
};
export default useProfile;
