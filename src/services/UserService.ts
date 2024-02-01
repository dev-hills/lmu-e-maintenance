import axios from "axios";

const base_url = "https://maintenance.lmu.edu.ng:5001/api";

export const GetMaintenanceIssueCategory = async () => {
  const response = await axios.get(`${base_url}/MaintenanceIssueCategory`);
  return response.data;
};

export const GetMaintenanceIssuebyCategory = async (id: number) => {
  const response = await axios.get(
    `${base_url}/MaintenanceIssue/category/${id}`
  );
  return response.data;
};
