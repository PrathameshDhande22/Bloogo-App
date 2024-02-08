import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { GitHub, LinkedIn, Instagram, Favorite } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";

const IconsFooter = [
  {
    icon: <GitHub key={0} style={{ fontSize: 30 }} />,
    link: "https://github.com/PrathameshDhande22/Bloogo-App",
    classname: "github",
    title: "Github",
  },
  {
    icon: <LinkedIn key={1} style={{ fontSize: 30 }} />,
    link: "https://www.linkedin.com/in/prathamesh-dhande-3a039721a/",
    classname: "linkedin",
    title: "LinkedIn",
  },
  {
    icon: <Instagram key={2} style={{ fontSize: 30 }} />,
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
        <div className="flex flex-row mx-3 gap-5 flex-wrap">
          {IconsFooter.map((value, index) => {
            return (
              <Tooltip
                key={index}
                title={value.title}
                arrow
                placement="top-start"
              >
                <Link to={value.link} key={index}>
                  <button
                    className={`border-indigo-600 border-2 rounded-full hover:text-indigo-600 p-2`}
                  >
                    {value.icon}
                  </button>
                </Link>
              </Tooltip>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col flex-wrap justify-center items-center gap-2 mx-3 text-base">
        <span>Copyright © 2024 All rights reserved</span>
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
