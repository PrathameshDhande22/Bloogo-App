import Prop from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { verifyUser } from "../../service/api";
import { useToken } from "../../Hooks/useToken";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

export const RemoveAccess = ({ element }) => {
  const navi = useNavigate();
  const [isAuthentic, setAuthentic] = useState(true);
  const token = useToken();
  useEffect(() => {
    if (token != null) {
      verifyUser(token)
        .then((res) => {
          if (res.status === 200) {
            navi(-1);
          }
        })
        .catch(() => {
          setAuthentic(false);
        });
    } else {
      setAuthentic(false);
    }
  }, [token, navi]);
  return isAuthentic ? <Spinner /> : element;
};

RemoveAccess.propTypes = {
  element: Prop.node,
};
