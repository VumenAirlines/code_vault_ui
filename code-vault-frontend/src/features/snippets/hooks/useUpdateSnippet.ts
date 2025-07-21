import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateSnippet } from "../api/updateSnippet";

export const useUpdateSnippet = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateSnippet,
    onSuccess: (_, snippetId) => {
      queryClient.invalidateQueries({ queryKey: ["allSnippets"] });
      queryClient.invalidateQueries({ queryKey: ["snippets", snippetId] });
      queryClient.invalidateQueries({ queryKey: ["latest"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });

      navigate(`/snippets/${snippetId}`);
    },
    onError: (error) => {
      console.error("Failed to update snippet", error);
    },
  });
};
