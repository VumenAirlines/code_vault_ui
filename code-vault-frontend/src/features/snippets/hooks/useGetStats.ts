import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "../api/getStatistics";

export const useGetStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatistics(),
  });
};
