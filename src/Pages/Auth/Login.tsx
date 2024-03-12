/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ArrowRight from "../../asset/ArrowRight.svg";
import logo from "/luscLogo.png";
import helloBoy from "/helloBoy.png";
import { Link } from "react-router-dom";

import { useLogin } from "../../hooks/mutations/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import EmailModal from "../../Components/EmailModal";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { mutate, isPending } = useLogin();
  const { setToken, setUserEmail } = useAuth();
  const navigate = useNavigate();
  const [remember, setRemember] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState(false);

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
        setToken(res?.token);
        setUserEmail(res?.email);

        {
          toast.success(`Login Successful`, {
            position: toast.POSITION.TOP_RIGHT,
          });

          navigate("/complaint");
        }
      },
      onError: (err: any) => {
        err?.response?.status === 401 &&
          toast.error("Invalid Username or Password", {
            position: toast.POSITION.TOP_LEFT,
          });

        err?.request?.status === 0 &&
          toast.error("No Internet Connection", {
            position: toast.POSITION.TOP_LEFT,
          });

        console.log(err);
      },
    });
  };

  const isButtonEnabled = () => {
    const endsWithLmuEduNg = loginDetails.email.endsWith("lmu.edu.ng");
    return endsWithLmuEduNg;
  };

  const toggleRemember = () => {
    setRemember(!remember);
  };

  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }
  return (
    <div className="center">
      <div className="absolute ml-[-280px] mt-[-43px] -z-10 sm:hidden">
        <img src={helloBoy} alt="" />
      </div>
      <div className="bg-[#F5F5F5] pt-[9px] pb-[50px] px-[20px] rounded-[16px] border-[1px] border-[rgba(0, 0, 0, 0.26)] drop-shadow-2xl">
        {/* REGISTER BTN */}
        <Link to="/register">
          <div className="font-barlow font-black text-[20px] flex flex-row items-center gap-[3px] absolute right-0 pr-[31px]">
            Register{" "}
            <div>
              <img src={ArrowRight} alt="" />
            </div>
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
              Login
            </h1>
            <p className="font-sansPro text-center mt-[10px] text-[#717171] text-[15px] font-semibold leading-[15px] md:whitespace-normal">
              Welcome to our Maintenance Hub, where your well-being takes center
              stage.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={submit} className=" mt-[50px] md:w-[360px]">
            {/* WEBMAIL */}
            <div className="w-[530px] md:w-[360px]">
              <p className="ml-[17px] absolute font-sansPro text-[15px] font-semibold leading-[15px] bg-[#F5F5F5] px-[38px] mt-[-5px]">
                Webmail
              </p>
              <div className="border-[2px] border-[rgba(0, 0, 0, 0.26)] rounded-[16px] py-[24px] px-[21px]">
                <input
                  type="email"
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
                Password
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

            {/* REMEMBER ME/ FORGOT PASSWORD */}
            <div
              onClick={toggleRemember}
              className="flex flex-row justify-between mt-[20px] cursor-pointer"
            >
              <div className="flex flex-row items-center gap-[5px]">
                {remember ? (
                  <div className="w-[16px] h-[16px] border-[1px] border-[#B7B7B7] bg-[#008000]"></div>
                ) : (
                  <div className="w-[16px] h-[16px] border-[1px] border-[#B7B7B7]"></div>
                )}
                <p className="font-sansPro text-[15px] font-semibold leading-[15px]">
                  Remember me
                </p>
              </div>

              <div onClick={openModal}>
                <p className="font-sansPro text-[15px] font-semibold leading-[15px]">
                  Forgot Password?
                </p>
              </div>
            </div>

            {/* LOGIN BTN */}
            <div className="mt-[30px]">
              <button
                disabled={!isButtonEnabled()}
                onClick={submit}
                className="bg-[#008000] rounded-[50px] py-[15px] px-[158px] w-[530px] md:w-[360px] text-white font-sansPro font-semibold text-[15px] leading-[15px]"
              >
                {isPending ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
        <EmailModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Login;
