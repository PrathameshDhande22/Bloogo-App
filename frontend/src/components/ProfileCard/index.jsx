import Prop from "prop-types";
import { useEffect, useState } from "react";
import { getImageURL } from "../../utils/imageurl";
import { Avatar, Badge } from "@mui/material";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
export const ProfileCard = ({
  id,
  firstname,
  lastname,
  profileurl,
  isverified,
}) => {
  const [imgsrc, setImgsrc] = useState(null);

  useEffect(() => {
    if (profileurl !== null) {
      const imgsrc = getImageURL(profileurl);
      setImgsrc(imgsrc);
    }
  }, [profileurl]);

  return (
    <div className="flex flex-col flex-wrap  justify-center border-2 border-gray-300 rounded-lg p-3 w-full md:w-9/12">
      <Link
        to={`/author/${id}`}
        replace
        className="flex flex-row items-center gap-4"
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            isverified ? (
              <MdVerified
                fontSize={20}
                className="text-blue-500 bg-white rounded-full"
              />
            ) : null
          }
        >
          <Avatar src={imgsrc} sx={{ width: 80, height: 80 }} />
        </Badge>
        <div className="font-gara text-xl">{firstname + " " + lastname}</div>
      </Link>
    </div>
  );
};

ProfileCard.propTypes = {
  id: Prop.string,
  firstname: Prop.string,
  lastname: Prop.string,
  profileurl: Prop.string,
  isverified: Prop.bool,
};
