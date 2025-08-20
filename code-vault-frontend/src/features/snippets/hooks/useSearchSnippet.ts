import { useQuery } from "@tanstack/react-query";
import { searchSnippets } from "../api/searchSnippets";
import type { SearchSnippetParams } from "../types";

export const useSearchSnippet = (params: SearchSnippetParams) => {
  return useQuery({
    queryKey: ["snippets", "search", params],
    queryFn: () => searchSnippets(params),
    enabled: !!params,
  });
};
