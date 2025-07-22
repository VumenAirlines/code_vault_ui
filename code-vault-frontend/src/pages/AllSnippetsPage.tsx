import { SnippetList } from "../features/snippets/components/SnippetList";
import { useGetAllSnippets } from "../features/snippets/hooks/useGetAllSnippets";
import { createColumns } from "../features/snippets/components/coloumns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { type Snippet } from "../features/snippets/types";
import { SnippetDetailDisplay } from "../features/snippets/components/SnippetDetailDisplay";
const SnippetsPage = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: snippets, isLoading, isError } = useGetAllSnippets();
  const navigate = useNavigate();

  const handleEditClick = (id: string) => {
    navigate(`/snippets/${id}`);
  };
  const handleOpenClick = (id: string) => {
    setSelectedSnippet(id);
    setIsOpen(true);
  };
  const handleDoubleClick = (snippet: Snippet) => {
    setSelectedSnippet(snippet.id);
    setIsOpen(true);
  };
  const columns = createColumns({
    onEditClick: handleEditClick,
    onOpenClick: handleOpenClick,
  });
  if (isLoading && !snippets) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading your snippets. Please try again.</div>;
  }

  return (
    <div className="flex-col w-full p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Snippets</h1>
      </div>
      <SnippetList
        columns={columns}
        data={snippets ?? []}
        onRowDoubleClick={handleDoubleClick}
      />
      {selectedSnippet && (
        <SnippetDetailDisplay
          id={selectedSnippet}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SnippetsPage;
