import { ThreeDots } from "react-loader-spinner";
import loadergif from "../../assets/loading.gif"

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10">
    <img src={loadergif} alt="Loader Gif animation" className="w-40 md:w-60"/>
      <ThreeDots
        height="150"
        width="150"
        radius="9"
        color="#4b54c5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};
export default Spinner;
