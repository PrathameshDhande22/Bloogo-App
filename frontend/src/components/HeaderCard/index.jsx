import PropTypes from "prop-types";

const HeaderCard = ({ title, content1, content2, image }) => {
  return (
    <>
      <div className="text-justify space-y-4 font-gara my-14 flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-5xl self-start">{title}</h1>
        <p className="text-xl md:text-2xl font-spec font-normal leading-relaxed">
          {content1}
        </p>
        <p className="text-xl md:text-2xl font-spec font-normal leading-relaxed">
          {content2}
        </p>
        {image === null ? null : (
          <img
            src={image}
            className="w-[600px] border-2 border-gray-400 rounded-lg shadow-2xl shadow-gray-500"
          />
        )}
      </div>
    </>
  );
};
export default HeaderCard;

HeaderCard.propTypes = {
  title: PropTypes.string,
  content1: PropTypes.string,
  image: PropTypes.string,
  content2: PropTypes.string,
};
