import { Link } from "react-router-dom";
import { GitHub } from "@mui/icons-material";
import "animate.css";
import { useTitle } from "../../Hooks/useTitle";

export const Developers = () => {
  useTitle("Developer");

  const checkoutPage = () => {
    window.location.href = "https://www.github.com/PrathameshDhande22";
  };

  return (
    <div className="my-5 md:my-10 flex flex-row justify-around mx-5 flex-wrap items-start gap-6">
      <div className="flex flex-col flex-wrap gap-10 justify-center items-center">
        <span className="text-2xl md:text-4xl font-gara font-bold p-2 border-b-4 border-indigo-600">
          Our Developers & Creators
        </span>
        <span className="z-50 relative w-56 md:w-72 lg:w-96 slide-in-bck-center animate__animated animate__slideInLeft animate__slow overflow-hidden">
          <img
            src="https://ucarecdn.com/698b231f-8316-4eae-8c41-0d420cad29cc/-/preview/600x600/-/quality/smart/-/format/auto/profile-pic.png"
            alt="Developer Profile"
            className="z-10 border-2 border-black rounded-xl cursor-pointer object-contain hover:scale-110 transition-{scale} ease-in-out duration-200"
            onClick={checkoutPage}
          />
          <div className="absolute bottom-0 text-white border-2 border-none rounded-b-xl bg-black opacity-60 flex flex-col justify-center items-center w-full p-2 hover:opacity-100">
            <span className="font-lum text-base md:text-lg">
              Prathamesh Dhande
            </span>
            <Link to={"https://www.github.com/PrathameshDhande22"}>
              <GitHub
                key={0}
                style={{ fontSize: 25 }}
                className="hover:text-white"
              />
            </Link>
            <span className="font-mono italic animate__animated animate__bounceIn animate__slower">
              Bloogo Developer
            </span>
          </div>
        </span>
      </div>
      <div className="flex flex-col flex-wrap gap-10 ">
        <span className="text-2xl md:text-4xl font-gara font-bold p-2 border-b-4 border-indigo-600">
          Technologies Used
        </span>
        <span className="grid grid-cols-2 justify-items-center place-content-evenly gap-5 animate__animated animate__slideInRight animate__slow">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg"
            className="w-16"
          />
          <img
            className="w-16"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
          />
          <img
            className="w-16"
            src="https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/tailwindcss/tailwindcss-original.svg"
          />
          <img
            className="w-16"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg"
          />
          <img
            className="w-16"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
          />
          <img
            className="w-16"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-plain-wordmark.svg"
          />
          <img
            className="w-16"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg"
          />
          <img
            className="w-16"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
          />
        </span>
      </div>
    </div>
  );
};
