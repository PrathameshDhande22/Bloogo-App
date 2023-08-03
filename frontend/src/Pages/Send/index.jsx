import { useSelector } from "react-redux";
import "animate.css";
import { useToken } from "../../Hooks/useToken";
import { sendEmail } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../Hooks/useTitle";

export const Send = () => {
  useTitle("Send");
  const email = useSelector((state) => state.udata.userData?.email);
  const token = useToken();
  const navi = useNavigate();

  const handlesend = () => {
    sendEmail(token)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Verification Code Sent");
          setTimeout(() => {
            navi("/");
          }, 2500);
        }
      })
      .catch((res) => {
        if (res?.response?.status === 403) {
          toast.error("User Already Verified");
        } else {
          toast.error("Something Wrong at our End ! Please Try Again Later");
        }
      });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <div className="sendbackground h-screen relative flex flex-col flex-wrap justify-center items-center">
        <div className="bg-white shadow-2xl shadow-indigo-900 mx-2 rounded-2xl relative h-[200px]  animate__animated animate__fadeInDownBig">
          <div className="flex flex-col justify-between items-center h-full flex-wrap  p-2 sm:p-7 select-none">
            <span className="font-spec font-bold text-xl sm:text-2xl px-2 border-b-2 border-indigo-500">
              Send Verification Link
            </span>
            <div className="font-raj flex flex-col gap-2 flex-wrap">
              <span>
                Verification Link will be sent on <b>{email}</b>
              </span>
              <span>Check Your Email and Click on Verify.</span>
            </div>
            <button
              type="button"
              onClick={handlesend}
              className="px-7 py-1 active:bg-white active:border-2 active:text-black border-indigo-500 font-spec sm:text-xl bg-indigo-200 rounded-3xl hover:bg-indigo-500 hover:text-white"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
