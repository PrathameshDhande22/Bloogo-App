import { Link } from "react-router-dom";
import Prop from "prop-types";
import parse from "html-react-parser";
import dayjs from "dayjs";

export const BlogCard = ({
  name,
  date,
  id,
  title,
  content,
  thumbnail,
  tag,
  authorid,
}) => {
  const formatedDate = dayjs(date).format("DD MMMM YYYY").toString();
  return (
    <div className="px-3 py-2 border-2 border-gray-200 rounded-md inline-block md:w-9/12 w-full">
      <div className="space-y-2">
        <span className="font-gara text-base space-x-1">
          <span className="font-bold hover:border-b-2 border-indigo-500 ">
            <Link to={`/author/${authorid}`}>{name}</Link>
          </span>
          <span>.</span>
          <span className="italic">{formatedDate}</span>
        </span>
        <div className="space-y-3">
          <Link to={`/blog/${id}`}>
            <div className="flex flex-row gap-3 md:gap-10 items-center justify-be">
              <div className="space-y-5 md:w-3/4 w-full">
                <div className="font-noto md:text-2xl text-sm sm:text-xl font-bold line-clamp-2">
                  {title}
                </div>
                <div className="font-noto text-sm font-thin sm:line-clamp-2 hidden lg:line-clamp-4 md:line-clamp-3 text-justify">
                  {parse(content)}
                </div>
              </div>
              <div>
                <img src={thumbnail} alt="" />
              </div>
            </div>
          </Link>
          <span className="px-3 inline-block py-1 bg-neutral-100 rounded-2xl border-2 border-gray-400 font-meri text-xs">
            <Link to={`/blog/tags/${tag}`}>
              <span>{tag}</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  name: Prop.string,
  date: Prop.string,
  id: Prop.string,
  title: Prop.string,
  content: Prop.string,
  thumbnail: Prop.any,
  tag: Prop.string,
  authorid: Prop.string,
};
