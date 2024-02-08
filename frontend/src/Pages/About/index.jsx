import { useTitle } from "../../Hooks/useTitle";
import { AboutData } from "../../data";

const About = () => {
  useTitle("About");
  return (
    <div className="my-10 space-y-14">
      <div className="mx-10 lg:mx-72 flex flex-col gap-5 justify-center  text-justify items-center">
        <span className="text-2xl md:text-4xl font-gara font-bold self-start">
          About
        </span>
        <div className="space-y-5 self-start">
          <p className="text-xl md:text-2xl">
            Bloogo is the easiest way to share your writing on the web.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            Create a space for your thoughts. Reach people with your ideas, and
            form new connections. Keep loved ones in the loop, free from social
            media. Bloogo is a simple, modern, and ad-free web pub­lish­ing
            platform.
          </p>
        </div>
        <img
          src={
            "https://ucarecdn.com/f2d6b4b8-83f0-4c3c-abc3-39d15fe894cd/-/preview/700x700/-/quality/smart/-/format/auto/img1.png"
          }
          className="w-[600px] border-2 border-gray-400 rounded-lg shadow-2xl shadow-gray-500"
        />
      </div>
      <div className="flex flex-row flex-wrap justify-evenly items-center font-raj gap-9">
        {AboutData.map((value, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-between gap-7 content-center h-36"
            >
              <span className="text-xl font-extrabold">{value.title}</span>
              <span className="text-lg w-64 text-justify">{value.content}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default About;
