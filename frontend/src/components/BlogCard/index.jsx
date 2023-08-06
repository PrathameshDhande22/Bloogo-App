import { Link, useNavigate } from "react-router-dom";
import Prop from "prop-types";
import parse from "html-react-parser";
import dayjs from "dayjs";
import { getResizedThumbnailURL } from "../../utils/imageurl";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import { DialogComponent } from "../DialogComponent";
import { deleteBlog } from "../../api/api";
import { useToken } from "../../Hooks/useToken";
import { readingTime } from "reading-time-estimator";

export const BlogCard = ({
  name,
  date,
  id,
  title,
  content,
  thumbnail,
  tag,
  authorid,
  showbuttons,
}) => {
  const [imgsrc, setImgsrc] = useState(null);

  useEffect(() => {
    if (thumbnail !== "null") {
      setImgsrc(getResizedThumbnailURL(thumbnail));
    }
  }, [thumbnail]);

  const navi = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = useToken();

  const deleteblog = () => {
    deleteBlog(id, token)
      .then(() => {
        setOpen(false);
        location.reload();
      })
      .catch(() => {});
  };

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
        <div className="space-y-2">
          <Link to={`/blog/${id}`}>
            <div className="flex flex-row gap-3 md:gap-10 items-center justify-between">
              <div className="space-y-5 md:w-3/4 w-full self-start">
                <div className="font-noto md:text-2xl text-sm sm:text-xl font-bold line-clamp-2">
                  {title}
                </div>
                <div className="font-noto text-sm font-thin sm:line-clamp-2 hidden lg:line-clamp-4 md:line-clamp-3 text-justify">
                  {parse(content)}
                </div>
              </div>
              {imgsrc !== null ? (
                <div className="">
                  <img src={imgsrc} alt="" />
                </div>
              ) : null}
            </div>
          </Link>
          <div className="space-x-3">
            <span className="px-3 inline-block py-1 bg-neutral-100 rounded-2xl border-2 border-gray-400 font-meri text-xs">
              <Link to={`/tags/${tag}`}>
                <span>{tag}</span>
              </Link>
            </span>
            <span className="font-spec text-sm">
              {readingTime(String(content), 50).text}
            </span>
          </div>
        </div>
        {showbuttons ? (
          <div className="w-full pt-2 flex flex-row justify-between gap-5">
            <Tooltip title="Delete Blog" arrow>
              <button
                type="button"
                onClick={handleOpen}
                className="border-2 rounded-lg text-red-500 hover:bg-red-400 transition-colors hover:text-white border-red-500 w-1/2 flex justify-center py-2"
              >
                <AiOutlineDelete fontSize={25} />
              </button>
            </Tooltip>
            <Tooltip title="Edit Blog" arrow>
              <button
                type="button"
                onClick={() => {
                  navi(`/blog/${id}/edit`);
                }}
                className="border-2 rounded-lg border-blue-400 w-1/2 text-blue-600 hover:text-white hover:bg-blue-600 transition-colors flex justify-center py-2"
              >
                <AiOutlineEdit fontSize={25} />
              </button>
            </Tooltip>
          </div>
        ) : null}
      </div>
      <DialogComponent
        open={open}
        title={<div className="font-mono font-bold">Delete</div>}
        actions={
          <div className="flex flex-row gap-2  flex-wrap">
            <button
              className="font-spec text-lg font-bold px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-{bg} ease-in-out duration-200"
              type="button"
              onClick={deleteblog}
            >
              Yes
            </button>
            <button
              className="font-spec text-lg font-bold px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-{bg} ease-in-out duration-200"
              onClick={handleClose}
              type="button"
            >
              No
            </button>
          </div>
        }
        content={
          <div className="font-serif text-sm sm:text-base">
            Are You Sure You want to Delete This Blog ?
          </div>
        }
        setFunction={setOpen}
      />
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
  showbuttons: Prop.bool,
};
