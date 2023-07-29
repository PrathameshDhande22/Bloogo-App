import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { GitHub, LinkedIn, Instagram, Favorite } from "@mui/icons-material";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

export const IconsFooter = [
  {
    icon: (
      <GitHub
        key={0}
        style={{ fontSize: 30 }}
        className="hover:text-indigo-600"
      />
    ),
    link: "https://www.github.com/Prathameshdhande22",
    classname: "github",
    title: "Github",
  },
  {
    icon: (
      <LinkedIn
        key={1}
        style={{ fontSize: 30 }}
        className="hover:text-indigo-600"
      />
    ),
    link: "https://www.linkedin.com/in/prathamesh-dhande-3a039721a/",
    classname: "linkedin",
    title: "LinkedIn",
  },
  {
    icon: (
      <Instagram
        key={2}
        style={{ fontSize: 30 }}
        className="hover:text-indigo-600"
      />
    ),
    link: "https://instagram.com/prathameshdhande5139",
    classname: "insta",
    title: "Instagram",
  },
];

const Footer = () => {
  return (
    <footer className=" bg-indigo-100 py-7 flex flex-col justify-center items-center gap-6">
      <div className="flex justify-center items-center gap-4 flex-col flex-wrap md:gap-8">
        <NavLink to={"/"}>
          <img
            src="/straightlogo.png"
            alt="bloogo icon"
            className="w-40 md:w-48"
          />
        </NavLink>
        <div className="flex flex-row justify-center items-center gap-6 md:gap-10 text-base md:text-lg uppercase font-thin font-gara flex-wrap text-indigo-600 ">
          <NavLink to={"/"}>
            <span className="hover:text-black">Home</span>
          </NavLink>
          <NavLink to={"/about"}>
            <span className="hover:text-black">About</span>
          </NavLink>
          <NavLink to={"/blogs"}>
            <span className="hover:text-black">Blogs</span>
          </NavLink>
          <NavLink to={"/developer"}>
            <span className="hover:text-black">Developers</span>
          </NavLink>
        </div>
        <div className="flex flex-row gap-5 flex-wrap">
          {IconsFooter.map((value, index) => {
            return (
              <Link to={value.link} key={index}>
                <Tooltip
                  anchorSelect={`.${value.classname}`}
                  place="bottom"
                  variant="info"
                  noArrow
                  offset={1}
                >
                  {value.title}
                </Tooltip>
                <button
                  className={`border-indigo-600 border-2 rounded-full p-2 ${value.classname}`}
                >
                  {value.icon}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col flex-wrap justify-center items-center gap-2 text-base">
        <span>Copyright © 2023 All rights reserved</span>
        <span>
          Made with <Favorite style={{ color: "red", fontSize: 18 }} /> by{" "}
          <a href={IconsFooter[0].link} className="text-indigo-600">
            Prathamesh Dhande
          </a>
        </span>
      </div>
    </footer>
  );
};
export default Footer;
