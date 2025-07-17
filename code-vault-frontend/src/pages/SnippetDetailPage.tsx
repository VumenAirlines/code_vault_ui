import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useGetSnippetById } from "../features/snippets/hooks/useGetSnippetById";
import type { SnippetDetail } from "../features/snippets/types";
import { SnippetEditor } from "../features/snippets/components/SnippetEditor";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Circle } from "lucide-react";

const SnippetDetailPage = () => {
  const initialData = useLoaderData() as SnippetDetail;
  const { id } = useParams<{ id: string }>();
  const { data: snippet, isLoading, isError } = useGetSnippetById(id);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading snippet...</div>;
  if (isError) return <div>Error: Could not load the snippet.</div>;
  if (!snippet) return <div>Snippet not found.</div>;

  return (
    <div className="w-full flex h-[calc(100vh-80px)] gap-4 px-4 py-6">
      <div className="flex flex-col justify-between flex-none w-[300px] max-w-[300px] border-r-2 border-accent px-4 py-4 overflow-hidden">
        <div className="mb-4">
          <h1 className="text-center font-bold text-xl">{snippet.title}</h1>
        </div>

        <div className="flex justify-center mb-4 text-primary">
          <Circle size={200} />
        </div>

        <div className="mb-4">
          <p className="text-md font-semibold">Description:</p>
          <p className="text-sm break-words">{snippet.description}</p>
        </div>

        <div className="mb-4">
          <p className="text-md font-semibold mb-1">Tags:</p>
          <div className="flex flex-wrap gap-2 max-w-full overflow-hidden">
            {snippet.tags.map((tag, index) => (
              <Badge variant="secondary" key={index}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <p className=" text-xs mb-2 text-muted-foreground">{`{${snippet.id}}`}</p>
        </div>
        <div className="flex justify-between gap-2">
          <Button className="w-1/2">Save</Button>
          <Button
            onClick={() => navigate("/snippets")}
            className="w-1/2"
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className="flex-1 h-full min-w-sm">
        <SnippetEditor className="w-full h-full" snippet={snippet} />
      </div>
    </div>
  );
};

export default SnippetDetailPage;
