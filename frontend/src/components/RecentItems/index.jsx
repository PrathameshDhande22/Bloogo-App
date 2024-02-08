import { Close } from "@mui/icons-material";
import { getHistory, removeHistory } from "../../utils/history";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

export const RecentItems = () => {
  const navi = useNavigate();
  const [query, setQuery] = useState([]);

  useEffect(() => {
    setQuery(getHistory());
  }, []);

  const handleDelete = useCallback(
    (value) => {
      removeHistory(value);
      setQuery(getHistory);
    },
    []
  );
  return (
    <>
      {query.length == 0 || query === 0 ? (
        <div className="font-ysb text-lg sm:text-xl h-[80vh]">
          There are no Recent Searches
        </div>
      ) : (
        <div className="sm:w-[40%] font-gara sm:text-xl text-base w-full border-2 border-gray-200">
          {query.map((value, index) => {
            return (
              <div key={index}>
                <div className="flex flex-row border-b-2 border-gray-100 justify-between items-center w-full p-1 gap-1">
                  <button
                    onClick={() => {
                      navi({ pathname: "/search/blog", search: `q=${value}` });
                    }}
                    className="w-full flex p-2"
                  >
                    {value}
                  </button>
                  <button
                    type="button"
                    className="p-2"
                    onClick={() => {
                      handleDelete(value);
                    }}
                  >
                    <Close />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
