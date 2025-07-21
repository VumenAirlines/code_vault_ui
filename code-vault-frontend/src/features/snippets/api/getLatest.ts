import { api } from "../../../lib/axios";
import { type Snippet } from "../types";

export const getLatest = async (count: number): Promise<Snippet[]> => {
  const { data } = await api.get(`/Snippets/latest/${count}`);
  return data;
};
