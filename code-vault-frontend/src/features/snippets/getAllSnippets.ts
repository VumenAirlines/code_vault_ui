import { api } from "../../lib/axios";
import { type Snippet } from "./types";

export const getAllSnippets = async (): Promise<Snippet[]> => {
  const { data } = await api.get("/Snippets/getall");
  return data;
};
