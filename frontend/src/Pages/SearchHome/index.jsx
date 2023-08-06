import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Recents } from "../../components/Recents";
import { addHistory } from "../../utils/history";

export const SearchHome = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const navi = useNavigate();
  const handleSearching = () => {
    addHistory(searchValue);
    setSearchParams({ q: `${searchValue}` });
    navi({ pathname: "/search/blog", search: `q=${searchValue}` });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearching();
    }
  };

  return (
    <div className=" mx-5 my-6 space-y-6 sm:mx-[10%]">
      <div className="visible sm:hidden w-full">
        <div
          onKeyDown={onKeyDown}
          className="rounded-full  py-1 px-2 font-serif bg-gray-100 flex-row items-center gap-2 flex"
        >
          <button onClick={handleSearching} type="submit" id="searchbutton">
            <BiSearch fontSize={23} />
          </button>
          <input
            type="text"
            placeholder="Search Bloogo"
            className="border-none w-full text-black bg-gray-100 outline-none py-1"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
      </div>
      {searchParams.get("q") === null || searchParams.get("q").length === 0 ? (
        <Recents />
      ) : (
        <Outlet />
      )}
    </div>
  );
};
