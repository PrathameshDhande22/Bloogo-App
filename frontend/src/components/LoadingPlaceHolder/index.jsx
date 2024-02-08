import Prop from "prop-types";
import PlaceholderLoading from "react-placeholder-loading";

export const LoadingPlaceHolder = ({ times, showFor }) => {
  const elements = [];

  switch (showFor) {
    case "blogs":
      for (let i = 0; i < times; i++) {
        elements.push(
          <div
            key={i}
            className="flex rounded-lg flex-row p-2 overflow-clip border-2 border-gray-300 items-center flex-wrap gap-2 w-full  md:w-3/4"
          >
            <div className="flex flex-col gap-2">
              <PlaceholderLoading shape="rect" width={300} height={10} />
              <PlaceholderLoading shape="rect" width={300} height={100} />
              <PlaceholderLoading shape="rect" width={300} height={10} />
            </div>
            <div>
              <PlaceholderLoading shape="rect" width={100} height={100} />
            </div>
          </div>
        );
      }
      break;
    case "author":
      for (let i = 0; i < times; i++) {
        elements.push(
          <div
            key={i}
            className="flex flex-row flex-wrap border-2 border-gray-300 p-3 rounded-lg w-full gap-5 items-center"
          >
            <PlaceholderLoading shape="circle" width={80} height={80} />
            <PlaceholderLoading shape="rect" width={100} height={20} />
          </div>
        );
      }
      break;
    case "tags":
      for (let i = 0; i < times; i++) {
        elements.push(
          <div key={i} className="">
            <PlaceholderLoading shape="rect" width={100} height={20} />
          </div>
        );
      }
      break;
  }

  return (
    <>
      {showFor === "tags" ? (
        <div className="flex flex-row gap-7 flex-wrap">
          {elements.map((val) => {
            return val;
          })}
        </div>
      ) : (
        <div className="flex flex-col flex-wrap gap-3">
          {elements.map((value) => {
            return value;
          })}
        </div>
      )}
    </>
  );
};

LoadingPlaceHolder.propTypes = {
  times: Prop.number,
  showFor: Prop.string,
};
