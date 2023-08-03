import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import "animate.css";
import "./index.css";
import { useToken } from "../../Hooks/useToken";
import { useSelector, useDispatch } from "react-redux";
import { verifyUser } from "../../api/api";
import { removeLogin, setLogin } from "../../Store/Reducer/LoginSlice";
import { Profile } from "../Profile";
import { deleteToken } from "../../utils/storetoken";
import { VerifyHeader } from "../VerifyHeader";

const Header = () => {
  const isAuthentic = useSelector((state) => state.login.isLogin);
  const location = useLocation();
  const isVerified = useSelector((state) => state.udata.userData?.isverified);
  const [isnavOpen, setnavOpen] = useState(false);
  const navi = useNavigate();
  const handleclick = () => {
    setnavOpen((prev) => !prev);
  };
  const dispatch = useDispatch();
  const token = useToken();

  useEffect(() => {
    const handleLogin = () => {
      dispatch(setLogin());
    };

    const handleLogout = () => {
      dispatch(removeLogin());
    };

    verifyUser(token)
      .then((res) => {
        if (res.status === 200) {
          handleLogin();
        }
      })
      .catch(() => {
        deleteToken();
        handleLogout();
      });
  }, [token, dispatch]);

  return (
    <>
      <header className="flex select-none flex-row justify-between items-center md:m-3 m-2 z-10">
        <NavLink to={"/"}>
          <img
            src="/favicon.ico"
            alt="bloogo icon"
            className="hover:w-9 transition-{w} ease-in duration-150"
          />
        </NavLink>
        <nav className="flex flex-row justify-center gap-10 items-center">
          <div
            className={
              "font-meri text-base hidden md:visible items-start justify-start md:flex flex-row gap-10"
            }
          >
            <NavLink to={"/"} onClick={handleclick}>
              {({ isActive }) => (
                <span
                  className={
                    isActive
                      ? "navlink-active"
                      : "hover:text-xl transition-{text} ease-in duration-100"
                  }
                >
                  Home
                </span>
              )}
            </NavLink>
            <NavLink to="/about">
              {({ isActive }) => (
                <span
                  className={
                    isActive
                      ? "navlink-active"
                      : "hover:text-xl transition-{text} ease-in duration-100"
                  }
                >
                  About
                </span>
              )}
            </NavLink>
            <NavLink to="/blogs">
              {({ isActive }) => (
                <span
                  className={
                    isActive
                      ? "navlink-active"
                      : "hover:text-xl transition-{text} ease-in duration-100"
                  }
                >
                  Blogs
                </span>
              )}
            </NavLink>
            <NavLink to="/developer">
              {({ isActive }) => (
                <span
                  className={
                    isActive
                      ? "navlink-active"
                      : "hover:text-xl transition-{text} ease-in duration-100"
                  }
                >
                  Developers
                </span>
              )}
            </NavLink>
          </div>

          <div className="flex flex-wrap flex-row justify-center items-center gap-2 text-xs md:text-sm">
            {isAuthentic ? (
              <Profile />
            ) : (
              <>
                <button
                  onClick={() => {
                    navi("/login");
                  }}
                  className="font-meri border-2 border-black py-2 px-5 rounded-md hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navi("/signup");
                  }}
                  className="font-meri border-2 border-black py-2 px-5 rounded-md bg-black text-white hover:bg-slate-700"
                >
                  Sign Up
                </button>
              </>
            )}
            <button
              onClick={() => {
                setnavOpen((prev) => !prev);
              }}
              className="font-meri py-2 px-2 rounded-md  md:hidden"
            >
              {isnavOpen ? (
                <GrClose fontSize={30} className="rotate-90-ccw" />
              ) : (
                <GiHamburgerMenu
                  fontSize={30}
                  className="animate__animated animate__lightSpeedInRight"
                />
              )}
            </button>
          </div>
        </nav>
      </header>
      <header
        className={`font-meri text-base justify-center md:hidden items-center flex flex-col space-y-3 bg-indigo-100 py-4 animate__animated z-0 ${
          isnavOpen ? "visible  animate__fadeIn animate__slow" : "hidden"
        }`}
      >
        <NavLink to={"/home"} onClick={handleclick}>
          {({ isActive }) => (
            <span
              className={
                isActive
                  ? "navlink-active"
                  : "hover:text-xl transition-{text} ease-in duration-100"
              }
            >
              Home
            </span>
          )}
        </NavLink>
        <NavLink to="/about" onClick={handleclick}>
          {({ isActive }) => (
            <span
              className={
                isActive
                  ? "navlink-active"
                  : "hover:text-xl transition-{text} ease-in duration-100"
              }
            >
              About
            </span>
          )}
        </NavLink>
        <NavLink to="/blogs" onClick={handleclick}>
          {({ isActive }) => (
            <span
              className={
                isActive
                  ? "navlink-active"
                  : "hover:text-xl transition-{text} ease-in duration-100"
              }
            >
              Blogs
            </span>
          )}
        </NavLink>
        <NavLink to="/developer" onClick={handleclick}>
          {({ isActive }) => (
            <span
              className={
                isActive
                  ? "navlink-active"
                  : "hover:text-xl transition-{text} ease-in duration-100"
              }
            >
              Developers
            </span>
          )}
        </NavLink>
      </header>
      {isVerified ||
      isVerified == undefined ||
      location.pathname == "/send" ||
      location.pathname == "/verify" ? null : (
        <VerifyHeader />
      )}
    </>
  );
};
export default Header;
