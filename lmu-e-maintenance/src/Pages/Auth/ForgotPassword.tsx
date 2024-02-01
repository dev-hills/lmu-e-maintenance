/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ArrowLeft from "../../asset/ArrowLeft.svg";
import logo from "/luscLogo.png";
import helloGirl from "/helloGirl.png";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useLogin } from "../../hooks/mutations/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState<any>({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(loginDetails);

    const dataToSend: any = {
      webMail: loginDetails.email,
      password: loginDetails.password,
    };

    mutate(dataToSend, {
      onSuccess: (res) => {
        console.log(res);
        queryClient.invalidateQueries({
          queryKey: ["Login"],
        });

        {
          toast.success(`Login Successful`, {
            position: toast.POSITION.TOP_RIGHT,
          });

          navigate("/");
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  const isButtonEnabled = () => {
    const endsWithLmuEduNg = loginDetails.email.endsWith("lmu.edu.ng");
    return endsWithLmuEduNg;
  };

  return (
    <div className="center">
      <div className="absolute right-[-284px] -z-[10] md:hidden">
        <img src={helloGirl} alt="" />
      </div>
      <div className="bg-[#F5F5F5] pt-[9px] pb-[50px] px-[20px] rounded-[16px] border-[1px] border-[rgba(0, 0, 0, 0.26)] drop-shadow-2xl">
        {/* Login BTN */}
        <Link to="/login">
          <div className="font-barlow font-black text-[20px] flex flex-row items-center gap-[3px] absolute left-0 pl-[31px]">
            <div>
              <img src={ArrowLeft} alt="" />
            </div>
            Login{" "}
          </div>
        </Link>

        <div className="flex flex-col items-center">
          {/* LOGO */}
          <div>
            <img src={logo} alt="" />
          </div>

          {/* DESC */}
          <div className="flex flex-col items-center">
            <h1 className="font-barlow font-black text-[40px] leading-[43.2px]">
              Forgot Password
            </h1>
            <p className="font-sansPro text-center mt-[10px] text-[#717171] text-[15px] font-semibold leading-[15px] md:whitespace-normal">
              Welcome to our Maintenance Hub, where your well-being takes center
              stage.
            </p>
          </div>

          {/* FORM */}
          <form action="" className=" mt-[50px] md:w-[360px]">
            {/* WEBMAIL */}
            <div className="w-[530px] md:w-[360px]">
              <p className="ml-[17px] absolute font-sansPro text-[15px] font-semibold leading-[15px] bg-[#F5F5F5] px-[38px] mt-[-5px]">
                Password
              </p>
              <div className="border-[2px] border-[rgba(0, 0, 0, 0.26)] rounded-[16px] py-[24px] px-[21px]">
                <input
                  type="password"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  placeholder="Webmail..."
                  className="border-none outline-none bg-transparent px-[10px] py-0 w-[480px] md:w-[320px]"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mt-[30px] w-[530px] md:w-[360px]">
              <p className="ml-[17px] absolute font-sansPro text-[15px] font-semibold leading-[15px] bg-[#F5F5F5] px-[38px] mt-[-5px]">
                Re-Password
              </p>
              <div className="border-[2px] border-[rgba(0, 0, 0, 0.26)] rounded-[16px] py-[24px] px-[21px]">
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="*******************"
                  className="border-none outline-none bg-transparent px-[10px] py-0 w-[480px] md:w-[320px]"
                />
              </div>
            </div>

            {/* LOGIN BTN */}
            <div className="mt-[30px]">
              <button
                disabled={!isButtonEnabled()}
                onClick={submit}
                className="bg-[#008000] mt-[20px] rounded-[50px] py-[15px] px-[158px] w-[530px] md:w-[360px] text-white font-sansPro font-semibold text-[15px] leading-[15px]"
              >
                {isPending ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
