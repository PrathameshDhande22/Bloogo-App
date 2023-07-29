import Prop from "prop-types";
import { BlogCard } from "../BlogCard";

export const BlogCards = ({ blogs }) => {
  return (
    <>
      {blogs.map((value, index) => {
        return (
          <BlogCard
            content={value.content}
            date={value.createdon}
            id={value.id}
            key={index}
            name={value.name}
            tag={value.tag}
            thumbnail={value.thumbnail}
            title={value.title}
          />
        );
      })}
    </>
  );
};

BlogCards.propTypes = {
  blogs: Prop.array,
};
