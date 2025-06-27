import { api } from "../../../lib/axios";
import { type Snippet, type CreateSnippet } from "../types";

export const createSnippet = async (
  snippetData: CreateSnippet
): Promise<Snippet> => {
  const { data } = await api.post("/Snippets/", snippetData);
  return data;
};
