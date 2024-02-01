import { useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import {
  useGetMaintenanceIssueCategory,
  useGetMaintenanceIssuebyCategory,
} from "../hooks/queries/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MaintenanceIssueCategory = () => {
  const [issueByCategoryId, setIssueByCategoryId] = useState<number>(null);
  const [categoryName, setCategoryName] = useState<string>(null);
  const [selectedIssues, setSelectedIssues] = useState([]);

  const { data: maintenaceIssueCategoryData } =
    useGetMaintenanceIssueCategory();

  const { data: maintenaceIssueByCategoryData } =
    useGetMaintenanceIssuebyCategory(issueByCategoryId);

  useEffect(() => {
    console.log(maintenaceIssueCategoryData?.data);
    console.log(maintenaceIssueByCategoryData);
  }, [maintenaceIssueCategoryData, maintenaceIssueByCategoryData]);

  const getIssueByCategory = (id: number, name: string) => {
    setIssueByCategoryId(id);
    setCategoryName(name);
  };

  const addIssueToArray = (id: number, description: string) => {
    const isSelected = selectedIssues.some((data) => data.id === id);

    if (isSelected) {
      setSelectedIssues((prevSelectedDivs) =>
        prevSelectedDivs.filter((data) => data?.id !== id)
      );
    } else {
      setSelectedIssues((prevSelectedDivs) => [
        ...prevSelectedDivs,
        { id, description },
      ]);
    }
  };

  const submit = () => {
    {
      toast.success(`Login Successful`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-[#2E0249] text-[25px] font-semibold">
          What is the problem?
        </h1>

        <div className="flex flex-row flex-wrap items-center gap-[10px] ">
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

        <div className="flex flex-row flex-wrap items-center gap-[20px] mt-[15px]">
          {maintenaceIssueCategoryData?.data?.map((data, idx) => (
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

        <p className="font-medium text-[25px] text-[#008000] mt-[20px]">
          {categoryName}
        </p>

        <div className="flex flex-row flex-wrap items-center gap-[20px]">
          {maintenaceIssueByCategoryData?.map((data, idx) => (
            <div
              key={idx}
              onClick={() => addIssueToArray(data?.id, data?.description)}
              className="mt-[30px] max-w-[150px] hover:bg-[#008000] hover:text-white p-[10px] bg-white text-[#008000] border-[2px] border-[#008000] text-[15px] text-center rounded-[8px]"
            >
              {data?.description}
            </div>
          ))}
        </div>

        <div className="mt-[20px]">
          <select className="outline-none rounded-[8px] pl-[8px] py-[15px] border-[4px] border-[#4b4a4a4d] text-black w-[100%] font-semibold">
            <option value="">Pick an option</option>
            <option value="">Daniel</option>
            <option value="">Dorcas</option>
            <option value="">Abraham</option>
            <option value="">Joseph</option>
            <option value="">Isaac</option>
            <option value="">Deborah</option>
            <option value="">Sarah</option>
            <option value="">Abigail</option>
          </select>
        </div>

        <div className="flex flex-row items-center gap-[80px] mt-[40px]">
          <input
            type="text"
            name=""
            id=""
            placeholder="Block"
            className="outline-none border-[3px] border-[#4b4a4a4d] border-x-0 border-t-0 font-semibold text-[20px]"
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="Room Number"
            className="outline-none border-[3px] border-[#4b4a4a4d] border-x-0 border-t-0 font-semibold text-[20px]"
          />
        </div>

        <div className="w-[100%] mt-[50px]">
          <input
            type="text"
            name=""
            id=""
            placeholder="Time/Day of availability"
            className="w-[100%] outline-none border-[3px] border-[#4b4a4a4d] border-x-0 border-t-0 font-semibold text-[20px]"
          />
        </div>

        <button
          onSubmit={submit}
          className="mt-[40px] bg-[#008000] text-white text-[20px] rounded-[16px] px-[50px] py-[20px]"
        >
          Submit Complaint
        </button>
      </div>
    </div>
  );
};

export default MaintenanceIssueCategory;
