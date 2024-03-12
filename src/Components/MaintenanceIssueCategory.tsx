/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import DateTimePicker from "react-datetime-picker";
import {
  useGetMaintenanceIssueCategory,
  useGetMaintenanceIssuebyCategory,
} from "../hooks/queries/user";
import { useSubmitMaintenanceComplaint } from "../hooks/mutations/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks/useAuth";
import loader from "/loader.svg";
import { typeIssue } from "../utils/type";

const MaintenanceIssueCategory = () => {
  const [value, onChange] = useState<Date>(new Date());
  const [issueByCategoryId, setIssueByCategoryId] = useState<number | null>(
    null
  );
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [selectedIssues, setSelectedIssues] = useState<typeIssue[]>([]);
  const [block, setBlock] = useState<string>("");
  const { userEmail } = useAuth();
  const [roomNumber, setRoomNumber] = useState<string | null>(null);
  const [selectedHostel, setSelectedHostel] = useState<string>("");
  const date = new Date(value);

  const formattedDate = `${date.toISOString().slice(0, 19)}`;

  const { data: maintenanceIssueCategoryData } =
    useGetMaintenanceIssueCategory();
  const { data: maintenanceIssueByCategoryData } =
    useGetMaintenanceIssuebyCategory(issueByCategoryId);
  const { mutate, isPending } = useSubmitMaintenanceComplaint();

  useEffect(() => {
    console.log(maintenanceIssueCategoryData);
    console.log(maintenanceIssueByCategoryData);
  }, [maintenanceIssueCategoryData, maintenanceIssueByCategoryData]);

  const getIssueByCategory = (id: number, name: string) => {
    setIssueByCategoryId(id);
    setCategoryName(name);
  };

  const addIssueToArray = (id: number, description: string) => {
    const isSelected = selectedIssues.some((data) => data.id === id);

    if (isSelected) {
      setSelectedIssues((prevSelectedDivs) =>
        prevSelectedDivs.filter((data) => data.id !== id)
      );
    } else {
      setSelectedIssues((prevSelectedDivs) => [
        ...prevSelectedDivs,
        { id, description },
      ]);
    }
  };

  const submitComplaint = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const dataToSend: any = {
      userWebMail: userEmail,
      image: null,
      block,
      hostel: selectedHostel,
      roomNumber: roomNumber ? Number(roomNumber) : null,
      timeAvailable: formattedDate,
      maintenanceIssueIds: selectedIssues.map((item) => item.id),
    };

    mutate(dataToSend, {
      onSuccess: (res) => {
        console.log(res);
        toast.success(`Successful`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div>
      <div>
        <h1 className="text-[#000] text-[25px] sm:text-center lg:text-center font-semibold">
          What is the problem?
        </h1>

        <div className="flex flex-row flex-wrap items-center gap-[10px] sm:gap-[5px]">
          {selectedIssues.map((data, idx) => {
            // Split the description into words
            const words = data.description.split("");

            // Choose the desired number of words (e.g., 5 in this case)
            const truncatedDescription = words.slice(0, 13).join("");

            return (
              <div
                data-tooltip-id="my-tooltip"
                data-tooltip-content={data.description}
                key={idx}
                className="flex flex-row items-center justify-between gap-[30px] mt-[30px] max-w-[200px] p-[7px] bg-[#EEEEEE] text-[#008000] text-[17px] font-medium text-center rounded-[8px]"
              >
                <Tooltip id="my-tooltip" />
                {truncatedDescription}
                {words.length > 13 ? "..." : ""}
                <div
                  className="text-[#008000]"
                  onClick={() => addIssueToArray(data.id, data.description)}
                >
                  X
                </div>
              </div>
            );
          })}
        </div>

        {maintenanceIssueCategoryData?.statusCode === 200 ? (
          <div className="flex flex-row flex-wrap items-center gap-[20px] mt-[15px] sm:mt-[50px] lg:mt-[50px] sm:justify-center lg:justify-center">
            {maintenanceIssueCategoryData?.data?.map((data, idx) => (
              <div
                key={idx}
                onClick={() => getIssueByCategory(data?.id, data?.name)}
                className={`max-w-[150px] p-[10px] text-[17px] text-center rounded-[8px] ${
                  issueByCategoryId === data?.id
                    ? "bg-[#008000] text-white border-[2px] border-[#008000] hover:bg-[#008000] hover:text-white"
                    : "bg-white text-[#008000] border-[2px] border-[#008000] hover:bg-[#008000] hover:text-white"
                }`}
              >
                {data?.name}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <img src={loader} alt="" />
          </div>
        )}

        <p className="font-medium text-[25px] text-[#008000] mt-[20px] sm:text-center lg:text-center">
          {categoryName}
        </p>

        <div className="flex flex-row flex-wrap items-center gap-[20px] sm:justify-center lg:justify-center">
          {maintenanceIssueByCategoryData?.map((data, idx) => (
            <div
              key={idx}
              onClick={() => addIssueToArray(data?.id, data?.description)}
              className="mt-[30px] max-w-[150px] hover:bg-[#008000] hover:text-white p-[10px] bg-white text-[#008000] border-[2px] border-[#008000] text-[15px] text-center rounded-[8px]"
            >
              {data?.description}
            </div>
          ))}
        </div>

        <div className="mt-[20px] sm:mt-[50px] lg:mt-[50px]">
          <select
            value={selectedHostel}
            onChange={(e) => setSelectedHostel(e.target.value)}
            className="outline-none rounded-[8px] pl-[8px] py-[15px] border-[4px] border-[#4b4a4a4d] text-black w-[100%] font-semibold"
          >
            <option value="">Pick an option</option>
            {[
              "Daniel",
              "Dorcas",
              "Abraham",
              "Joseph",
              "Isaac",
              "Deborah",
              "Sarah",
              "Abigail",
            ].map((hostel, idx) => (
              <option key={idx} value={hostel}>
                {hostel}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-row sm:flex-col items-center gap-[80px] sm:gap-[40px] lg:gap-[40px] mt-[40px]">
          <input
            type="text"
            value={block}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-Z]{0,1}$/.test(value)) {
                setBlock(value.toUpperCase());
              }
            }}
            id=""
            maxLength={1}
            placeholder="Block"
            className="outline-none sm:w-[100%] lg:w-[100%] border-[3px] border-[#4b4a4a4d] border-x-0 border-t-0 font-semibold text-[20px]"
          />

          <input
            type="text"
            value={roomNumber}
            onChange={(e) => {
              const value = e.target.value;

              if (/^\d{0,3}$/.test(value)) {
                setRoomNumber(value);
              }
            }}
            name=""
            id=""
            placeholder="Room Number"
            className="outline-none sm:w-[100%] lg:w-[100%] border-[3px] border-[#4b4a4a4d] border-x-0 border-t-0 font-semibold text-[20px]"
            maxLength={3}
            pattern="\d{0,3}"
            title="Please enter up to 3 digits"
          />
        </div>

        <div className="w-[100%] mt-[50px] outline-none border-[3px] border-[#4b4a4a4d] border-x-0 border-t-0">
          <DateTimePicker onChange={onChange} value={value} />
        </div>

        <button
          onClick={submitComplaint}
          className="mt-[40px] bg-[#008000] sm:w-[100%] lg:w-[100%] sm:mb-[40px] text-white text-[20px] rounded-[16px] px-[50px] py-[20px]"
        >
          {isPending ? "Loading..." : "Submit Complaint"}
        </button>
      </div>
    </div>
  );
};

export default MaintenanceIssueCategory;
