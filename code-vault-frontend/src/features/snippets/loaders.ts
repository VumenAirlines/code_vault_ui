import { QueryClient } from "@tanstack/react-query";
import { getAllSnippets } from "./getAllSnippets";
import { getSnippetById } from "./getSnippetById";

export const snippetsLoader = (queryClient: QueryClient) => async () => {
  const query = {
    queryKey: ["allSnippets"],
    queryFn: getAllSnippets,
  };

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
export const snippetDetailLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: any }) => {
    const snippetId = params.id; // The name matches the route param ':snippetId'
    if (!snippetId) {
      throw new Response("Not Found", {
        status: 404,
        statusText: "Snippet ID is missing",
      });
    }

    const query = {
      queryKey: ["snippets", snippetId],
      queryFn: () => getSnippetById(snippetId),
    };

    // Pre-fetch the data and return it
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
