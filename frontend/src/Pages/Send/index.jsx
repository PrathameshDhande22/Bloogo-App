import { useSelector } from "react-redux";
import "animate.css";
import { useToken } from "../../Hooks/useToken";
import { sendEmail } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../Hooks/useTitle";
import { useState } from "react";
import { LineWave } from "react-loader-spinner";

export const Send = () => {
  useTitle("Send");
  const email = useSelector((state) => state.udata.userData?.email);
  const token = useToken();
  const navi = useNavigate();
  const [sending, setSending] = useState(false);

  const handlesend = () => {
    setSending(true);
    sendEmail(token)
      .then((res) => {
        if (res.status == 200) {
          setSending(false);
          toast.success("Verification Code Sent");
          navi("/");
        }
      })
      .catch((res) => {
        setSending(false);
        if (res?.response?.status === 403) {
          toast.error("User Already Verified");
        } else {
          toast.error("Something Wrong at our End ! Please Try Again Later");
        }
      });
  };
  return (
    <>
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
            <div>
              {sending ? (
                <div className="px-2 border-indigo-500 font-spec bg-indigo-200 rounded-3xl flex flex-row justify-center items-center gap-2">
                  <span>Sending</span>
                  <LineWave
                    visible={true}
                    height="50"
                    width="50"
                    color="#4c53c6"
                    ariaLabel="line-wave-loading"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handlesend}
                  className="px-7 py-1 active:bg-white active:border-2 active:text-black border-indigo-500 font-spec sm:text-xl bg-indigo-200 rounded-3xl hover:bg-indigo-500 hover:text-white"
                >
                  Send
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
