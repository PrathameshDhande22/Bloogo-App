import Prop from "prop-types";
const LoadMoreButton = ({ isLoading, onClick }) => {
  return (
    <>
      {isLoading ? (
        <div className="font-serif select-none text-center border-2 text-indigo-700 font-extrabold border-indigo-500 w-full sm:w-1/2 rounded-lg py-1">
          Loading.....
        </div>
      ) : (
        <button
          type="button"
          className="font-serif select-none border-2 text-indigo-700 font-extrabold border-indigo-500 w-full sm:w-1/2 rounded-lg py-1"
          onClick={onClick}
        >
          Load More ...
        </button>
      )}
    </>
  );
};
export default LoadMoreButton;

LoadMoreButton.propTypes = {
  isLoading: Prop.bool,
  onClick: Prop.func,
};
