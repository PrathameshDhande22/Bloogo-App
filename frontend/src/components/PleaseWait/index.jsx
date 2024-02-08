import { ThreeDots } from "react-loader-spinner";

export const PleaseWait = () => {
  return (
    <div className="flex select-none cursor-wait flex-row justify-center items-center gap-4 bg-indigo-500 border-2 border-indigo-500 px-4 mt-2 rounded-lg py-1 font-meri text-sm text-white transition-{bg} ease-in duration-150">
      <span>Please Wait</span>
      <ThreeDots
        visible={true}
        height="30"
        width="40"
        color="#ffffff"
        radius="5"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};
