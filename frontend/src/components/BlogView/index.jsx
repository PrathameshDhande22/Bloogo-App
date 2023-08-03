import Prop from "prop-types";
import { getThumbnailURL } from "../../utils/imageurl";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import parse from "html-react-parser";

export const BlogView = ({ blogdata }) => {
  const [imgsrc, setImgsrc] = useState(null);
  useEffect(() => {
    if (blogdata?.thumbnail !== null) {
      const img_url = getThumbnailURL(blogdata?.thumbnail);
      setImgsrc(img_url);
    }
  }, [blogdata]);

  return (
    <div className="flex my-5 flex-row w-full justify-center items-center">
      <div className="flex mx-2 flex-col justify-center gap-5 w-full items-center sm:w-[60%]">
        <div>
          {imgsrc == null ? null : <img src={imgsrc} alt="Thumbnail" />}
        </div>
        <div className="font-mono font-extrabold text-2xl sm:text-4xl self-start tracking-wide">
          {blogdata?.title}
        </div>
        <div className="self-start flex flex-col gap-1 ">
          <Link
            to={`/author/${blogdata?.authorid}`}
            className="font-noto font-bold text-sm hover:border-b-2 border-indigo-700"
          >
            {blogdata?.name}
          </Link>
          <span className="font-raj select-none font-semibold italic text-sm">
            {dayjs(blogdata?.createdon).format("DD MMMM YYYY").toString()}
          </span>
        </div>
        <div className="font-noto leading-relaxed tracking-wide">
          {parse(String(blogdata.content))}
        </div>
        <div className="self-start">
          <span className="px-3 inline-block py-1 bg-neutral-100 rounded-2xl border-2 border-gray-400 font-meri text-xs">
            <Link to={`/blog/tags/${blogdata?.tag}`}>
              <span>{blogdata?.tag}</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

BlogView.propTypes = {
  blogdata: Prop.object,
};
