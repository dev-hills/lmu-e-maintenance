/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { SubmitMaintenanceComplaint } from "../../services/UserService";

export const useSubmitMaintenanceComplaint = () => {
  return useMutation({
    mutationKey: ["SubmitMaintenanceComplaint"],
    mutationFn: (data) => SubmitMaintenanceComplaint(data),
  });
};
