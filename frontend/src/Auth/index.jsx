import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useToken } from "../Hooks/useToken";
import { setLogin, removeLogin } from "../Store/Reducer/LoginSlice";
import { removeData } from "../Store/Reducer/DataSlice";
import { verifyUser } from "../api/api";
import { deleteToken } from "../utils/storetoken";
import Spinner from "../components/Spinner";

const AuthProvider = () => {
  const [permission, setPermission] = useState(false);

  const dispatch = useDispatch();
  const token = useToken();
  const navi = useNavigate();

  useEffect(() => {
    const handleLogin = () => {
      dispatch(setLogin());
      setPermission(true);
    };

    const handleLogout = () => {
      dispatch(removeData());
      dispatch(removeLogin());
      deleteToken();
      setPermission(false);
      navi("/");
    };

    verifyUser(token)
      .then((res) => {
        if (res.status === 200) {
          handleLogin();
        }
      })
      .catch(() => {
        handleLogout();
      });
  }, [token, dispatch, navi]);

  if (permission) {
    return <Outlet />;
  } else {
    <Spinner />;
  }
};
export default AuthProvider;
