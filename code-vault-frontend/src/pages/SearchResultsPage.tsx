import { SnippetList } from "../features/snippets/components/SnippetList";
import { createColumns } from "../features/snippets/components/coloumns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  availableLanguages,
  type SearchSnippetParams,
  type Snippet,
} from "../features/snippets/types";
import { SnippetDetailDisplay } from "../features/snippets/components/SnippetDetailDisplay";
import { useSearchSnippet } from "../features/snippets/hooks/useSearchSnippet";
import { useSearchParams } from "react-router-dom";
import { AdvancedSearchCard } from "../features/snippets/components/AdvancedSearchCard";
import { Switch } from "../components/ui/switch";

const SearchResultsPage = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryParams: SearchSnippetParams = {
    query: searchParams.get("query") || undefined,
    language: searchParams.get("language") as
      | (typeof availableLanguages)[keyof typeof availableLanguages]
      | undefined,
    sortBy:
      (searchParams.get("sortBy") as "createdAt" | "updatedAt" | "title") ||
      undefined,
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || undefined,
    page: searchParams.get("page")
      ? Number(searchParams.get("page"))
      : undefined,
    pageSize: searchParams.get("pageSize")
      ? Number(searchParams.get("pageSize"))
      : undefined,
    createdAfter: searchParams.get("createdAfter") || undefined,
    createdBefore: searchParams.get("createdBefore") || undefined,
    tags: searchParams.getAll("tags") || undefined,
  };

  const { data: searchRes, isLoading, isError } = useSearchSnippet(queryParams);

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
  if (isLoading && !searchRes) {
    return <div>Loading...</div>;
  }

  if (isError || !searchRes) {
    return <div>Error loading your snippets. Please try again.</div>;
  }

  return (
    <div className="flex-col w-full p-4 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Snippets</h1>
        <span className="flex gap-2 justify-center items-center">
          <p>Advanced search</p>
          <Switch checked={isHidden} onCheckedChange={setIsHidden} />
        </span>
      </div>
      <div className="flex flex-col gap-6">
        <AdvancedSearchCard isHidden={isHidden} defaultValues={queryParams} />
        <SnippetList
          columns={columns}
          data={searchRes.snippets ?? []}
          onRowDoubleClick={handleDoubleClick}
        />
      </div>

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

export default SearchResultsPage;
