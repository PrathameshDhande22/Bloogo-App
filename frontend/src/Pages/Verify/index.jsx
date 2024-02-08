import { useDispatch } from "react-redux";
import { useToken } from "../../Hooks/useToken";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../api/api";
import { useEffect } from "react";
import { useTitle } from "../../Hooks/useTitle";
import { GoVerified } from "react-icons/go";
import { MdDangerous } from "react-icons/md";
import Spinner from "../../components/Spinner";
import { FaExclamation } from "react-icons/fa";
import useProfile from "../../Hooks/useProfile";

export const Verify = () => {
  useTitle("Email Verification");
  const tokendata = useParams();
  const token = useToken();
  const navi = useNavigate();
  const dispatch = useDispatch();
  const [istrue, setIsTrue] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { saveProfile } = useProfile();

  useEffect(() => {
    verifyEmail(tokendata.token)
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setIsTrue(true);

          if (token !== undefined) {
            saveProfile();
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [token, dispatch, tokendata, navi, saveProfile]);

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
          <span className="flex space-x-2 items-center">
            Verification Code is Invalid
            <FaExclamation />{" "}
          </span>
          <span>
            <MdDangerous fontSize={60} color="red" />
          </span>
        </div>
      )}
    </>
  );
};
