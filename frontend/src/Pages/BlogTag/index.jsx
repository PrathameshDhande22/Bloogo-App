import { useParams } from "react-router-dom";
import { useTitle } from "../../Hooks/useTitle";
import { useCallback, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { searchByTag } from "../../api/api";
import { BlogCards } from "../../components/BlogCards";
import LoadMoreButton from "../../components/LoadMoreButton";

export const BlogTag = () => {
  const params = useParams()?.tagname;

  useTitle(`Tag ${params}`);
  const [totalBlog, setTotalBlog] = useState(0);
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [clicks, setClicks] = useState(4);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchByTag(params)
      .then((res) => {
        setLoading(false);
        setTotalBlog(res.data?.Total_Blogs);
        setBlogData(res.data?.blogs.slice(0, 4));
      })
      .catch(() => {
        setLoading(false);
      });
  }, [params]);

  const loadmoreClick = useCallback(() => {
    setLoadMore(true);
    setClicks(clicks + 4);
    searchByTag(params)
      .then((res) => {
        setLoadMore(false);
        setTotalBlog(res.data?.Total_Blogs);
        setBlogData(res.data?.blogs.slice(0, clicks + 4));
      })
      .catch(() => {
        setLoadMore(false);
      });
  }, [params, clicks]);

  return (
    <div className="my-9 mx-3 flex flex-col justify-center items-center gap-6">
      <div className="font-noto font-extrabold text-2xl md:text-4xl uppercase text-center select-none">
        {params}
      </div>
      {!isLoading ? (
        <>
          <div className="space-x-3 font-lum">
            <span>Total Blogs</span>
            <span>{totalBlog}</span>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-9/12">
            <BlogCards blogs={blogData} />
          </div>
          <div className="w-full md:w-9/12">
            {totalBlog > clicks ? (
              <LoadMoreButton isLoading={loadMore} onClick={loadmoreClick} />
            ) : null}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
