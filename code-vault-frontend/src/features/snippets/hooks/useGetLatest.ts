import { useQuery } from "@tanstack/react-query";

import { getLatest } from "../api/getLatest";
const count = 5;
export const useGetLatest = () => {
  return useQuery({
    queryKey: ["latest"],
    queryFn: () => getLatest(count),
  });
};
