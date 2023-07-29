import { GrArticle } from "react-icons/gr";
import { SimpleSpinner } from "../../components/SimpleSpinner";
import { getBlogs } from "../../service/api";
import { useEffect, useState } from "react";
import { ServiceError } from "../../components/ServiceError";
import { BlogCards } from "../../components/BlogCards";
import { Pagination } from "@mui/material";
import { useTitle } from "../../Hooks/useTitle";

// TODO : Implement Blog Side Bar
export const Blogs = () => {
  useTitle("Blogs");
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, settotalPage] = useState(0);

  useEffect(() => {
    const Per_Page = 6;
    setLoading(true);
    getBlogs()
      .then((res) => {
        if (res.status === 200) {
          setBlogs(
            res.data.blogs.slice((page - 1) * Per_Page, Per_Page * page)
          );
          let pages = Math.ceil(res.data.Total_Blogs / Per_Page);
          settotalPage(pages);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [page]);

  const handleChange = (e, val) => {
    setPage(val);
  };

  return (
    <>
      <div className="mx-3 md:mx-28 my-5">
        <div className="flex flex-col flex-wrap justify-center items-center gap-6">
          <span className="flex flex-row gap-2 justify-center items-center text-lg md:text-xl font-display self-start px-7 py-2 border-b-4 border-indigo-600 select-none">
            <GrArticle fontSize={30} /> Latest Blogs
          </span>
          <div className="self-start w-full flex flex-col gap-4">
            {isLoading ? (
              <SimpleSpinner />
            ) : (
              <ServiceError error={isError}>
                <BlogCards blogs={blogs} />
              </ServiceError>
            )}
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
    </>
  );
};
