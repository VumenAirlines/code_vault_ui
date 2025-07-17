import { SnippetList } from "../features/snippets/components/SnippetList";
import { useGetAllSnippets } from "../features/snippets/hooks/useGetAllSnippets";
import { SnippetCreateDialog } from "../features/snippets/components/SnippetCreateDialog";
import { createColumns } from "../features/snippets/components/coloumns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { type Snippet } from "../features/snippets/types";
import { SnippetDetailDisplay } from "../features/snippets/components/SnippetDetailDisplay";
const SnippetsPage = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: snippets, isLoading, isError } = useGetAllSnippets();
  const navigate = useNavigate();
  const columns = createColumns(navigate);

  const handleDoubleClick = (snippet: Snippet) => {
    setSelectedSnippet(snippet);
    setIsOpen(true);
  };
  if (isLoading && !snippets) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading your snippets. Please try again.</div>;
  }

  return (
    <div className="flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Snippets</h1>
        <SnippetCreateDialog />
      </div>
      <SnippetList
        columns={columns}
        data={snippets ?? []}
        onRowDoubleClick={handleDoubleClick}
      />
      {selectedSnippet && (
        <SnippetDetailDisplay
          snippet={selectedSnippet}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SnippetsPage;
