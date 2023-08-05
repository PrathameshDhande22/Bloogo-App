import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { getAuthorData } from "../../api/api";
import { Error } from "../Error";
import { useTitle } from "../../Hooks/useTitle";
import { getImageURL } from "../../utils/imageurl";
import { Avatar, Badge } from "@mui/material";
import isProfileComplete from "../../utils/isProfileComplete";
import dayjs from "dayjs";
import { MdPostAdd, MdVerified } from "react-icons/md";
import { ProfileBlog } from "../../components/ProfileBlog";

export const PublicProfile = () => {
  const [isLoading, setLoading] = useState(false);
  const [authorData, setAuthorData] = useState({});
  const [imgsrc, setImgsrc] = useState(null);
  const [isError, setError] = useState(false);

  useTitle(
    authorData?.profile?.firstname === null
      ? "Profile"
      : authorData?.profile?.firstname
  );
  const authorid = useParams()?.authorid;

  useEffect(() => {
    setLoading(true);
    getAuthorData(authorid)
      .then((res) => {
        setAuthorData(res.data);
        setLoading(false);
        if (res.data?.profile?.profileurl !== null) {
          setImgsrc(getImageURL(res.data?.profile?.profileurl));
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [authorid]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Error />
      ) : (
        <div className="my-7 mx-3 md:mx-28">
          <div className="flex flex-col gap-10">
            <div className="space-y-5 font-noto ">
              <div className="text-xl font-gara border-b-4 border-indigo-600 inline pe-3">
                User Profile :{" "}
              </div>
              <div className="flex flex-row justify-center items-center flex-wrap gap-10 w-full">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    authorData?.profile?.isverified ? (
                      <MdVerified
                        fontSize={40}
                        className="text-blue-500 bg-white rounded-full"
                      />
                    ) : null
                  }
                >
                  <Avatar src={imgsrc} sx={{ width: 130, height: 130 }} />
                </Badge>
                <div className="flex flex-col justify-start items-start gap-1 border-2 border-gray-200 sm:px-9 sm:py-5 p-4 rounded-lg text-sm md:text-base">
                  {isProfileComplete(
                    authorData?.profile?.firstname,
                    authorData?.profile?.lastname,
                    authorData?.profile?.dob
                  ) ? (
                    <div className="flex flex-col gap-1 select-none">
                      <span>
                        Name :{" "}
                        {authorData?.profile?.firstname +
                          " " +
                          authorData?.profile?.lastname}
                      </span>
                      <span>
                        Born On :{" "}
                        {dayjs(authorData?.profile?.dob)
                          .format("DD-MMMM-YYYY")
                          .toString()}
                      </span>
                    </div>
                  ) : (
                    <div className="self-center border-2 border-gray-400 px-6 py-2 opacity-40">
                      Profile is Incomplete !
                    </div>
                  )}
                  <span className="opacity-50 self-center font-raj font-bold">
                    Joined On{" "}
                    {dayjs(authorData?.profile?.createdon)
                      .format("MMMM YYYY")
                      .toString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="font-gara flex flex-col flex-wrap justify-center gap-5">
              <div className="text-xl self-start font-gara border-b-4 border-indigo-600 inline pe-3 py-1">
                Blogs :
              </div>
              {authorData?.blogs?.Total_Blogs === 0 ? (
                <div
                  className="flex flex-row gap-7 flex-wrap font-serif text-gray-400 sm:text-4xl bg-gray-100 text-xl border-2 border-gray-400 rounded-lg p-16
                 justify-center items-center"
                >
                  <MdPostAdd fontSize={60} />
                  <span>No Blogs</span>
                </div>
              ) : (
                <div className="flex flex-col gap-6 items-start w-full">
                  <div className="font-gara text-xl">
                    Total Blogs : {authorData?.blogs?.Total_Blogs}
                  </div>
                  <ProfileBlog blogdata={authorData?.blogs} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
