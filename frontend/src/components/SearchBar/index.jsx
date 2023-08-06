import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { addHistory } from "../../utils/history";

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navi = useNavigate();

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      addHistory(searchValue);
      navi({ pathname: "/search/blog", search: `?q=${searchValue}` });
    }
  };

  return (
    <div>
      <div
        onKeyDown={onKeyDown}
        className="rounded-full  py-1 px-2 font-serif bg-gray-100 flex-row items-center gap-2 hidden sm:flex"
      >
        <button
          onClick={() => {
            addHistory(searchValue);
            navi({ pathname: "/search/blog", search: `?q=${searchValue}` });
          }}
          type="submit"
          id="searchbutton"
        >
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
      <div className="flex sm:hidden flex-row items-center">
        <button className="p-2" type="button" onClick={() => navi("/search")}>
          <BiSearch fontSize={27} color="grey" />
        </button>
      </div>
    </div>
  );
};
