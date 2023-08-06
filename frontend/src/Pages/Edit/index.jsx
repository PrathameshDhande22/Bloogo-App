import { useState, useRef, useEffect } from "react";
import Spinner from "../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { Error } from "../Error";
import { useTitle } from "../../Hooks/useTitle";
import { useToken } from "../../Hooks/useToken";
import { ToastContainer, toast } from "react-toastify";
import { updateBlog, uploadPhoto, viewBlog } from "../../api/api";
import { GrUpdate } from "react-icons/gr";
import { Loading } from "../NewBlog";
import { Close, FileUpload, Upload } from "@mui/icons-material";
import { TextField } from "@mui/material";
import JoditEditor, { Jodit } from "jodit-react";
import { Taglist } from "../../components/TagList";
import { DialogComponent } from "../../components/DialogComponent";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { getThumbnailURL } from "../../utils/imageurl";
import { TbEditCircle } from "react-icons/tb";
import { useCallback } from "react";

export const Edit = () => {
  const blogid = useParams()?.id;
  useTitle("Edit Blog");

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [uploadFile, setuploadFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [openThumb, setOpenThumb] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [imgsrc, setImgsrc] = useState(null);
  const [updateBlack, setupdateBlack] = useState(false);

  const [data, setData] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    viewBlog(blogid)
      .then((res) => {
        setLoading(false);
        setData(res.data);
        if (res.data?.thumbnail !== "null") {
          setImgsrc(getThumbnailURL(res.data?.thumbnail));
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [blogid]);

  const editor = useRef(null);

  const token = useToken();

  const uploadThumbnail = useCallback(() => {
    setOpenThumb(false);
    if (uploadFile !== null) {
      const formdata = new FormData();
      formdata.append("file", uploadFile);
      formdata.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
      uploadPhoto(formdata)
        .then((res) => {
          setUploaded(true);
          setData({ ...data, thumbnail: res.data?.public_id });
          setImgsrc(getThumbnailURL(res.data?.public_id));
          toast.success("Thumbnail Uploaded Successfully");
        })
        .catch(() => {
          toast.error("Something Wrong with Server.");
        });
    }
  }, [data, uploadFile]);

  const navi = useNavigate();

  const handlePublish = useCallback(() => {
    if (
      data.content.length === 0 ||
      data.title.length === 0 ||
      data.tag.length === 0
    ) {
      setOpen(true);
    } else {
      setUpdating(true);
      const formdata = new FormData();
      formdata.append("content", data?.content);
      formdata.append("tag", data?.tag);
      formdata.append("title", data?.title);
      formdata.append("thumbnail", data?.thumbnail);
      updateBlog(blogid, token, formdata)
        .then(() => {
          setUpdating(false);
          toast.success("Blog Updated Successfully");
          setTimeout(() => {
            navi("/");
          }, 1500);
        })
        .catch((res) => {
          if (res?.response?.status === 401) {
            toast.error("You Can't Update This Blog");
          } else {
            toast.error("Something Wrong at Our End");
          }
          setUpdating(false);
        });
    }
  }, [blogid, data, navi, token]);

  const handleThumbnail = (e) => {
    setuploadFile(e.target.files[0]);
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Error />
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center w-full my-4">
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              theme="colored"
            />
            <div className="flex flex-col flex-wrap gap-6 w-[95%] md:w-[50%]">
              <div className="flex flex-row justify-between items-center">
                <div className="font-gara text-2xl md:text-4xl font-bold border-b-4 py-1 border-b-indigo-600 pe-6 select-none">
                  Edit Blog
                </div>
                {!isUpdating ? (
                  <button
                    type="button"
                    onClick={handlePublish}
                    className="font-noto flex flex-row gap-3 items-center px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-800 transition-colors text-sm sm:text-base"
                  >
                    <span>Update</span>
                    <GrUpdate />
                  </button>
                ) : (
                  <Loading />
                )}
              </div>

              {imgsrc === null ? (
                uploadFile === null ? (
                  <>
                    <span className="text-red-600 font-spec text-sm">
                      Once Thumbnail Uploaded it cannot be Undone. *
                    </span>
                    <div className="flex flex-wrap w-full flex-row gap-4 items-center border-2 border-gray-400 rounded-lg p-3 md:p-5 -mt-6 justify-center">
                      <Upload />
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        name="fileupload"
                        id=""
                        title="Upload Blog Thumbnail"
                        max={1}
                        onChange={handleThumbnail}
                        className="w-[100px]"
                      />
                      <span className="font-raj font-bold text-base">
                        Upload Blog Thumbnail Here
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-3 justify-center items-center">
                    <div className="w-52">
                      <img
                        src={URL.createObjectURL(uploadFile)}
                        alt="thumbnail"
                      />
                    </div>
                    {uploaded ? null : (
                      <button
                        type="button"
                        className="font- font-spec bg-lime-400 py-1 px-5 rounded-md text-indigo-900 hover:bg-lime-600 hover:text-white transition-colors"
                        onClick={uploadThumbnail}
                      >
                        <FileUpload /> Upload Thumbnail
                      </button>
                    )}
                  </div>
                )
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <button
                    type="button"
                    className="w-1/2 relative"
                    onMouseOver={() => setupdateBlack(true)}
                    onMouseOut={() => setupdateBlack(false)}
                    onClick={() => setOpenThumb(true)}
                  >
                    <img src={imgsrc} alt="Thumbnail" />
                    <div
                      className={`w-full h-full opacity-60 absolute top-0 z-40  bg-black ${
                        updateBlack ? "visible" : "hidden"
                      } flex justify-center items-center`}
                    >
                      <TbEditCircle color="white" fontSize={100} />
                    </div>
                  </button>
                </div>
              )}
              <TextField
                type="text"
                placeholder="Enter Blog Title"
                onChange={(e) => {
                  setData({ ...data, title: e.target.value });
                }}
                required
                value={data?.title}
                inputProps={{ className: "font-gara text-2xl" }}
              />
              <JoditEditor
                ref={editor}
                value={data?.content}
                config={{
                  buttons:
                    "bold,italic,underline,strikethrough,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,image,cut,copy,paste,hr,table,preview,indent,outdent,left,justify,center,right",
                  enter: "p",
                  height: "600px",
                  width: "auto",
                  toolbarAdaptive: false,
                  toolbarButtonSize: "large",
                  iframe: true,
                  hidePoweredByJodit: true,
                  defaultActionOnPaste: "insert_as_html",
                  defaultLineHeight: 0.5,
                  controls: {
                    fontsize: {
                      list: Jodit.atom([10, 12, 14, 16]),
                    },
                  },
                }}
                tabIndex={1}
                onBlur={(newContent) =>
                  setData({ ...data, content: newContent })
                }
              />
              <Taglist selected={setData} data={data} />
            </div>
            <DialogComponent
              open={open}
              title={
                <div className="flex flex-row justify-between text-xl font-bold">
                  <span className="font-gara text-lg space-x-2 flex flex-row items-center">
                    <span>Field Empty </span>
                    <AiOutlineExclamationCircle fontSize={25} />
                  </span>
                  <span>
                    <button type="button" onClick={handleClose}>
                      <Close />
                    </button>
                  </span>
                </div>
              }
              content={
                <span className="font-noto">
                  Check The Title, Content and Tag if you left it Blank or Not.
                </span>
              }
              actions={
                <button
                  className="font-spec text-lg font-bold px-3 py-1 m-3 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-{bg} ease-in-out duration-200"
                  type="button"
                  onClick={handleClose}
                >
                  OK
                </button>
              }
              setFunction={setOpen}
            />
          </div>
        </div>
      )}
      <DialogComponent
        open={openThumb}
        title={
          <span className="font-spec text-xl font-bold">Update Thumbnail</span>
        }
        content={
          <div className="font-noto">
            {uploadFile == null ? (
              <span className="flex flex-col flex-wrap gap-3">
                <span>Select Thumbnail : </span>
                <div className="flex flex-wrap flex-row gap-3 items-center border-2 border-gray-400 rounded-lg p-3 md:p-10">
                  <Upload />
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    name="fileupload"
                    id=""
                    max={1}
                    onChange={(e) => {
                      setuploadFile(e.target.files[0]);
                    }}
                    className="w-[107px] file:after:bg-red-500"
                  />
                </div>
              </span>
            ) : (
              <span className="flex p-2 flex-col gap-3 justify-evenly items-center">
                <span className=" block self-start place-content-start">
                  Uploaded Profile Image :{" "}
                </span>
                <img
                  className="w-1/2"
                  src={URL.createObjectURL(uploadFile)}
                  alt="User profile"
                />
              </span>
            )}
          </div>
        }
        actions={
          <div className="flex flex-row gap-2  flex-wrap">
            <button
              className="font-spec text-lg font-bold px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-{bg} ease-in-out duration-200"
              type="button"
              onClick={uploadThumbnail}
            >
              Update
            </button>
            <button
              className="font-spec text-lg font-bold px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-{bg} ease-in-out duration-200"
              onClick={() => {
                setOpenThumb(false);
              }}
              type="button"
            >
              Cancel
            </button>
          </div>
        }
        setFunction={setOpenThumb}
      />
    </div>
  );
};
