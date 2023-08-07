import { Skeleton } from "@mui/material";
import Prop from "prop-types";

export const LoadingPlaceHolder = ({ times, showFor }) => {
  const elements = [];

  switch (showFor) {
    case "blogs":
      for (let i = 0; i < times; i++) {
        elements.push(
          <div
            key={i}
            className="flex flex-wrap border-2 overflow-clip border-gray-300 p-2 rounded-lg w-full flex-col gap-1"
          >
            <Skeleton variant="text" width={300} />

            <div className="flex items-center flex-row flex-wrap gap-2 w-full">
              <Skeleton variant="rectangular" height={100} width={400} />
              <Skeleton variant="rectangular" height={80} width={80} />
            </div>
              <Skeleton variant="text" width={300} />

          </div>
        );
      }
      break;
    case "author":
      null;
      break;
    default:
      null;
  }

  return (
    <div className="flex flex-col flex-wrap gap-3">
      {elements.map((value) => {
        return value;
      })}
    </div>
  );
};

LoadingPlaceHolder.propTypes = {
  times: Prop.number,
  showFor: Prop.string,
};
