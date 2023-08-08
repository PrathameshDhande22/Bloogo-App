import { NavLink, Outlet } from "react-router-dom";
import { useTitle } from "../../Hooks/useTitle";
import Prop from "prop-types";

export const SearchPage = ({ searchParams }) => {
  useTitle(`Search ${searchParams.get("q").toString()}`);

  return (
    <div className="space-y-4 pt-4">
      <div className="font-spec text-xl space-x-2 sm:text-4xl font-extrabold">
        <span className="text-slate-400">Results for</span>
        <span>{searchParams.get("q").toString()}</span>
      </div>
      <div className="space-y-4 pt-3 font-lum font-semibold flex flex-col justify-center items-center">
        <span className="block w-full sm:w-3/4">Search By</span>
        <div className="w-full md:w-3/4 font-spec font-semibold select-none flex flex-row items-center border-b-2 border-gray-100 tracking-wide">
          <NavLink
            to={{ pathname: "blog", search: `${searchParams}` }}
            className="w-full text-center"
          >
            {({ isActive }) => (
              <div
                className={`${
                  isActive
                    ? "border-b-2 border-black"
                    : "text-gray-400 hover:text-black transition-colors"
                } p-2 w-full `}
              >
                Blogs
              </div>
            )}
          </NavLink>
          <NavLink
            to={{ pathname: "author", search: `${searchParams}` }}
            className="w-full text-center"
          >
            {({ isActive }) => (
              <div
                className={`${
                  isActive
                    ? "border-b-2 border-black"
                    : "text-gray-400 hover:text-black transition-colors"
                } p-2 w-full `}
              >
                Author
              </div>
            )}
          </NavLink>
          <NavLink
            to={{ pathname: "tag", search: `${searchParams}` }}
            className="w-full text-center"
          >
            {({ isActive }) => (
              <div
                className={`${
                  isActive
                    ? "border-b-2 border-black"
                    : "text-gray-400 hover:text-black transition-colors"
                } p-2 w-full `}
              >
                Tags
              </div>
            )}
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

SearchPage.propTypes = {
  searchParams: Prop.any,
};
