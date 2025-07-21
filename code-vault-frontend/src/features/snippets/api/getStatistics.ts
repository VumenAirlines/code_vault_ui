import { api } from "../../../lib/axios";
import { type Stats } from "../types";

export const getStatistics = async (): Promise<Stats> => {
  const { data } = await api.get("/Snippets/stats");
  return data;
};
