import { api } from "../../../lib/axios";
import { type SnippetDetail } from "../types";

export const getSnippetById = async (id: string): Promise<SnippetDetail> => {
  const { data } = await api.get(`/Snippets/${id}`);
  return data;
};
