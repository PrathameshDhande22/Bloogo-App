import { useEffect, useState } from "react";
import Prop from "prop-types";
import { BlogCards } from "../BlogCards";
import { SimpleSpinner } from "../SimpleSpinner";
import { Pagination } from "@mui/material";

export const ProfileBlog = ({ blogdata }) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, settotalPage] = useState(0);

  useEffect(() => {
    const Per_Page = 6;
    setLoading(true);
    setBlogs(blogdata?.blogs?.slice((page - 1) * Per_Page, Per_Page * page));
    let pages = Math.ceil(blogdata?.Total_Blogs / Per_Page);
    settotalPage(pages);
    setLoading(false);
  }, [page, blogdata]);

  const handleChange = (e, val) => {
    setPage(val);
  };

  return (
    <>
      <div className="flex flex-col gap-2 flex-wrap lg:w-[70%] w-full ">
        {isLoading ? <SimpleSpinner /> : <BlogCards blogs={blogs} />}
      </div>
      <Pagination
        page={page}
        count={totalPage}
        color="primary"
        showFirstButton
        showLastButton
        size="middle"
        onChange={handleChange}
        variant="text"
      />
    </>
  );
};

ProfileBlog.propTypes = {
  blogdata: Prop.object,
};
