import { useQuery } from "@tanstack/react-query";
import {
  GetMaintenanceIssueCategory,
  GetMaintenanceIssuebyCategory,
} from "../../services/UserService";

export const useGetMaintenanceIssueCategory = () => {
  return useQuery({
    queryKey: ["GetMaintenanceIssueCategory"],
    queryFn: () => GetMaintenanceIssueCategory(),
  });
};

export const useGetMaintenanceIssuebyCategory = (id: number) => {
  return useQuery({
    queryKey: [`GetMaintenanceIssuebyCategory-${id}`],
    queryFn: () => GetMaintenanceIssuebyCategory(id),
  });
};
