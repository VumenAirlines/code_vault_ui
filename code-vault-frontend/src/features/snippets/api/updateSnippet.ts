import { api } from "../../../lib/axios";
import { type UpdateSnippetParams } from "../types";

export const updateSnippet = async (
  updates: UpdateSnippetParams
): Promise<void> => {
  const { data } = await api.put(`/Snippet/${updates.id}`, updates.data);
  return data;
};
