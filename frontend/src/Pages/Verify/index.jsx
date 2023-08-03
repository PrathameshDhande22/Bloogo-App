import { useDispatch } from "react-redux";
import { useToken } from "../../Hooks/useToken";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail, getProfile } from "../../api/api";
import { useEffect } from "react";
import { setData } from "../../Store/Reducer/DataSlice";
import { useTitle } from "../../Hooks/useTitle";
import { GoVerified } from "react-icons/go";
import { MdDangerous } from "react-icons/md";
import Spinner from "../../components/Spinner";

export const Verify = () => {
  useTitle("Email Verification");
  const tokendata = useParams();
  const token = useToken();
  const navi = useNavigate();
  const dispatch = useDispatch();
  const [istrue, setIsTrue] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setprofile = (newdata) => {
      dispatch(setData(newdata));
    };

    verifyEmail(tokendata.token)
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setIsTrue(true);

          if (token !== undefined) {
            getProfile(token)
              .then((res) => {
                setprofile(res.data);
              })
              .catch((res) => {
                console.log(res);
              });
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [token, dispatch, tokendata, navi]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : istrue ? (
        <div className="flex flex-col uppercase justify-center items-center my-4 gap-4 font-raj font-bold text-2xl">
          <span>Your Account has Been Verified.</span>
          <span>
            <GoVerified fontSize={60} color="#29c706" />
          </span>
        </div>
      ) : (
        <div className="flex flex-col uppercase justify-center items-center my-4 gap-4 font-raj font-bold text-2xl">
          <span>Something went Wrong </span>
          <span>
            <MdDangerous fontSize={60} color="red" />
          </span>
        </div>
      )}
    </>
  );
};
