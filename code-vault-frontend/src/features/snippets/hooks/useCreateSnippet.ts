import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createSnippet } from "../api/createSnippet";

export const useCreateSnippet = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createSnippet,
    onSuccess: (newlyCreatedSnippet) => {
      queryClient.invalidateQueries({ queryKey: ["allSnippets"] });
      queryClient.invalidateQueries({ queryKey: ["latest"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      navigate(`/snippets/${newlyCreatedSnippet.id}`);
    },
    onError: (error) => {
      console.error("Failed to create snippet", error);
    },
  });
};
