import { useQuery } from "@tanstack/react-query";
import { getSnippetById } from "../api/getSnippetById";

export const useGetSnippetById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["allSnippets", id],
    queryFn: () => getSnippetById(id!),
    enabled: !!id,
  });
};
