import Prop from "prop-types";
import { Link } from "react-router-dom";

export const Tags = ({ tagList }) => {
  return (
    <div className="flex flex-row flex-wrap gap-7 font-meri text-sm md:text-base md:w-9/12 w-full">
      {tagList.map((value, index) => {
        return (
          <Link to={`/tags/${value}`} key={index}>
            <span className="px-4 inline-block py-2 bg-gray-200 rounded-full">
              {value}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

Tags.propTypes = {
  tagList: Prop.array,
};
