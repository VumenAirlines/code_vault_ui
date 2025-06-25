import { api } from "../../lib/axios";
import { type Snippet } from "./types";

export const getSnippetById = async (id: string): Promise<Snippet> => {
  const { data } = await api.get(`/Snippets/${id}`);
  return data;
};
