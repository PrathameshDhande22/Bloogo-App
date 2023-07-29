import { useNavigate } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa";
import { HeaderData } from "../../data";
import HeaderCard from "../../components/HeaderCard";
import { useTitle } from "../../Hooks/useTitle";

export const Home = () => {
  useTitle("Home");
  const navigate = useNavigate();
  return (
    <main>
      <div className="mt-20">
        <div className="flex justify-center items-center flex-col gap-12">
          <h1 className="">
            <img src="/icon.png" alt="Bloogo Icon" className="w-80" />
          </h1>
          <span className="text-xl sm:text-3xl font-lum">
            Yours Words We Posts.
          </span>
          <button
            onClick={() => navigate("/signup")}
            className="font-display text-lg sm:text-2xl bg-indigo-500 rounded-lg py-2 px-8 hover:bg-indigo-600 text-white"
          >
            <span className="flex flex-row gap-2 justify-center items-center">
              Get Started <FaGreaterThan />
            </span>
          </button>
          <span className="text-gray-500 font-mono text-lg tracking-wide px-5">
            Express Your Thoughts Through writing here.
          </span>
        </div>
        <hr className="h-1 bg-gray-300 mt-10 sm:mt-14 md:mt-24 lg:mt-40 xl:mt-48 mx-16" />
      </div>
      <div className="mt-7 mx-10 lg:mx-60">
        {HeaderData.map((value, index) => {
          return (
            <HeaderCard
              key={index}
              content1={value.content1}
              content2={value.content2}
              title={value.title}
              image={value.image}
            />
          );
        })}
      </div>
      <hr className="h-1 bg-gray-300 my-10 mx-10 md:mx-20" />
    </main>
  );
};
