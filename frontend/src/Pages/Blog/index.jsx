import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { viewBlog } from "../../api/api";
import Spinner from "../../components/Spinner";
import { Error } from "../Error";
import { BlogView } from "../../components/BlogView";

export const Blog = () => {
  const [blogdata, setBlogdata] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const blogid = useParams()?.blogid;

  useEffect(() => {
    setIsLoading(true);
    viewBlog(blogid)
      .then((res) => {
        setIsLoading(false);
        setBlogdata(res.data);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [blogid]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Error />
      ) : (
        <BlogView blogdata={blogdata} key={2} />
      )}
    </>
  );
};
