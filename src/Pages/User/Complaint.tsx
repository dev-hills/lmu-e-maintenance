import logo from "/luscLogo.png";
import mail from "/mail.png";
import phone from "/phone.png";
import location from "/location.png";
import emoji from "/emoji.png";
import MaintenanceIssueCategory from "../../Components/MaintenanceIssueCategory";
const Complaint = () => {
  return (
    <div className="px-[140px]">
      <img src={logo} alt="" className="mx-auto" width={150} />
      <div className="flex flex-row items-center gap-[100px]">
        <div className="w-[50%] flex flex-col items-start">
          <h1 className="text-[#908585] text-[45px] font-bold">
            Please Report any Maintenance Issues
          </h1>

          <div className="mt-[70px]">
            <div className="text-[#908585] font-medium text-[17px] flex flex-row items-center gap-[16px] py-[27px] pl-[27px] pr-[150px]">
              <img src={mail} alt="" />
              asebieoblessing@gmail.com
            </div>
            <div className="text-white border-[3px] rounded-[16px] border-[#008000] bg-[#05ca0580] font-medium text-[17px] flex flex-row items-center gap-[16px] py-[27px] pl-[27px] pr-[150px]">
              <img src={phone} alt="" />
              +123 456 789
            </div>
            <div className="text-[#908585] font-medium text-[17px] flex flex-row items-center gap-[16px] py-[27px] pl-[27px] pr-[150px]">
              <img src={location} alt="" />
              123 Street 456 House
            </div>
          </div>

          <div className="mt-[100px] text-[#908585] text-[25px] font-medium flex flex-row items-center gap-[10px]">
            Your welfare is our priority
            <img src={emoji} alt="" />
          </div>
        </div>

        <div className="w-[50%] overflow-x-hidden scrollbar-hidden max-h-[600px]">
          <MaintenanceIssueCategory />
        </div>
      </div>
    </div>
  );
};

export default Complaint;
