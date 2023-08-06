import { useNavigate } from "react-router-dom";
import { useTitle } from "../../Hooks/useTitle";

export const Error = () => {
  const navi = useNavigate();
  useTitle("Error");
  return (
    <div className="h-screen relative justify-center items-center">
      <div
        className="flex bg-indigo-100
       absolute h-full w-full flex-col px-2 justify-center items-center"
      >
        <span className="font-noto font-semibold text-xl uppercase">
          Oops ! Page Not Found
        </span>
        <div className="flex -mt-14 font-paci font-extrabold text-[8rem]">
          <h1 className="errorpage -ml-2">4</h1>
          <h1 className="errorpage -ml-2">0</h1>
          <h1 className="errorpage -ml-2">4</h1>
        </div>
        <div className="-mt-5 mb-10 uppercase font-ysb font-extrabold text-center">
          We Are Sorry, But the Page You Requested Was
          <br />
          Not Found
        </div>
        <button
          type="button"
          className="bg-blue-700 font-gara sm:text-lg hover:bg-blue-500 hover:outline-indigo-700  uppercase text-xs shadow-2xl text-white px-5 py-2 transition-colors rounded-full outline-double outline-4 outline-yellow-400"
          onClick={() => {
            navi("/");
          }}
        >
          Go To Homepage
        </button>
      </div>
    </div>
  );
};
