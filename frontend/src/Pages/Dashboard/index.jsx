import { useEffect, useState } from "react";
import { useTitle } from "../../Hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../Hooks/useToken";
import Spinner from "../../components/Spinner";
import { getUserBlogs } from "../../api/api";
import { Add } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import { BlogCards } from "../../components/BlogCards";

export const Dashboard = () => {
  const [isLoading, setLoading] = useState(false);
  const [total_pg, setTotal_pg] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, settotalPage] = useState(0);

  useTitle("Dashboard");
  const token = useToken();
  const navi = useNavigate();

  useEffect(() => {
    setLoading(true);
    const Per_Page = 6;
    getUserBlogs(token)
      .then((res) => {
        if (res.status === 200) {
          setBlogs(
            res.data.blogs.slice((page - 1) * Per_Page, Per_Page * page)
          );
          let pages = Math.ceil(res.data.Total_Blogs / Per_Page);
          settotalPage(pages);
          setLoading(false);
          setTotal_pg(res.data?.Total_Blogs);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [token, page]);

  const handleChange = (e, val) => {
    setPage(val);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : total_pg === 0 ? (
        <div className="flex flex-col justify-center items-center h-[90vh] bg-slate-100">
          <div className="flex font-meri md:text-2xl text-xl flex-col flex-wrap justify-center items-center gap-6 my-7 mx-4">
            <div>{"You Don't Have Any Blogs"}</div>
            <button
              onClick={() => {
                navi("/blog/new");
              }}
              className="flex flex-row items-center gap-2 text-sm md:text-xl bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <span>Create Your First Blog</span>
              <Add sx={{ fontSize: 40, color: "white" }} />
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-3 my-10 md:mx-20 space-y-3">
          <div className="text-2xl md:text-4xl font-gara font-bold self-start">
            Dashboard
          </div>
          <div className="flex flex-col flex-wrap justify-center items-center gap-6">
            <span className="self-start font-gara sm:text-xl">
              Total Blogs : {total_pg}
            </span>
            <span className="font-lum self-start font-bold border-b-2 border-indigo-500 w-32">
              Your Blogs :{" "}
            </span>
            <div className="flex flex-col w-full gap-3 flex-wrap">
              <BlogCards blogs={blogs} showbuttons />
            </div>
            <Pagination
              page={page}
              count={totalPage}
              color="primary"
              showFirstButton
              showLastButton
              size="large"
              onChange={handleChange}
              variant="text"
            />
          </div>
        </div>
      )}
    </>
  );
};
