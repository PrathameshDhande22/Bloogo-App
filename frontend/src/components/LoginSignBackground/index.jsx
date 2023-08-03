import background from "../../assets/background.jpg";
import Prop from "prop-types";

export const LoginSignBackground = ({ children }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 z-0">
        <img
          src={background}
          alt="Bloogo Background Image"
          className="w-screen h-screen object-cover"
        />
      </div>
      <div className="flex flex-col justify-center items-center ">
        <div className="z-30 relative flex flex-col justify-center items-center md:gap-6 gap-3 top-20 shadow-2xl  bg-slate-100 rounded-2xl p-4 md:p-10 max-sm:w-[95%] sm:w-[400px] ">
          <img src="/icon.png" alt="bloogo Icon" className="w-32 sm:w-56" />
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

LoginSignBackground.propTypes = {
  children: Prop.node,
};
