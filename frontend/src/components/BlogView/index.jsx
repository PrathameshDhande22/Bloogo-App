import Prop from "prop-types";
import { getThumbnailURL } from "../../utils/imageurl";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { readingTime } from "reading-time-estimator";
import moment from "moment/moment";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { BiLogoGmail } from "react-icons/bi";
import {
  FaFacebook,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { useTitle } from "../../Hooks/useTitle";

export const BlogView = ({ blogdata }) => {
  useTitle(blogdata?.title);
  const [imgsrc, setImgsrc] = useState(null);
  useEffect(() => {
    if (blogdata?.thumbnail !== "null") {
      const img_url = getThumbnailURL(blogdata?.thumbnail);
      setImgsrc(img_url);
    }
  }, [blogdata]);

  return (
    <div className="flex my-5 flex-row w-full justify-center items-center">
      <div className="flex mx-4 flex-col justify-center gap-5 w-full items-center sm:w-[60%]">
        {imgsrc !== null ? (
          <div className="md:w-3/4">
            <img src={imgsrc} alt="Thumbnail" />
          </div>
        ) : null}
        <div className="font-mono font-extrabold text-2xl sm:text-4xl self-start tracking-wide">
          {blogdata?.title}
        </div>
        <div className="self-start font-mono italic">
          {readingTime(String(blogdata?.content), 50).text}
        </div>
        <div className="self-start flex flex-col gap-1 ">
          <Link
            to={`/author/${blogdata?.authorid}`}
            className="font-noto font-bold text-sm hover:border-b-2 border-indigo-700"
          >
            {blogdata?.name}
          </Link>
          <span className="font-raj select-none font-semibold italic text-sm">
            {moment(blogdata?.createdon).fromNow().toString()}
          </span>
        </div>
        <div className="font-noto self-start leading-relaxed tracking-wide">
          {parse(String(blogdata.content))}
        </div>
        <div className="self-start">
          <span className="px-3 inline-block py-1 bg-neutral-100 rounded-2xl border-2 border-gray-400 font-meri text-xs">
            <Link to={`/tags/${blogdata?.tag}`}>
              <span>{blogdata?.tag}</span>
            </Link>
          </span>
        </div>
        <div className="space-y-2 font-meri text-sm">
          <span>Share on </span>
          <div className="flex flex-row items-center gap-4 flex-wrap">
            <EmailShareButton
              url={location.href}
              subject="Sharing the New Blog"
              body="I m sharing the Good Blog with You. Read it once."
            >
              <BiLogoGmail
                fontSize={35}
                className="bg-red-500 p-1 rounded-full text-white"
              />
            </EmailShareButton>
            <FacebookShareButton
              url={location.href}
              quote="Have a Look on these Blog"
              hashtag="#blog"
            >
              <FaFacebook
                fontSize={35}
                className="text-blue-600 rounded-full"
              />
            </FacebookShareButton>
            <LinkedinShareButton
              url={location.href}
              title="Blog from Bloogo"
              summary="Read these blog and learn new things."
              source={location.href}
            >
              <FaLinkedin fontSize={35} className="text-blue-600" />
            </LinkedinShareButton>
            <TelegramShareButton
              url={location.href}
              title="Read These exciting Blog"
            >
              <FaTelegram fontSize={35} className="text-blue-500" />
            </TelegramShareButton>
            <TwitterShareButton
              url={location.href}
              title="Blog From Bloogo"
              hashtags={["#blog", "#bloogo"]}
            >
              <FaTwitter fontSize={35} className="  text-blue-500" />
            </TwitterShareButton>
            <WhatsappShareButton
              url={location.href}
              title="Read these exciting Blog"
            >
              <FaWhatsapp fontSize={35} className=" text-green-600" />
            </WhatsappShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogView.propTypes = {
  blogdata: Prop.object,
};
