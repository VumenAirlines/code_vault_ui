import { api } from "../../../lib/axios";

export const deleteSnippet = async (id: string): Promise<void> => {
  await api.delete(`/Snippets/${id}`);
};
