import { api } from "../../../lib/axios";
import { type SearchSnippetParams, type SearchResults } from "../types";

export const searchSnippets = async (
  searchParams: SearchSnippetParams
): Promise<SearchResults> => {
  const params = Object.fromEntries(
    Object.entries(searchParams).filter(([_, v]) => v != null && v !== "")
  );
  const { data } = await api.get("/Snippets/search", {
    params,
    paramsSerializer: {
      indexes: null,
    },
  });
  return data;
};
