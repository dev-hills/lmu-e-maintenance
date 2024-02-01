/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVerify } from "../../hooks/mutations/auth";
import logo from "/luscLogo.png";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useVerify();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const verify = (e) => {
    e.preventDefault();

    const dataToSend: any = {
      userId: userId,
      verificationToken: token,
    };

    console.log(dataToSend);

    mutate(dataToSend, {
      onSuccess: (res) => {
        console.log(res);
        queryClient.invalidateQueries({
          queryKey: ["Verify"],
        });
        {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });

          navigate("/login");
        }
      },
      onError: (err: any) => {
        console.log(err);
        {
          toast.error("Verification Error", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={logo} alt="" />
      <h1 className="font-barlow font-black text-[20px] pb-[25px]">
        LMU E-MAINTENANCE
      </h1>
      <button
        onClick={verify}
        className="bg-[#008000] rounded-[5px] py-[25px] px-[18px] w-[230px] md:w-[360px] text-white font-sansPro font-semibold text-[15px] leading-[15px]"
      >
        {isPending ? "Loading..." : "Verify Email"}
      </button>
    </div>
  );
};

export default VerifyEmail;
