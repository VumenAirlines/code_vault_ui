import { useNavigate } from "react-router-dom";
import { GeneralStatsCard } from "../features/snippets/components/GeneralStatsCard";
import { LanguageStatsCard } from "../features/snippets/components/LanguageStatsCard";
import { SnippetCard } from "../features/snippets/components/SnippetCard";
import { TagsStatsCard } from "../features/snippets/components/TagsStatsCard";
import { useGetLatest } from "../features/snippets/hooks/useGetLatest";
import { useGetStats } from "../features/snippets/hooks/useGetStats";
import { useState } from "react";
import { NewSnippetCard } from "../features/snippets/components/NewSnippetCard";
import { SnippetCreateDialog } from "../features/snippets/components/SnippetCreateDialog";
import { Button } from "../components/ui/button";
import { SnippetDetailDisplay } from "../features/snippets/components/SnippetDetailDisplay";

const HomePage = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<string | null>(null);
  const [isDisplay, setIsDisplay] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const handleEditClick = (id: string) => {
    navigate(`/snippets/${id}`);
  };
  const handleDisplayOpen = (id: string) => {
    setSelectedSnippet(id);
    setIsDisplay(true);
  };
  const handleDisplayClose = () => {
    setSelectedSnippet(null);
    setIsDisplay(false);
  };

  const handleCreateOpen = () => {
    setIsCreate(true);
  };
  const handleCreatClose = () => {
    setIsCreate(false);
  };

  const { data: snippets } = useGetLatest();
  const { data: stats, isError, isLoading } = useGetStats();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading stats...</div>;
  if (isError) return <div>Error: Could not load statistics.</div>;
  if (isError) return <div>Error: Could not load snippets.</div>;
  if (!stats) return <div>Stats not found.</div>;
  if (!snippets) return <div>Stats not found.</div>;
  return (
    <div className="flex flex-col gap-4 px-6 pb-4 w-full items-center">
      <div className="flex flex-row gap-4 justify-between mb-6 w-full">
        <h1 className="text-3xl font-bold">My Snippets</h1>
        <Button onClick={handleCreateOpen}>New Snippet</Button>
      </div>
      <SnippetCreateDialog isOpen={isCreate} setIsOpen={handleCreatClose} />
      {selectedSnippet && (
        <SnippetDetailDisplay
          isOpen={isDisplay}
          onClose={handleDisplayClose}
          id={selectedSnippet}
        />
      )}
      <div className=" flex flex-wrap justify-evenly mx-auto max-w-7xl gap-4 bg-muted rounded-md w-full p-4">
        <GeneralStatsCard
          tagCount={5}
          langCount={5}
          totalCount={stats.totalCount}
        />
        <TagsStatsCard tags={stats.mostUsedTags} />
        <LanguageStatsCard langs={stats.mostUsedLanguage} />
      </div>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl bg-muted rounded-md w-full p-4">
        {snippets.map((snippet, index) => (
          <SnippetCard
            key={index}
            snippet={snippet}
            click={() => handleDisplayOpen(snippet.id)}
            editClick={() => handleEditClick(snippet.id)}
          />
        ))}
        <NewSnippetCard click={handleCreateOpen} />
      </div>
    </div>
  );
};

export default HomePage;
