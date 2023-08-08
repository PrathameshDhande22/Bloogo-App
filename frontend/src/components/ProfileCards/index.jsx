import { ProfileCard } from "../ProfileCard";
import Prop from "prop-types";

export const ProfileCards = ({ authors }) => {
  return (
    <>
      {authors.map((value, index) => {
        return (
          <ProfileCard
            key={index}
            id={value?.id}
            firstname={value?.firstname}
            lastname={value?.lastname}
            isverified={value?.isverified}
            profileurl={value?.profileurl}
          />
        );
      })}
    </>
  );
};

ProfileCards.propTypes = {
  authors: Prop.array,
};
