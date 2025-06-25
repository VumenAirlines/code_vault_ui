import { useLoaderData, useParams } from "react-router-dom";
import { useGetSnippetById } from "../features/snippets/hooks/useGetSnippetById";
import { SnippetDetailDisplay } from "../features/snippets/components/SnippetDetailDisplay";
import type { SnippetDetail } from "../features/snippets/types";

const SnippetDetailPage = () => {

  const initialData = useLoaderData() as SnippetDetail;

  
  const { id } = useParams<{ id: string }>();
  const { data: snippet, isLoading, isError } = useGetSnippetById(id);

  if (isLoading) {
    return <div>Loading snippet...</div>;
  }

  if (isError) {
    return <div>Error: Could not load the snippet.</div>;
  }
  

  if (!snippet) {
    return <div>Snippet not found.</div>
  }

  return <SnippetDetailDisplay snippet={snippet} />;
};

export default SnippetDetailPage;