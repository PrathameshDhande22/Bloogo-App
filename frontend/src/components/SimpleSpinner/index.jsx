import { Oval } from "react-loader-spinner";

export const SimpleSpinner = () => {
  return (
    <>
      <div className="flex flex-row gap-3 justify-center items-center my-8">
        <Oval
          height={50}
          width={50}
          color="#4b54c5"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#ebebeb"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
        <span className="text-2xl font-mono">Loading...</span>
      </div>
    </>
  );
};
