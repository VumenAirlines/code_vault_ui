import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteSnippet } from "../api/deleteSnippet";
export const useDeleteSnippet = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteSnippet,
    onSuccess: (_, snippetId) => {
      queryClient.invalidateQueries({ queryKey: ["allSnippets"] });
      queryClient.invalidateQueries({ queryKey: ["allSnippets", snippetId] });

      navigate(`/snippets/`);
    },
    onError: (error) => {
      console.error("Failed to delete snippet", error);
    },
  });
};
