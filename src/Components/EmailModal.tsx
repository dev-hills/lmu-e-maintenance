/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQueryClient } from "@tanstack/react-query";
import { useForgotPassword } from "../hooks/mutations/auth";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    paddingLeft: "200px",
    paddingRight: "200px",
    filter: "drop-shadow(6px 4px 25px #000000)",
  },
};

const EmailModal = ({ modalIsOpen, setIsOpen }: any) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useForgotPassword();
  const [email, setEmail] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  const submit = () => {
    
    const dataToSend: any = {
      webMail: email,
    };

    mutate(dataToSend, {
      onSuccess: (res) => {
        console.log(res);
        queryClient.invalidateQueries({
          queryKey: ["ForgotPassword"],
        });

        {
          toast.success(`Password Reset Link Sent`, {
            position: toast.POSITION.TOP_RIGHT,
          });

          setIsOpen(false);
        }
      },
      onError: (err: any) => {
        console.log(err);
        if (err?.response?.status === 401) {
          toast.error(`Invalid Credentials`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      },
    });
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <button onClick={closeModal} className="text-[25px] text-red-600">
          x
        </button> */}
        <h1 className="font-sansPro text-center text-[23px] mb-[30px] font-semibold">
          CHECK MAIL FOR LINK TO CHANGE PASSWORD
        </h1>
        <div className="w-[530px] md:w-[360px]">
          <p className="ml-[17px] absolute font-sansPro text-[15px] font-semibold leading-[15px] bg-[#F5F5F5] px-[38px] mt-[-5px]">
            Webmail
          </p>
          <div className="bg-[#F5F5F5] border-[2px] border-[rgba(0, 0, 0, 0.26)] rounded-[16px] py-[24px] px-[21px]">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Webmail..."
              className="border-none outline-none bg-[#F5F5F5] px-[15px] py-0 w-[480px] md:w-[320px]"
            />
          </div>

          <div
            onClick={() => submit}
            className="bg-[#008000] rounded-[50px] mt-[50px] py-[15px] px-[158px] w-[530px] md:w-[360px] text-white font-sansPro font-semibold text-[15px] leading-[15px]"
          >
            {isPending ? "Loading..." : "Submit"}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmailModal;
