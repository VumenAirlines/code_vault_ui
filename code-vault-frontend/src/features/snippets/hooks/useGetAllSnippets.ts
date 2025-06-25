import { useQuery } from "@tanstack/react-query";
import { getAllSnippets } from "../getAllSnippets";

export const useGetAllSnippets = () => {
  return useQuery({
    queryKey: ["allSnippets"],
    queryFn: getAllSnippets,
  });
};
